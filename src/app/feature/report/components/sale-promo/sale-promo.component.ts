import {Component, OnInit, ViewChild} from '@angular/core';
import {ReportService} from "../../services/report.service";
import {CustomerService} from "../../../customer/services/customer.service";
import {PromoService} from "../../../promo/services/promo.service";
import {DataTableDirective} from "angular-datatables";

@Component({
    selector: 'app-sale-promo',
    templateUrl: './sale-promo.component.html',
    styleUrls: ['./sale-promo.component.scss']
})
export class SalePromoComponent implements OnInit {
    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;
    dtOptions: DataTables.Settings = {};

    filter: {
        start_date: string,
        end_date: string,
        customer_id: string,
        promo_id: string
    }
    loadingProgress: number;
    loadingCustomer: boolean;
    loadingPromo: boolean;
    customers: [];
    promos: [];
    sales: [{
        no: number,
        customer_name: string,
        date_transaction: string,
        voucher_name: string,
        discount_name: string,
    }];

    constructor(
        private saleService: ReportService,
        private customerService: CustomerService,
        private promoService: PromoService
    ) {
    }

    ngOnInit() {
        this.resetFilter();
        this.getSales();
        this.getCustomers();
        this.getPromos();
    }

    resetFilter() {
        this.filter = {
            start_date: null,
            end_date: null,
            customer_id: null,
            promo_id: null
        }
    }

    getSales() {
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

                this.saleService.getSalePromo(params).subscribe({
                    next: (res: any) => {
                        const {list, meta} = res.data;

                        let number = dtParams.start + 1;
                        list.forEach((val: any) => {
                            val.no = number++;
                        });
                        this.sales = list;

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

    getCustomers(name: string = '') {
        this.loadingCustomer = true;
        this.customerService.getCustomers({name: name}).subscribe({
            next: (res: any) => {
                this.customers = res.data.list;
                this.loadingCustomer = false;
            },
            error: (err: any) => {
                console.error(err);
            }
        });
    }

    getPromos(name: string = '') {
        this.loadingPromo = true;
        this.promoService.getPromo({name: name}).subscribe({
            next: (res: any) => {
                this.promos = res.data.list;
                this.loadingPromo = false;
            },
            error: (err: any) => {
                console.error(err);
            }
        });
    }

    setFilterPeriod($event: any) {
        this.filter.start_date = $event.startDate;
        this.filter.end_date = $event.endDate;
        this.reloadDataTable();
    }

    generateSafeParam(list: any) {
        let paramId = [];
        list.forEach((val: any) => {
            return (paramId.push(val.id));
        });
        if (!paramId) return '';

        return paramId.join(',')
    }

    setFilterCustomer(customers: any) {
        this.filter.customer_id = this.generateSafeParam(customers);
        this.reloadDataTable();
    }

    setFilterPromo(promos: any) {
        this.filter.promo_id = this.generateSafeParam(promos);
        this.reloadDataTable();
    }
}
