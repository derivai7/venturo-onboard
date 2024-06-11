import {Component, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from "angular-datatables";
import {ProgressServiceService} from "../../../../core/services/progress-service.service";
import Swal from "sweetalert2";
import {CustomerService} from "../../services/customer.service";

@Component({
    selector: 'app-list-customer',
    templateUrl: './list-customer.component.html',
    styleUrls: ['./list-customer.component.scss']
})
export class ListCustomerComponent implements OnInit {
    showMode: boolean = true;

    listCustomer: Array<{
        id: string,
        no: string,
        name: string,
        email: string,
        is_verified: boolean,
    }> = [];

    title: string = 'Daftar Customer';
    customerId: string;

    loadingProgress: number = 0;

    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;
    dtOptions: DataTables.Settings = {};

    filter: {
        name: '',
        is_verified: '',
    };

    constructor(
        private customerService: CustomerService,
        private progressService: ProgressServiceService
    ) {
    }

    ngOnInit(): void {
        this.setDefault();
        this.getCustomers();
    }

    setDefault() {
        this.filter = {
            name: '',
            is_verified: '',
        }
    }

    getCustomers() {
        this.dtOptions = {
            serverSide: true,
            ordering: false,
            ajax: (dtParams: any, callback) => {
                this.loadingProgress = 0;
                this.progressService.startLoading();

                const params = {
                    ...this.filter,
                    per_page: dtParams.length,
                    page: (dtParams.start / dtParams.length) + 1,
                };

                this.customerService.getCustomers(params).subscribe({
                    next: (res: any) => {
                        const {list, meta} = res.data;

                        let number = dtParams.start + 1;
                        list.forEach((val: any) => {
                            val.no = number++;
                        });
                        this.listCustomer = list; // Updated to listCustomer

                        this.loadingProgress = 100;
                        this.progressService.finishLoading();

                        callback({
                            recordsTotal: meta.total,
                            recordsFiltered: meta.total,
                            data: [],
                        });
                    },
                    error: (err: any) => {
                        console.error(err);

                        this.loadingProgress = 100;
                        this.progressService.finishLoading();
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

    createCustomer() {
        this.title = 'Tambah Customer';
        this.customerId = '';
        this.showMode = false;
    }

    updateCustomer(customer: any) {
        this.title = 'Edit Customer: ' + customer.name;
        this.customerId = customer.id;
        this.showMode = false;
    }

    deleteCustomer(customerId: string) {
        Swal.fire({
            title: 'Apakah kamu yakin ?',
            text: 'Customer ini tidak dapat melakukan transaksi setelah kamu menghapus datanya',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#34c38f',
            cancelButtonColor: '#f46a6a',
            confirmButtonText: 'Ya, Hapus data ini !',
        }).then((result) => {
            if (!result.value) return false;

            this.customerService.deleteCustomer(customerId).subscribe(() => {
                this.reloadDataTable();
            });
        });
    }
}
