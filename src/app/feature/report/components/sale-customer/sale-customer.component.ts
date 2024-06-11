import {Component, OnInit} from '@angular/core';
import {ReportService} from "../../services/report.service";
import {LandaService} from "../../../../core/services/landa.service";
import Swal from "sweetalert2";
import {CustomerService} from "../../../customer/services/customer.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-sale-customer',
    templateUrl: './sale-customer.component.html',
    styleUrls: ['./sale-customer.component.scss']
})
export class SaleCustomerComponent implements OnInit{
    filter: {
        start_date: string,
        end_date: string,
        customer_id: string
    }
    sale: [{
        customer_name: string,
        transactions: [{
            date_transaction: string,
            total_sale: number
        }],
        transactions_total: string
    }];
    meta: {
        dates: any[],
        total_per_date: any[],
        grand_total: number
    };
    loadingProgress: number;
    loadingCustomers: boolean;
    customers: [{
        id: string,
        name: string
    }];

    titleModal: string;
    customerId: string;
    date: string;

    constructor(
        private saleService: ReportService,
        private customerService: CustomerService,
        private landaService: LandaService,
        private modalService: NgbModal,
    ) {
    }

    ngOnInit(): void {
        this.resetFilter();
        this.getCustomers();
    }

    getCustomers(name = '') {
        this.loadingCustomers = true;

        this.customerService.getCustomers(name).subscribe({
            next: (res: any) => {
                this.customers = res.data.list;
                this.loadingCustomers = false;
            },
            error: (err: any) => {
                console.error(err);
            }
        });
    }

    resetFilter() {
        this.filter = {
            start_date: null,
            end_date: null,
            customer_id: null
        }

        this.meta = {
            dates: [],
            total_per_date: [],
            grand_total: 0
        }

        this.loadingCustomers = false;
    }

    loadSale() {
        this.runFilterValidation();

        this.loadingProgress = 0;
        this.saleService.getSaleCustomer(this.filter).subscribe((res: any) => {
            const {data, settings} = res;
            this.sale = data;
            this.meta = settings;
            this.loadingProgress = 100;
        });
    }

    runFilterValidation() {
        if (!this.filter.start_date || !this.filter.end_date) {
            Swal.fire({
                title: 'Terjadi Kesalahan',
                text: 'Silahkan isi periode penjualan terlebih dahulu',
                icon: 'warning',
                showCancelButton: false
            });
            throw new Error("Start and End date is required");
        }
    }

    setFilterPeriod($event: any) {
        this.filter.start_date = $event.startDate;
        this.filter.end_date = $event.endDate;
    }

    setFilterByCustomer(customers: any) {
        let customersId = [];
        customers.forEach((val: any) => (customersId.push(val.id)));
        if (!customersId) return false;

        this.filter.customer_id = customersId.join(',');
    }

    downloadExcel() {
        this.runFilterValidation();
        let queryParams = {
            start_date: this.filter.start_date,
            end_date: this.filter.end_date,
            customer_id: this.filter.customer_id,
            is_export_excel: true
        }
        this.landaService.DownloadLink('/v1/download/sale-customer', queryParams)
    }

    openDetailModal(modalId: any, sale: any, date: string) {
        this.titleModal = `${sale.customer_name} / ${date}`;
        this.customerId = sale.customer_id;
        this.date = date;
        this.modalService.open(modalId, {size: 'lg', backdrop: 'static'});
    }
}
