import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { DataTableDirective } from "angular-datatables";
let ListDiscountComponent = class ListDiscountComponent {
    constructor(discountService, promoService, customerService, modalService) {
        this.discountService = discountService;
        this.promoService = promoService;
        this.customerService = customerService;
        this.modalService = modalService;
        this.PROMO_VOUCHER = 'discount';
        this.dtOptions = {};
        this.listCustomer = [];
        this.promos = [];
        this.totalDiscounts = [];
        this.filterCustomers = [];
    }
    ngOnInit() {
        this.setDefaultFilter();
        this.getCustomers();
        this.getPromo();
        this.getFilterCustomers();
    }
    setDefaultFilter() {
        this.filter = {
            id: '',
        };
    }
    getCustomers() {
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
                this.customerService.getCustomers(params).subscribe({
                    next: (res) => {
                        const { list, meta } = res.data;
                        let number = dtParams.start + 1;
                        list.forEach(val => {
                            val.no = number++;
                        });
                        this.listCustomer = list;
                        this.calculateTotalDiscounts();
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
    getFilterCustomers(name = '') {
        this.loadingCustomer = true;
        this.customerService.getCustomers(name).subscribe({
            next: (res) => {
                this.filterCustomers = res.data.list;
                this.loadingCustomer = false;
            },
            error: (err) => {
                console.error(err);
            }
        });
    }
    getPromo() {
        this.promoService.getPromo({ status: this.PROMO_VOUCHER }).subscribe({
            next: (res) => {
                this.promos = res.data.list;
            },
            error: (err) => {
                console.error(err);
            }
        });
    }
    calculateTotalDiscounts() {
        this.promos.forEach(promo => {
            this.totalDiscounts[promo.id] = 0;
        });
        this.listCustomer.forEach(customer => {
            customer.discount.forEach(discount => {
                if (this.isPromoApplied(customer.discount, discount.promo_id)) {
                    this.totalDiscounts[discount.promo_id]++;
                }
            });
        });
    }
    reloadDataTable() {
        this.dtElement.dtInstance.then((dtInstance) => {
            dtInstance.draw();
        });
    }
    isPromoApplied(customerDiscounts, promoId) {
        return customerDiscounts.some(discount => discount.promo_id === promoId);
    }
    onPromoCheckboxChange(event, customer, promoId) {
        if (event.target.checked) {
            this.createDiscount(customer.id, promoId);
        }
        else {
            for (const discount of customer.discount) {
                if (discount.promo_id === promoId) {
                    this.deleteDiscount(discount.id);
                    break;
                }
            }
        }
    }
    createDiscount(customerId, promoId) {
        const payload = { customer_id: customerId, promo_id: promoId };
        this.discountService.createDiscount(payload).subscribe({
            next: () => {
                this.reloadDataTable();
            },
            error: (err) => {
                console.error('Error', err);
            }
        });
    }
    deleteDiscount(discountId) {
        this.discountService.deleteDiscount(discountId).subscribe({
            next: () => {
                this.reloadDataTable();
            },
            error: (err) => {
                console.error('Error', err);
            }
        });
    }
    updateCustomer(modalId, customerId) {
        this.customerId = customerId;
        this.modalService.open(modalId, { size: 'lg', backdrop: 'static' });
    }
    filterByCustomer(customers) {
        let customersId = [];
        customers.forEach(val => (customersId.push(val.id)));
        if (!customersId)
            return false;
        this.filter.id = customersId.join(',');
        this.reloadDataTable();
    }
};
__decorate([
    ViewChild(DataTableDirective)
], ListDiscountComponent.prototype, "dtElement", void 0);
ListDiscountComponent = __decorate([
    Component({
        selector: 'app-list-discount',
        templateUrl: './list-discount.component.html',
        styleUrls: ['./list-discount.component.scss']
    })
], ListDiscountComponent);
export { ListDiscountComponent };
//# sourceMappingURL=list-discount.component.js.map