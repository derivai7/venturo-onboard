import {Component, OnInit, ViewChild} from '@angular/core';
import {ReportService} from "../../services/report.service";
import {CustomerService} from "../../../customer/services/customer.service";
import {ProductService} from "../../../product/product/services/product.service";
import {DataTableDirective} from "angular-datatables";

@Component({
    selector: 'app-sale-transaction',
    templateUrl: './sale-transaction.component.html',
    styleUrls: ['./sale-transaction.component.scss']
})
export class SaleTransactionComponent implements OnInit {
    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;
    dtOptions: DataTables.Settings = {};

    filter: {
        start_date: string,
        end_date: string,
        customer_id: string,
        menu_id: string
    }
    loadingProgress: number;
    loadingCustomer: boolean;
    loadingMenu: boolean;
    customers: [];
    menus: [];
    sales: [{
        no: number,
        no_receipt: string,
        customer_name: string,
        date_transaction: string,
        voucher_name: string,
        discount_name: string,
        total_payment: string,
        details: [{
            menu: string,
            total_item: number,
            price: number,
            total: number,
        }],
    }];

    constructor(
        private saleService: ReportService,
        private customerService: CustomerService,
        private menuService: ProductService
    ) {
    }

    ngOnInit() {
        this.resetFilter();
        this.getSales();
        this.getCustomers();
        this.getMenus();
    }

    resetFilter() {
        this.filter = {
            start_date: null,
            end_date: null,
            customer_id: null,
            menu_id: null
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

                this.saleService.getSaleTransaction(params).subscribe({
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

    getMenus(name: string = '') {
        this.loadingMenu = true;
        this.menuService.getProducts({name: name}).subscribe({
            next: (res: any) => {
                this.menus = res.data.list;
                this.loadingMenu = false;
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

    setFilterMenus(menus: any) {
        this.filter.menu_id = this.generateSafeParam(menus);
        this.reloadDataTable();
    }
}
