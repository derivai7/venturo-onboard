import {Component, OnInit, ViewChild} from '@angular/core';
import {CustomerService} from "../../../customer/services/customer.service";
import {ProductService} from "../../../product/product/services/product.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NgSelectComponent} from "@ng-select/ng-select";

@Component({
    selector: 'app-list-sale',
    templateUrl: './list-sale.component.html',
    styleUrls: ['./list-sale.component.scss']
})
export class ListSaleComponent implements OnInit {
    @ViewChild(NgSelectComponent) selectCustomer: NgSelectComponent
    readonly TAX_RATE: number = 11;

    percentageDiscount: number = 0;
    nomVoucher: number = 0;
    productDiscounts: any[] = [];

    loadingCustomer: boolean;
    loadingProgressProduct: number;

    customers: Array<{
        id: string,
        name: string
    }> = [];

    products: Array<{
        id: string,
        name: string,
        price: string,
        photo_url: string,
        is_available: string,
        details: [{
            id: string,
            description: string,
            price: number
        }],
        selected_detail: {
            id: string,
            description: string,
            price: number
        };
    }>

    filter: {
        product_name: '',
    };

    selectedCustomer: any;

    productOrders: Array<{
        id: string,
        name: string,
        price: number,
        photo_url: string,
        total_item: number,
        total_nominal: number,
        note: string,
        showNoteInput: boolean,
        selected_detail: {
            id: string,
            description: string,
            price: number
        },
    }> = [];

    paymentDetail: {
        subtotal: number,
        tax: number,
        discount: number,
        voucher: number,
        total: number,
    };
    productId: string;

    constructor(
        private customerService: CustomerService,
        private productService: ProductService,
        private modalService: NgbModal
    ) {
    }

    ngOnInit(): void {
        this.setDefaultFilter();
        this.getCustomers();
        this.getProducts('');
        this.setDefaultPaymentDetail();
    }

    setDefaultFilter() {
        this.filter = {
            product_name: '',
        }
    }

    setDefaultPaymentDetail() {
        this.productOrders = [];
        this.paymentDetail = {
            subtotal: 0,
            tax: 0,
            discount: 0,
            voucher: 0,
            total: 0,
        }
    }

    getCustomers() {
        this.loadingCustomer = true;
        this.customerService.getCustomers().subscribe({
            next: (res: any) => {
                this.customers = res.data.list;
                this.loadingCustomer = false;
            },
            error: (err: any) => {
                console.error(err);
            }
        });
    }

    getProducts(name: '') {
        this.loadingProgressProduct = 0;
        this.productService.getProducts({name: name, is_available: '1'}).subscribe({
            next: (res: any) => {
                this.products = res.data.list;
                this.loadingProgressProduct = 100;
            },
            error: (err: any) => {
                console.error(err);
                this.loadingProgressProduct = 100;
            }
        });
    }

    onCustomerChange(event: any) {
        this.selectedCustomer = event;
    }

    addMenuOrder(product: any) {
        let productExists = false;
        if (this.productOrders) {
            for (const productOrder of this.productOrders) {
                if (productOrder.id == product.id && productOrder.selected_detail?.id == product.selected_detail?.id) {
                    productOrder.total_item++;
                    productOrder.total_nominal += product.price;
                    if (productOrder.selected_detail.id) {
                        productOrder.total_nominal += product.selected_detail.price;
                    }
                    productExists = true;
                    break;
                }
            }
        }

        if (!productExists) {
            const newProductOrder = {
                ...product,
                total_item: 1,
                total_nominal: product.price,
                note: '',
            };
            if (newProductOrder.selected_detail) {
                newProductOrder.total_nominal += newProductOrder.selected_detail.price;
            }

            this.productOrders.push(newProductOrder);
        }

        if (product.selected_detail) {
            product.selected_detail = undefined;
        }
        this.calculatePaymentDetails();
    }

    discountChange(value: number) {
        this.percentageDiscount = value;
    }

    voucherChange(value: number) {
        this.nomVoucher = value;
    }

    calculatePaymentDetails() {
        this.paymentDetail.subtotal = 0;
        let totalDiscount: number = 0;
        this.productDiscounts = [];

        for (const productOrder of this.productOrders) {
            this.paymentDetail.subtotal += productOrder.total_nominal;

            const productDiscount = (productOrder.total_nominal * (this.percentageDiscount / 100)) * productOrder.total_item;
            this.productDiscounts.push(productDiscount)
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

    updateProduct(modalId: any, productId: any) {
        this.productId = productId;
        this.modalService.open(modalId, {size: 'xl', backdrop: 'static'});
    }

    afterSaveCustomer(success: boolean) {
        if (success) {
            this.getCustomers();
        }
    }

    afterSaveSale(success: boolean) {
        this.setDefaultPaymentDetail();
        if (success) {
            this.selectCustomer.clearModel();
        }
    }
}
