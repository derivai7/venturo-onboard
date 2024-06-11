import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
let FormUserComponent = class FormUserComponent {
    constructor(userService, landaService) {
        this.userService = userService;
        this.landaService = landaService;
        this.afterSave = new EventEmitter;
        this.MODE_CREATE = 'add';
        this.MODE_UPDATE = 'update';
        this.roles = [];
        this.isDisabledForm = false;
        this.isLoading = false;
    }
    ngOnInit() {
        this.getRoles();
        this.resetForm();
    }
    getUser(userId) {
        this.userService.getUserById(userId).subscribe((res) => {
            this.formModel = res.data;
        }, err => {
            console.log(err);
        });
    }
    getRoles() {
        this.userService.getRoles().subscribe((res) => {
            this.roles = res.data.list;
        }, err => {
            console.log(err);
        });
    }
    resetForm() {
        this.formModel = {
            id: '',
            name: '',
            email: '',
            password: '',
            phone_number: '',
            user_roles_id: '',
            photo: '',
            photo_url: '',
        };
        if (this.userId != '') {
            this.activeMode = this.MODE_UPDATE;
            this.getUser(this.userId);
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
    insert() {
        this.isDisabledForm = true;
        this.isLoading = true;
        this.userService.createUser(this.formModel).subscribe((res) => {
            this.landaService.alertSuccess('Berhasil', res.message);
            this.afterSave.emit(true);
            this.isDisabledForm = false;
            this.isLoading = false;
        }, err => {
            this.landaService.alertError('Mohon Maaf', err.error.errors);
            this.isDisabledForm = false;
            this.isLoading = false;
        });
    }
    update() {
        this.isDisabledForm = true;
        this.isLoading = true;
        this.userService.updateUser(this.formModel).subscribe((res) => {
            this.landaService.alertSuccess('Berhasil', res.message);
            this.afterSave.emit(true);
            this.isDisabledForm = false;
            this.isLoading = false;
        }, err => {
            this.landaService.alertError('Mohon Maaf', err.error.errors);
            this.isDisabledForm = false;
            this.isLoading = false;
        });
    }
    getCroppedImage($event) {
        this.formModel.photo = $event;
    }
};
__decorate([
    Input()
], FormUserComponent.prototype, "userId", void 0);
__decorate([
    Output()
], FormUserComponent.prototype, "afterSave", void 0);
FormUserComponent = __decorate([
    Component({
        selector: 'app-form-user',
        templateUrl: './form-user.component.html',
        styleUrls: ['./form-user.component.scss']
    })
], FormUserComponent);
export { FormUserComponent };
//# sourceMappingURL=form-user.component.js.map