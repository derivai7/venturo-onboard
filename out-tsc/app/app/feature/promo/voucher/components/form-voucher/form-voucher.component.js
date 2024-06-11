import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as moment from 'moment';
let FormVoucherComponent = class FormVoucherComponent {
    constructor(modalService, voucherService, customerService, promoService, landaService) {
        this.modalService = modalService;
        this.voucherService = voucherService;
        this.customerService = customerService;
        this.promoService = promoService;
        this.landaService = landaService;
        this.PROMO_VOUCHER = 'voucher';
        this.MODE_CREATE = 'add';
        this.MODE_UPDATE = 'update';
        this.afterSave = new EventEmitter();
        this.configEditor = ClassicEditor;
        this.isDisabledForm = false;
        this.loadingProgress = 0;
    }
    ngOnInit() {
        this.resetForm();
    }
    setPeriodValue($event) {
        if ($event.startDate) {
            this.formModel.start_time = $event.startDate;
        }
        else if (!this.formModel.start_time) {
            this.formModel.start_time = moment().toISOString();
        }
        this.formModel.end_time = moment($event.startDate).add(this.formModel.expired_in_day, 'days').toISOString();
    }
    getCroppedImage($event) {
        this.formModel.photo = $event;
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
        };
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
            next: (res) => {
                this.customers = res.data.list;
                this.loadingData = false;
            },
            error: (err) => {
                console.error(err);
            }
        });
    }
    getPromo(name = '') {
        this.loadingData = true;
        this.promoService.getPromo({ name: name, status: this.PROMO_VOUCHER }).subscribe({
            next: (res) => {
                this.promo = res.data.list;
                this.loadingData = false;
            },
            error: (err) => {
                console.error(err);
            }
        });
    }
    setSelectedPromo($event) {
        if (!this.formModel.promo_id) {
            this.formModel.photo_url = '';
            this.formModel.start_time = '';
            this.formModel.end_time = '';
        }
        else {
            this.formModel.expired_in_day = $event.expired_in_day;
            this.formModel.nominal_rupiah = $event.nominal_rupiah;
            this.formModel.photo_url = $event.photo_url;
            this.formModel.photo = $event.photo;
        }
        this.setPeriodValue($event);
    }
    getVoucherById(name = '') {
        this.voucherService.getVoucherById(name).subscribe({
            next: (res) => {
                this.loadingProgress = 100;
                this.formModel = res.data;
                console.log(this.formModel);
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
            next: (res) => {
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
            next: (res) => {
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
    createCustomer(modalId) {
        this.modalService.open(modalId, { size: 'lg', backdrop: 'static' });
    }
};
__decorate([
    Input()
], FormVoucherComponent.prototype, "voucherId", void 0);
__decorate([
    Output()
], FormVoucherComponent.prototype, "afterSave", void 0);
FormVoucherComponent = __decorate([
    Component({
        selector: 'app-form-voucher',
        templateUrl: './form-voucher.component.html',
        styleUrls: ['./form-voucher.component.scss']
    })
], FormVoucherComponent);
export { FormVoucherComponent };
//# sourceMappingURL=form-voucher.component.js.map