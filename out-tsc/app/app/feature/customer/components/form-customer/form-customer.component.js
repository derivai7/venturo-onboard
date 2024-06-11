import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
let FormCustomerComponent = class FormCustomerComponent {
    constructor(customerService, landaService) {
        this.customerService = customerService;
        this.landaService = landaService;
        this.afterSave = new EventEmitter;
        this.MODE_CREATE = 'add';
        this.MODE_UPDATE = 'update';
        this.isDisabledForm = false;
        this.isLoading = false;
        this.loadingProgress = 0;
    }
    ngOnInit() {
        this.resetForm();
    }
    getCustomer(userId) {
        this.customerService.getCustomerById(userId).subscribe({
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
    resetForm() {
        this.formModel = {
            id: '',
            name: '',
            email: '',
            date_of_birth: '',
            phone_number: '',
            is_verified: '',
            photo: '',
            photo_url: '',
        };
        if (this.customerId != '') {
            this.activeMode = this.MODE_UPDATE;
            this.getCustomer(this.customerId);
            return true;
        }
        this.activeMode = this.MODE_CREATE;
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
        this.isLoading = true;
        this.customerService.createCustomer(this.formModel).subscribe({
            next: (res) => {
                this.landaService.alertSuccess('Berhasil', res.message);
                this.afterSave.emit(true);
                this.isDisabledForm = false;
                this.isLoading = false;
            },
            error: (err) => {
                this.landaService.alertError('Mohon Maaf', err.error.errors);
                this.isDisabledForm = false;
                this.isLoading = false;
            }
        });
    }
    update() {
        this.isDisabledForm = true;
        this.isLoading = true;
        this.customerService.updateCustomer(this.formModel).subscribe({
            next: (res) => {
                this.landaService.alertSuccess('Berhasil', res.message);
                this.afterSave.emit(true);
                this.isDisabledForm = false;
                this.isLoading = false;
            },
            error: (err) => {
                this.landaService.alertError('Mohon Maaf', err.error.errors);
                this.isDisabledForm = false;
                this.isLoading = false;
            }
        });
    }
    getCroppedImage($event) {
        this.formModel.photo = $event;
    }
};
__decorate([
    Input()
], FormCustomerComponent.prototype, "customerId", void 0);
__decorate([
    Input()
], FormCustomerComponent.prototype, "titleForm", void 0);
__decorate([
    Input()
], FormCustomerComponent.prototype, "isModal", void 0);
__decorate([
    Output()
], FormCustomerComponent.prototype, "afterSave", void 0);
FormCustomerComponent = __decorate([
    Component({
        selector: 'app-form-customer',
        templateUrl: './form-customer.component.html',
        styleUrls: ['./form-customer.component.scss']
    })
], FormCustomerComponent);
export { FormCustomerComponent };
//# sourceMappingURL=form-customer.component.js.map