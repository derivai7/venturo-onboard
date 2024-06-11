import { __decorate } from "tslib";
import { Component, EventEmitter, Output } from '@angular/core';
let FormProfileComponent = class FormProfileComponent {
    constructor(userService, landaService) {
        this.userService = userService;
        this.landaService = landaService;
        this.afterSave = new EventEmitter;
        this.isDisabledForm = false;
        this.isLoading = false;
    }
    ngOnInit() {
        this.resetForm();
    }
    getUserProfile(userId) {
        this.userService.getUserById(userId).subscribe({
            next: (res) => {
                this.formModel = res.data;
                this.getRoleUser(this.formModel.user_roles_id);
                console.log(this.formModel);
            },
            error: (err) => {
                console.log(err);
            }
        });
    }
    getRoleUser(roleId) {
        this.userService.getRolesById(roleId).subscribe({
            next: (res) => {
                this.formModel.user_roles_name = res.data.name;
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
            password: '',
            phone_number: '',
            user_roles_id: '',
            user_roles_name: '',
            photo: '',
            photo_url: '',
        };
        this.getUserProfile("3aee2c0d-8e69-4f79-82eb-cec5e2328c83");
        return true;
    }
    save() {
        this.update();
    }
    update() {
        this.isDisabledForm = true;
        this.isLoading = true;
        this.userService.updateUser(this.formModel).subscribe({
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
    Output()
], FormProfileComponent.prototype, "afterSave", void 0);
FormProfileComponent = __decorate([
    Component({
        selector: 'app-form-profile',
        templateUrl: './form-profile.component.html',
        styleUrls: ['./form-profile.component.scss']
    })
], FormProfileComponent);
export { FormProfileComponent };
//# sourceMappingURL=form-profile.component.js.map