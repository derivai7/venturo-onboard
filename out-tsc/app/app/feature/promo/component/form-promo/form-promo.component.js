import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
let FormPromoComponent = class FormPromoComponent {
    constructor(promoService, landaService) {
        this.promoService = promoService;
        this.landaService = landaService;
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
    getCroppedImage($event) {
        this.formModel.photo = $event;
    }
    resetForm() {
        this.formModel = {
            id: '',
            name: '',
            status: 'voucher',
            expired_in_day: '',
            nominal_percentage: '',
            nominal_rupiah: '',
            term_conditions: '',
            photo: '',
            photo_url: '',
        };
        if (this.promoId != '') {
            this.activeMode = this.MODE_UPDATE;
            this.getProduct(this.promoId);
            return true;
        }
        this.activeMode = this.MODE_CREATE;
    }
    getProduct(productId) {
        this.promoService.getPromoById(productId).subscribe({
            next: (res) => {
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
        this.promoService.createPromo(this.formModel).subscribe({
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
        this.promoService.updatePromo(this.formModel).subscribe({
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
};
__decorate([
    Input()
], FormPromoComponent.prototype, "promoId", void 0);
__decorate([
    Output()
], FormPromoComponent.prototype, "afterSave", void 0);
FormPromoComponent = __decorate([
    Component({
        selector: 'app-form-promo',
        templateUrl: './form-promo.component.html',
        styleUrls: ['./form-promo.component.scss']
    })
], FormPromoComponent);
export { FormPromoComponent };
//# sourceMappingURL=form-promo.component.js.map