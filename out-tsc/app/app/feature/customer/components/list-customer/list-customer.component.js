import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { DataTableDirective } from "angular-datatables";
import Swal from "sweetalert2";
let ListCustomerComponent = class ListCustomerComponent {
    constructor(customerService, modalService, progressService) {
        this.customerService = customerService;
        this.modalService = modalService;
        this.progressService = progressService;
        this.showMode = true;
        this.listCustomer = [];
        this.title = 'Daftar Customer';
        this.loadingProgress = 0;
        this.dtOptions = {};
    }
    ngOnInit() {
        this.setDefault();
        this.getCustomers();
    }
    setDefault() {
        this.filter = {
            name: '',
            is_verified: '',
        };
    }
    getCustomers() {
        this.dtOptions = {
            serverSide: true,
            ordering: false,
            pageLength: 3,
            ajax: (dtParams, callback) => {
                this.loadingProgress = 0;
                this.progressService.startLoading();
                const params = {
                    ...this.filter,
                    per_page: dtParams.length,
                    page: (dtParams.start / dtParams.length) + 1,
                };
                this.customerService.getCustomers(params).subscribe({
                    next: (res) => {
                        const { list, meta } = res.data;
                        let number = dtParams.start + 1;
                        list.forEach(val => {
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
                    error: (err) => {
                        console.error(err);
                        this.loadingProgress = 100;
                        this.progressService.finishLoading();
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
    createCustomer() {
        this.title = 'Tambah Customer';
        this.customerId = '';
        this.showMode = false;
    }
    updateCustomer(customer) {
        this.title = 'Edit Customer: ' + customer.name;
        this.customerId = customer.id;
        this.showMode = false;
    }
    deleteCustomer(customerId) {
        Swal.fire({
            title: 'Apakah kamu yakin ?',
            text: 'Customer ini tidak dapat melakukan transaksi setelah kamu menghapus datanya',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#34c38f',
            cancelButtonColor: '#f46a6a',
            confirmButtonText: 'Ya, Hapus data ini !',
        }).then((result) => {
            if (!result.value)
                return false;
            this.customerService.deleteCustomer(customerId).subscribe(() => {
                this.reloadDataTable();
            });
        });
    }
};
__decorate([
    ViewChild(DataTableDirective)
], ListCustomerComponent.prototype, "dtElement", void 0);
ListCustomerComponent = __decorate([
    Component({
        selector: 'app-list-customer',
        templateUrl: './list-customer.component.html',
        styleUrls: ['./list-customer.component.scss']
    })
], ListCustomerComponent);
export { ListCustomerComponent };
//# sourceMappingURL=list-customer.component.js.map