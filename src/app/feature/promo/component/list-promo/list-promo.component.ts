import {Component, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from "angular-datatables";
import Swal from "sweetalert2";
import {PromoService} from "../../services/promo.service";

@Component({
    selector: 'app-list-promo',
    templateUrl: './list-promo.component.html',
    styleUrls: ['./list-promo.component.scss']
})
export class ListPromoComponent implements OnInit{
    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;
    dtOptions: DataTables.Settings = {};

    listPromo: Array<{
        id: string,
        no: string,
        name: string,
        status: string,
        expired_in_day: string,
        nominal_percentage: string,
        nominal_rupiah: string,
        term_conditions: string,
        photo: string,
        photo_url: string,
    }> = [];

    filter: {
        name: '',
        status: '',
    };

    promoId: string;
    titleForm: string;
    showForm: boolean;

    loadingProgress: number = 0;

    constructor(
        private promoService: PromoService,
    ) {
    }

    ngOnInit(): void {
        this.showForm = false;

        this.setDefault();
        this.getPromo();
    }

    setDefault() {
        this.filter = {
            name: '',
            status: '',
        }
    }

    getPromo() {
        this.dtOptions = {
            serverSide: true,
            ordering: false,
            pageLength: 3,
            ajax: (dtParams: any, callback) => {
                this.loadingProgress = 0;

                const params = {
                    ...this.filter,
                    per_page: dtParams.length,
                    page: (dtParams.start / dtParams.length) + 1,
                };

                this.promoService.getPromo(params).subscribe({
                    next: (res: any) => {
                        const {list, meta} = res.data;

                        let number = dtParams.start + 1;

                        list.forEach(promo => {
                            promo.no = number++;
                        });

                        this.listPromo = list;

                        this.loadingProgress = 100;
                        callback({
                            recordsTotal: meta.total,
                            recordsFiltered: meta.total,
                            data: [],
                        });
                    },
                    error: (err: any) => {
                        console.error(err);

                        this.loadingProgress = 100;
                    }
                });
            },
        };
    }

    reloadDataTable(): void {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.draw();
        });
    }

    formCreate() {
        this.showForm = true;
        this.titleForm = 'Tambah Promo';
        this.promoId = '';
    }

    formUpdate(promo) {
        this.showForm = true;
        this.titleForm = 'Edit Promo: ' + promo.name;
        this.promoId = promo.id;
    }

    deletePromo(promoId) {
        Swal.fire({
            title: 'Apakah kamu yakin ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#34c38f',
            cancelButtonColor: '#f46a6a',
            confirmButtonText: 'Ya, Hapus data ini !',
        }).then((result) => {
            if (!result.value) return false;

            this.promoService.deletePromo(promoId).subscribe(() => {
                this.reloadDataTable();
            });
        });
    }

    onAfterSave(success: boolean) {
        if (success) {
            this.getPromo();
        }
        this.showForm = false;
    }
}
