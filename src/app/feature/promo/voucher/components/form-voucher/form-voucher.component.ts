import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {VoucherService} from "../../services/voucher.service";
import {CustomerService} from "../../../../customer/services/customer.service";
import {PromoService} from "../../../services/promo.service";
import {LandaService} from "../../../../../core/services/landa.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import * as moment from 'moment';

@Component({
    selector: 'app-form-voucher',
    templateUrl: './form-voucher.component.html',
    styleUrls: ['./form-voucher.component.scss']
})

export class FormVoucherComponent implements OnInit {
    readonly PROMO_VOUCHER = 'voucher';
    readonly MODE_CREATE = 'add';
    readonly MODE_UPDATE = 'update';

    @Input() voucherId: string;
    @Output() afterSave = new EventEmitter<boolean>();

    formModel: {
        id: string,
        period: string,
        customer_id: string,
        expired_in_day: number,
        promo_id: string,
        start_time: string,
        end_time: string,
        total_voucher: string,
        nominal_rupiah: number,
        photo: string,
        photo_url: string,
        description: string
    }

    configEditor = ClassicEditor;
    activeMode: string;

    customers: [];
    promo: [
        expired_in_day: number,
        nominal_rupiah: string,
        photo_url: number
    ];

    loadingData: boolean;
    isDisabledForm: boolean = false;
    loadingProgress: number = 0;

    constructor(
        private modalService: NgbModal,
        private voucherService: VoucherService,
        private customerService: CustomerService,
        private promoService: PromoService,
        private landaService: LandaService,
    ) {
    }

    ngOnInit(): void {
        this.resetForm();
    }

    setPeriodValue($event: any) {
        const startDate = $event.startDate ? moment($event.startDate) : moment();
        this.formModel.start_time = startDate.format('YYYY-MM-DD');

        this.formModel.end_time = startDate.add(this.formModel.expired_in_day, 'days').format('YYYY-MM-DD');
    }

    resetForm() {
        this.getCustomers();
        this.getPromo();
        this.formModel = {
            id: '',
            period: '',
            customer_id: null,
            promo_id: null,
            expired_in_day: 0,
            start_time: '',
            end_time: '',
            total_voucher: '',
            nominal_rupiah: 0,
            photo: '',
            photo_url: '',
            description: ''
        }

        if (this.voucherId != '') {
            this.activeMode = this.MODE_UPDATE;
            this.getVoucherById(this.voucherId);
            return true;
        }

        this.activeMode = this.MODE_CREATE;
    }

    getCustomers(name = '') {
        this.loadingData = true;

        this.customerService.getCustomers(name).subscribe({
            next: (res: any) => {
                this.customers = res.data.list;

                this.loadingData = false;
            },
            error: (err: any) => {
                console.error(err);
            }
        });
    }

    getPromo(name = '') {
        this.loadingData = true;

        this.promoService.getPromo({name: name, status: this.PROMO_VOUCHER}).subscribe({
            next: (res: any) => {
                this.promo = res.data.list;

                this.loadingData = false;
            },
            error: (err: any) => {
                console.error(err);
            }
        });
    }

    setSelectedPromo($event: any) {
        if (!this.formModel.promo_id) {
            this.formModel.photo_url = '';
            this.formModel.start_time = '';
            this.formModel.end_time = '';
        } else {
            this.formModel.expired_in_day = $event.expired_in_day;
            this.formModel.nominal_rupiah = $event.nominal_rupiah;
            this.formModel.photo_url = $event.photo_url;
            this.formModel.photo = $event.photo;
        }
        this.setPeriodValue($event);
    }

    getVoucherById(name = '') {
        this.voucherService.getVoucherById(name).subscribe({
            next: (res: any) => {
                this.loadingProgress = 100;

                this.formModel = res.data;
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    save() {
        switch (this.activeMode) {
            case this.MODE_CREATE:
                this.insert();
                break;
            case this.MODE_UPDATE:
                this.update();
                break;
        }
    }

    back() {
        this.afterSave.emit(false);
    }

    insert() {
        this.isDisabledForm = true;

        this.voucherService.createVoucher(this.formModel).subscribe({
            next: (res: any) => {
                this.landaService.alertSuccess('Berhasil', res.message);
                this.afterSave.emit(true);

                this.isDisabledForm = false;
            },
            error: (err) => {
                this.landaService.alertError('Mohon Maaf', err.error.errors);

                this.isDisabledForm = false;
            }
        });
    }

    update() {
        this.isDisabledForm = true;

        this.voucherService.updateVoucher(this.formModel).subscribe({
            next: (res: any) => {
                this.landaService.alertSuccess('Berhasil', res.message);
                this.afterSave.emit(true);
                this.isDisabledForm = false;
            },
            error: (err) => {
                this.landaService.alertError('Mohon Maaf', err.error.errors);

                this.isDisabledForm = false;
            }
        });
    }

    createCustomer(modalId: any) {
        this.modalService.open(modalId, {size: 'lg', backdrop: 'static'});
    }
}
