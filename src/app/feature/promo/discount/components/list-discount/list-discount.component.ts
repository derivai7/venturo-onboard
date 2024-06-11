import {Component, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from "angular-datatables";
import {DiscountService} from "../../services/discount.service";
import {CustomerService} from "../../../../customer/services/customer.service";
import {PromoService} from "../../../services/promo.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-list-discount',
    templateUrl: './list-discount.component.html',
    styleUrls: ['./list-discount.component.scss']
})
export class ListDiscountComponent implements OnInit {
    readonly PROMO_VOUCHER = 'discount';

    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;
    dtOptions: DataTables.Settings = {};

    listCustomer: Array<{
        id: string,
        no: string,
        name: string,
        discount: Array<{
            id: string,
            promo_id: string
        }>,
    }> = [];

    promos: Array<{
        id: string,
        name: string
    }> = [];

    totalDiscounts: [{
        m_promo_id: string,
        total: string,
    }];

    loadingProgress: number;
    loadingCustomer: boolean;

    filter: {
        id: string,
    };

    customerId: string;
    filterCustomers: any[] = [];

    constructor(
        private discountService: DiscountService,
        private promoService: PromoService,
        private customerService: CustomerService,
        private modalService: NgbModal
    ) {
    }

    ngOnInit(): void {
        this.setDefaultFilter();
        this.getCustomers();
        this.getPromo();
        this.getDiscount();
        this.getFilterCustomers();
    }

    setDefaultFilter() {
        this.filter = {
            id: '',
        }
    }

    getCustomers() {
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

                this.customerService.getCustomers(params).subscribe({
                    next: (res: any) => {
                        const {list, meta} = res.data;

                        let number = dtParams.start + 1;
                        list.forEach((val: any) => {
                            val.no = number++;
                        });
                        this.listCustomer = list;

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

    getFilterCustomers(name = '') {
        this.loadingCustomer = true;

        this.customerService.getCustomers(name).subscribe({
            next: (res: any) => {
                this.filterCustomers = res.data.list;

                this.loadingCustomer = false;
            },
            error: (err: any) => {
                console.error(err);
            }
        });
    }

    getPromo() {
        this.promoService.getPromo({status: this.PROMO_VOUCHER}).subscribe({
            next: (res: any) => {
                this.promos = res.data.list;
            },
            error: (err: any) => {
                console.error(err);
            }
        });
    }

    getDiscount() {
        this.discountService.getDiscount().subscribe({
            next: (res: any) => {
                this.totalDiscounts = res.data;
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

    isPromoApplied(customerDiscounts: Array<{promo_id: string}>, promoId: string): boolean {
        return customerDiscounts.some(discount => discount.promo_id === promoId);
    }

    onPromoCheckboxChange(event: any, customer: any, promoId: string): void {
        if (event.target.checked) {
            this.createDiscount(customer.id, promoId);
        } else {
            for (const discount of customer.discount) {
                if (discount.promo_id === promoId) {
                    this.deleteDiscount(discount.id, promoId);
                    break;
                }
            }
        }
    }

    createDiscount(customerId: string, promoId: string): void {
        const payload = { customer_id: customerId, promo_id: promoId };
        this.discountService.createDiscount(payload).subscribe({
            next: () => {
                this.reloadDataTable();
                this.totalDiscounts[promoId]++;
            },
            error: (err) => {
                console.error('Error', err);
            }
        });
    }

    deleteDiscount(discountId: string, promoId: string): void {
        this.discountService.deleteDiscount(discountId).subscribe({
            next: () => {
                this.reloadDataTable();
                this.totalDiscounts[promoId]--;
            },
            error: (err) => {
                console.error('Error', err);
            }
        });
    }

    updateCustomer(modalId: any, customerId: string) {
        this.customerId = customerId;
        this.modalService.open(modalId, { size: 'lg', backdrop: 'static' });
    }

    filterByCustomer(customers: any) {
        let customersId = [];
        customers.forEach((val: any) => (customersId.push(val.id)));
        if (!customersId) return false;

        this.filter.id = customersId.join(',');
        this.reloadDataTable();
    }
}
