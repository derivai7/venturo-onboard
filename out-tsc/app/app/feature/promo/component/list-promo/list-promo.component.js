import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { DataTableDirective } from "angular-datatables";
import Swal from "sweetalert2";
let ListPromoComponent = class ListPromoComponent {
    constructor(promoService) {
        this.promoService = promoService;
        this.dtOptions = {};
        this.listPromo = [];
        this.loadingProgress = 0;
    }
    ngOnInit() {
        this.showForm = false;
        this.setDefault();
        this.getPromo();
    }
    setDefault() {
        this.filter = {
            name: '',
            status: '',
        };
    }
    getPromo() {
        this.dtOptions = {
            serverSide: true,
            ordering: false,
            pageLength: 3,
            ajax: (dtParams, callback) => {
                this.loadingProgress = 0;
                const params = {
                    ...this.filter,
                    per_page: dtParams.length,
                    page: (dtParams.start / dtParams.length) + 1,
                };
                this.promoService.getPromo(params).subscribe({
                    next: (res) => {
                        const { list, meta } = res.data;
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
                    error: (err) => {
                        console.error(err);
                        this.loadingProgress = 100;
                    }
                });
            },
        };
    }
    reloadDataTable() {
        this.dtElement.dtInstance.then((dtInstance) => {
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
            if (!result.value)
                return false;
            this.promoService.deletePromo(promoId).subscribe(() => {
                this.reloadDataTable();
            });
        });
    }
    onAfterSave(success) {
        if (success) {
            this.getPromo();
        }
        this.showForm = false;
    }
};
__decorate([
    ViewChild(DataTableDirective)
], ListPromoComponent.prototype, "dtElement", void 0);
ListPromoComponent = __decorate([
    Component({
        selector: 'app-list-promo',
        templateUrl: './list-promo.component.html',
        styleUrls: ['./list-promo.component.scss']
    })
], ListPromoComponent);
export { ListPromoComponent };
//# sourceMappingURL=list-promo.component.js.map