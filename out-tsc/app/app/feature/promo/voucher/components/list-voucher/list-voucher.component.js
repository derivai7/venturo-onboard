import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { DataTableDirective } from "angular-datatables";
import Swal from "sweetalert2";
let ListVoucherComponent = class ListVoucherComponent {
    constructor(voucherService, customerService) {
        this.voucherService = voucherService;
        this.customerService = customerService;
        this.dtOptions = {};
        this.listVoucher = [];
    }
    ngOnInit() {
        this.showForm = false;
        this.setDefaultFilter();
        this.getVoucher();
        this.getCustomers();
    }
    setDefaultFilter() {
        this.filter = {
            customer_id: '',
            start_time: '',
            end_time: ''
        };
    }
    getVoucher() {
        this.dtOptions = {
            serverSide: true,
            processing: false,
            ordering: false,
            pageLength: 25,
            ajax: (dtParams, callback) => {
                this.loadingProgress = 0;
                const params = {
                    ...this.filter,
                    per_page: dtParams.length,
                    page: (dtParams.start / dtParams.length) + 1,
                };
                this.voucherService.getVoucher(params).subscribe({
                    next: (res) => {
                        const { list, meta } = res.data;
                        let number = dtParams.start + 1;
                        list.forEach(val => {
                            val.no = number++;
                        });
                        this.listVoucher = list;
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
    getCustomers(name = '') {
        this.loadingCustomer = true;
        this.customerService.getCustomers(name).subscribe({
            next: (res) => {
                this.customers = res.data.list;
                this.loadingCustomer = false;
            },
            error: (err) => {
                console.error(err);
            }
        });
    }
    reloadDataTable() {
        this.dtElement.dtInstance.then((dtInstance) => {
            dtInstance.draw();
        });
    }
    filterByPeriod(period) {
        this.filter.start_time = period.startDate;
        this.filter.end_time = period.endDate;
        this.reloadDataTable();
    }
    filterByCustomer(customers) {
        let customersId = [];
        customers.forEach(val => (customersId.push(val.id)));
        if (!customersId)
            return false;
        this.filter.customer_id = customersId.join(',');
        this.reloadDataTable();
    }
    formCreate() {
        this.showForm = true;
        this.titleForm = 'Tambah Voucher';
        this.voucherId = '';
    }
    formUpdate(voucher) {
        this.showForm = true;
        this.titleForm = 'Edit Voucher: ' + voucher.customer_name;
        this.voucherId = voucher.id;
    }
    deleteVoucher(voucherId) {
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
            this.voucherService.deleteVoucher(voucherId).subscribe(() => {
                this.reloadDataTable();
            });
        });
    }
    onAfterSave(success) {
        if (success) {
            this.getVoucher();
        }
        this.setDefaultFilter();
        this.showForm = false;
    }
};
__decorate([
    ViewChild(DataTableDirective)
], ListVoucherComponent.prototype, "dtElement", void 0);
ListVoucherComponent = __decorate([
    Component({
        selector: 'app-list-voucher',
        templateUrl: './list-voucher.component.html',
        styleUrls: ['./list-voucher.component.scss'],
    })
], ListVoucherComponent);
export { ListVoucherComponent };
//# sourceMappingURL=list-voucher.component.js.map