import {Component, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from "angular-datatables";
import {VoucherService} from "../../services/voucher.service";
import {CustomerService} from "../../../../customer/services/customer.service";
import Swal from "sweetalert2";

@Component({
    selector: 'app-list-voucher',
    templateUrl: './list-voucher.component.html',
    styleUrls: ['./list-voucher.component.scss'],
})

export class ListVoucherComponent implements OnInit {
    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;
    dtOptions: DataTables.Settings = {};

    listVoucher: Array<{
        id: string,
        no: string,
        name: string,
        photo_url: string,
        customer_name: string,
        nominal_rupiah: string,
        total_voucher: string,
        start_time: string,
        end_time: string,
    }> = [];

    titleForm: string;
    voucherId: string;

    showForm: boolean;
    loadingCustomer: boolean;

    customers: [];

    loadingProgress: number;

    filter: {
        customer_id: any,
        start_time: '',
        end_time: ''
    };

    constructor(
        private voucherService: VoucherService,
        private customerService: CustomerService
    ) {
    }

    ngOnInit(): void {
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
        }
    }

    getVoucher() {
        this.dtOptions = {
            serverSide: true,
            processing: false,
            ordering: false,
            pageLength: 25,
            ajax: (dtParams: any, callback) => {
                this.loadingProgress = 0;

                const params = {
                    ...this.filter,
                    per_page: dtParams.length,
                    page: (dtParams.start / dtParams.length) + 1,
                };

                this.voucherService.getVoucher(params).subscribe({
                    next: (res: any) => {
                        const { list, meta } = res.data;

                        let number = dtParams.start + 1;
                        list.forEach((val: any) => {
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
                    error: (err: any) => {
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
            next: (res: any) => {
                this.customers = res.data.list;

                this.loadingCustomer = false;
            },
            error: (err: any) => {
                console.error(err);
            }
        });
    }

    reloadDataTable(): void {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.draw();
        });
    }

    filterByPeriod(period: any) {
        this.filter.start_time = period.startDate;
        this.filter.end_time = period.endDate;
        this.reloadDataTable();
    }

    filterByCustomer(customers: any) {
        let customersId = [];
        customers.forEach((val: any) => (customersId.push(val.id)));
        if (!customersId) return false;

        this.filter.customer_id = customersId.join(',');
        this.reloadDataTable();
    }

    formCreate() {
        this.showForm = true;
        this.titleForm = 'Tambah Voucher';
        this.voucherId = '';
    }

    formUpdate(voucher: any) {
        this.showForm = true;
        this.titleForm = 'Edit Voucher: ' + voucher.customer_name;
        this.voucherId = voucher.id;
    }

    deleteVoucher(voucherId: any) {
        Swal.fire({
            title: 'Apakah kamu yakin ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#34c38f',
            cancelButtonColor: '#f46a6a',
            confirmButtonText: 'Ya, Hapus data ini !',
        }).then((result) => {
            if (!result.value) return false;

            this.voucherService.deleteVoucher(voucherId).subscribe(() => {
                this.reloadDataTable();
            });
        });
    }

    onAfterSave(success: boolean) {
        if (success) {
            this.getVoucher();
        }
        this.setDefaultFilter();
        this.showForm = false;
    }
}
