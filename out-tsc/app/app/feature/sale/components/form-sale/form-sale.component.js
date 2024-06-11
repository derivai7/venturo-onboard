import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { animate, style, transition, trigger } from "@angular/animations";
import { moveItemInArray } from "@angular/cdk/drag-drop";
let FormSaleComponent = class FormSaleComponent {
    constructor(customerService, promoService, modalService, saleService, landaService) {
        this.customerService = customerService;
        this.promoService = promoService;
        this.modalService = modalService;
        this.saleService = saleService;
        this.landaService = landaService;
        this.changeDiscount = new EventEmitter();
        this.changeVoucher = new EventEmitter();
        this.afterSaveCustomer = new EventEmitter();
        this.changeDetails = new EventEmitter();
        this.afterSaveSale = new EventEmitter();
    }
    ngOnChanges(changes) {
        if (changes['customer']) {
            this.getPromoByCustomer();
        }
    }
    updateCustomer(modalId) {
        this.modalService.open(modalId, { size: 'lg', backdrop: 'static' });
    }
    getCustomers() {
        this.customerService.getCustomers().subscribe({
            next: (res) => {
                const customers = res.data.list;
                for (const customer of customers) {
                    if (customer.id === this.customer.id) {
                        this.customer = customer;
                    }
                }
            },
            error: (err) => {
                console.error(err);
            }
        });
    }
    getPromoByCustomer() {
        this.loadingProgress = 0;
        this.discount = null;
        this.voucher = null;
        if (this.customer) {
            this.promoService.getPromo().subscribe({
                next: (res) => {
                    const promos = res.data.list;
                    let highestDiscount = 0;
                    let highestVoucher = 0;
                    for (const promo of promos) {
                        if (promo.status == 'discount') {
                            for (const discount of this.customer.discount) {
                                if (discount.promo_id === promo.id) {
                                    if (promo.nominal_percentage > highestDiscount) {
                                        this.discount = promo;
                                        this.discount.id = discount.id;
                                        highestDiscount = promo.nominal_percentage;
                                    }
                                }
                            }
                        }
                        else if (promo.status == 'voucher') {
                            for (const voucher of this.customer.voucher) {
                                if (voucher.promo_id === promo.id) {
                                    if (promo.nominal_rupiah > highestVoucher) {
                                        this.voucher = promo;
                                        this.voucher.id = voucher.id;
                                        highestVoucher = promo.nominal_rupiah;
                                    }
                                }
                            }
                        }
                    }
                    this.changeDiscount.emit(highestDiscount);
                    this.changeVoucher.emit(highestVoucher);
                    this.changeDetails.emit();
                    this.loadingProgress = 100;
                },
                error: (err) => {
                    console.error(err);
                    this.loadingProgress = 100;
                }
            });
        }
        else {
            this.changeDiscount.emit(0);
            this.changeVoucher.emit(0);
            this.changeDetails.emit();
        }
    }
    addTotalItem(productId) {
        for (const product of this.productOrders) {
            if (product.id === productId) {
                product.total_item++;
                break;
            }
        }
        this.changeDetails.emit();
    }
    reduceTotalItem(productId) {
        for (let i = 0; i < this.productOrders.length; i++) {
            if (this.productOrders[i].id === productId) {
                if (this.productOrders[i].total_item > 1) {
                    this.productOrders[i].total_item--;
                }
                else {
                    this.productOrders.splice(i, 1);
                }
                break;
            }
        }
        this.changeDetails.emit();
    }
    toggleNoteInput(product) {
        product.showNoteInput = !product.showNoteInput;
    }
    clearNote(product) {
        product.note = '';
    }
    onAfterSaveCustomer(success) {
        if (success) {
            this.afterSaveCustomer.emit(true);
            this.getCustomers();
        }
        this.afterSaveCustomer.emit(false);
    }
    drop(event) {
        moveItemInArray(this.productOrders, event.previousIndex, event.currentIndex);
    }
    insert() {
        const sale = {
            customer_id: this.customer?.id,
            voucher_id: this.voucher?.id ?? '',
            voucher_nominal: this.voucher?.nominal_rupiah,
            discount_id: this.discount?.id ?? '',
            total: this.paymentDetail?.total,
            details: []
        };
        const details = [];
        this.productOrders.forEach((productOrder, i) => {
            details.push({
                product_id: productOrder?.id,
                product_detail_id: productOrder?.selected_detail?.id,
                total_item: productOrder?.total_item,
                price: productOrder?.price,
                discount_nominal: this.productDiscounts[i],
                note: productOrder?.note,
            });
        });
        sale.details = details;
        this.isLoadingInsert = true;
        this.saleService.createSale(sale).subscribe({
            next: (res) => {
                this.landaService.alertSuccess('Berhasil', res.message);
                this.isLoadingInsert = false;
                this.resetData();
            },
            error: (err) => {
                this.landaService.alertError('Mohon Maaf', err.error.errors);
                this.isLoadingInsert = false;
            }
        });
    }
    resetData() {
        this.customer = null;
        this.voucher = null;
        this.discount = null;
        this.paymentDetail = {
            subtotal: 0,
            tax: 0,
            discount: 0,
            voucher: 0,
            total: 0,
        };
        this.productOrders = null;
        this.productDiscounts = null;
        this.afterSaveSale.emit(true);
    }
};
__decorate([
    Input()
], FormSaleComponent.prototype, "customer", void 0);
__decorate([
    Input()
], FormSaleComponent.prototype, "productOrders", void 0);
__decorate([
    Input()
], FormSaleComponent.prototype, "paymentDetail", void 0);
__decorate([
    Input()
], FormSaleComponent.prototype, "productDiscounts", void 0);
__decorate([
    Output()
], FormSaleComponent.prototype, "changeDiscount", void 0);
__decorate([
    Output()
], FormSaleComponent.prototype, "changeVoucher", void 0);
__decorate([
    Output()
], FormSaleComponent.prototype, "afterSaveCustomer", void 0);
__decorate([
    Output()
], FormSaleComponent.prototype, "changeDetails", void 0);
__decorate([
    Output()
], FormSaleComponent.prototype, "afterSaveSale", void 0);
FormSaleComponent = __decorate([
    Component({
        selector: 'app-form-sale',
        templateUrl: './form-sale.component.html',
        styleUrls: ['./form-sale.component.scss'],
        animations: [
            trigger('slideInOut', [
                transition(':enter', [
                    style({ transform: 'translateX(-100%)' }),
                    animate('.2s ease-out', style({ transform: 'translateX(0)' }))
                ]),
                transition(':leave', [
                    animate('.1s ease-in', style({ transform: 'translateX(100%)' }))
                ])
            ])
        ]
    })
], FormSaleComponent);
export { FormSaleComponent };
//# sourceMappingURL=form-sale.component.js.map