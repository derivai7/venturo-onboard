import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { NgSelectComponent } from "@ng-select/ng-select";
let ListSaleComponent = class ListSaleComponent {
    constructor(customerService, productService, promoService, modalService) {
        this.customerService = customerService;
        this.productService = productService;
        this.promoService = promoService;
        this.modalService = modalService;
        this.TAX_RATE = 11;
        this.percentageDiscount = 0;
        this.nomVoucher = 0;
        this.productDiscounts = [];
        this.customers = [];
        this.productOrders = [];
    }
    ngOnInit() {
        this.setDefaultFilter();
        this.getCustomers();
        this.getProducts('');
        this.setDefaultPaymentDetail();
    }
    setDefaultFilter() {
        this.filter = {
            product_name: '',
        };
    }
    setDefaultPaymentDetail() {
        this.paymentDetail = {
            subtotal: 0,
            tax: 0,
            discount: 0,
            voucher: 0,
            total: 0,
        };
    }
    getCustomers() {
        this.loadingCustomer = true;
        this.customerService.getCustomers().subscribe({
            next: (res) => {
                this.customers = res.data.list;
                this.loadingCustomer = false;
            },
            error: (err) => {
                console.error(err);
            }
        });
    }
    getProducts(name) {
        this.loadingProgressProduct = 0;
        this.productService.getProducts({ name: name, is_available: '1' }).subscribe({
            next: (res) => {
                this.products = res.data.list;
                this.loadingProgressProduct = 100;
            },
            error: (err) => {
                console.error(err);
                this.loadingProgressProduct = 100;
            }
        });
    }
    onCustomerChange(event) {
        this.selectedCustomer = event;
    }
    addMenuOrder(product) {
        let productExists = false;
        for (const productOrder of this.productOrders) {
            if (productOrder.id == product.id && productOrder.selected_detail?.id == product.selected_detail?.id) {
                productOrder.total_item++;
                productExists = true;
                break;
            }
        }
        if (!productExists) {
            const newProductOrder = {
                ...product,
                total_item: 1,
                note: '',
            };
            if (newProductOrder.selected_detail) {
                newProductOrder.price += newProductOrder.selected_detail.price;
            }
            this.productOrders.push(newProductOrder);
        }
        if (product.selected_detail) {
            product.selected_detail = undefined;
        }
        this.calculatePaymentDetails();
    }
    discountChange(value) {
        this.percentageDiscount = value;
    }
    voucherChange(value) {
        this.nomVoucher = value;
    }
    calculatePaymentDetails() {
        this.paymentDetail.subtotal = 0;
        let totalDiscount = 0;
        this.productDiscounts = [];
        for (const productOrder of this.productOrders) {
            const productSubtotal = productOrder.price * productOrder.total_item;
            this.paymentDetail.subtotal += productSubtotal;
            const productDiscount = (productOrder.price * (this.percentageDiscount / 100)) * productOrder.total_item;
            this.productDiscounts.push(productDiscount);
            totalDiscount += productDiscount;
        }
        this.paymentDetail.tax = this.paymentDetail.subtotal * (this.TAX_RATE / 100);
        this.paymentDetail.discount = totalDiscount;
        this.paymentDetail.voucher = this.nomVoucher;
        this.paymentDetail.total = (this.paymentDetail.subtotal + this.paymentDetail.tax) - this.paymentDetail.discount
            - this.paymentDetail.voucher;
    }
    clearFilterProduct() {
        this.filter.product_name = '';
        this.getProducts('');
    }
    updateProduct(modalId, productId) {
        this.productId = productId;
        this.modalService.open(modalId, { size: 'xl', backdrop: 'static' });
    }
    afterSaveCustomer(success) {
        if (success) {
            this.getCustomers();
        }
    }
    afterSaveSale(success) {
        if (success) {
            this.selectCustomer.clearModel();
        }
    }
};
__decorate([
    ViewChild(NgSelectComponent)
], ListSaleComponent.prototype, "selectCustomer", void 0);
ListSaleComponent = __decorate([
    Component({
        selector: 'app-list-sale',
        templateUrl: './list-sale.component.html',
        styleUrls: ['./list-sale.component.scss']
    })
], ListSaleComponent);
export { ListSaleComponent };
//# sourceMappingURL=list-sale.component.js.map