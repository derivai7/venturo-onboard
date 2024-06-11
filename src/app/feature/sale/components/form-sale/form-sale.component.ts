import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, TemplateRef} from '@angular/core';
import {PromoService} from "../../../promo/services/promo.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {animate, style, transition, trigger} from "@angular/animations";
import {CustomerService} from "../../../customer/services/customer.service";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {SaleService} from "../../services/sale.service";
import {LandaService} from "../../../../core/services/landa.service";
import * as moment from 'moment';
import Swal from "sweetalert2";

@Component({
    selector: 'app-form-sale',
    templateUrl: './form-sale.component.html',
    styleUrls: ['./form-sale.component.scss'],
    animations: [
        trigger('slideInOut', [
            transition(':enter', [
                style({transform: 'translateX(-100%)'}),
                animate('.2s ease-out', style({transform: 'translateX(0)'}))
            ]),
            transition(':leave', [
                animate('.1s ease-in', style({transform: 'translateX(100%)'}))
            ])
        ])
    ]
})
export class FormSaleComponent implements OnChanges {
    @Input() customer: any;
    @Input() productOrders: Array<{
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
    }>;
    @Input() paymentDetail: {
        subtotal: number,
        tax: number,
        discount: number,
        voucher: number,
        total: number,
    };
    @Input() productDiscounts: any[];

    @Output() changeDiscount = new EventEmitter<number>();
    @Output() changeVoucher = new EventEmitter<number>();
    @Output() afterSaveCustomer = new EventEmitter<boolean>();
    @Output() changeDetails = new EventEmitter<boolean>();
    @Output() afterSaveSale = new EventEmitter<boolean>();

    discount: {
        id: string,
        promo_id: string,
        nominal_percentage: number,
        name: string,
    };
    voucher: {
        id: string,
        promo_id: string,
        nominal_rupiah: number,
        name: string,
    };

    loadingProgress: number;
    isLoadingInsert: boolean;

    constructor(
        private customerService: CustomerService,
        private promoService: PromoService,
        private modalService: NgbModal,
        private saleService: SaleService,
        private landaService: LandaService,
    ) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['customer']) {
            this.getPromoByCustomer();
        }
    }

    updateCustomer(modalId: TemplateRef<any>) {
        this.modalService.open(modalId, {size: 'lg', backdrop: 'static'});
    }

    getCustomers() {
        this.customerService.getCustomers().subscribe({
            next: (res: any) => {
                const customers = res.data.list;

                for (const customer of customers) {
                    if (customer.id === this.customer.id) {
                        this.customer = customer;
                    }
                }
            },
            error: (err: any) => {
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
                next: (res: any) => {
                    const promos = res.data.list;

                    let highestDiscount = 0;
                    let highestVoucher = 0;
                    for (const promo of promos) {
                        if (promo.status == 'discount') {
                            for (const discount of this.customer.discount) {
                                if (discount.promo_id === promo.id) {
                                    if (promo.nominal_percentage > highestDiscount) {
                                        this.discount = {...promo, id: discount.id};
                                        highestDiscount = promo.nominal_percentage;
                                    }
                                }
                            }
                        } else if (promo.status == 'voucher') {
                            const today = moment();
                            for (const voucher of this.customer.voucher) {
                                if (voucher.total_voucher > 0 && voucher.promo_id === promo.id) {
                                    const startDate = moment(voucher.start_time);
                                    const endDate = moment(voucher.end_time);
                                    if (today.isSameOrAfter(startDate) && today.isSameOrBefore(endDate) &&
                                        promo.nominal_rupiah > highestVoucher) {
                                        this.voucher = {...promo, id: voucher.id};
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
                error: (err: any) => {
                    console.error(err);
                    this.loadingProgress = 100;
                }
            });
        } else {
            this.changeDiscount.emit(0);
            this.changeVoucher.emit(0);
            this.changeDetails.emit();
        }
    }

    addTotalItem(product: any) {
        for (const productOrder of this.productOrders) {
            if (productOrder.id === product.id && productOrder.selected_detail?.id === product.selected_detail?.id) {
                productOrder.total_item++;
                productOrder.total_nominal += productOrder.price;
                break;
            }
        }
        this.changeDetails.emit();
    }

    reduceTotalItem(product: any) {
        for (let i = 0; i < this.productOrders.length; i++) {
            if (this.productOrders[i].id === product.id &&
                this.productOrders[i].selected_detail?.id === product.selected_detail?.id) {
                if (this.productOrders[i].total_item > 1) {
                    this.productOrders[i].total_item--;
                    this.productOrders[i].total_nominal -= this.productOrders[i].price;
                } else {
                    this.deletedOrder(() => {
                        this.productOrders.splice(i, 1);
                    });
                }
                break;
            }
        }
        this.changeDetails.emit()
    }

    deletedOrder(callback: () => void) {
        Swal.fire({
            text: 'Apakah anda yakin menghapus?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#2c8da2',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!'
        }).then((result) => {
            if (result.isConfirmed) {
                callback();
            }
        });
    }

    toggleNoteInput(product: any) {
        product.showNoteInput = !product.showNoteInput;
    }

    clearNote(product: any) {
        product.note = '';
    }

    onAfterSaveCustomer(success: boolean) {
        if (success) {
            this.afterSaveCustomer.emit(true);
            this.getCustomers();
        }
        this.afterSaveCustomer.emit(false);
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.productOrders, event.previousIndex, event.currentIndex);
    }

    save() {
        const sale = {
            customer_id: this.customer?.id,
            voucher_id: this.voucher?.id ?? '',
            voucher_nominal: this.voucher?.nominal_rupiah,
            discount_id: this.discount?.id ?? '',
            subtotal: this.paymentDetail?.subtotal,
            total_payment: this.paymentDetail?.total,
            details: []
        };

        const details = [];
        this.productOrders.forEach((productOrder, i) => {
            details.push({
                product_id: productOrder?.id,
                product_detail_id: productOrder?.selected_detail?.id,
                total_item: productOrder?.total_item,
                price: productOrder?.total_nominal,
                discount_nominal: this.productDiscounts[i],
                note: productOrder?.note,
            });
        });
        sale.details = details;

        this.isLoadingInsert = true;
        this.saleService.createSale(sale).subscribe({
            next: (res: any) => {
                this.landaService.alertSuccess('Berhasil', res.message);
                this.isLoadingInsert = false;
                setTimeout(() => {
                    this.resetData();
                }, 1000)
            },
            error: (err) => {
                this.landaService.alertError('Mohon Maaf', err.error.errors);
                this.isLoadingInsert = false;
            },
        });
    }

    resetData() {
        this.customer = null;
        this.voucher = null;
        this.discount = null;
        this.afterSaveSale.emit(true);
    }
}
