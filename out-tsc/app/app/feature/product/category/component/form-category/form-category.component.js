import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
let FormCategoryComponent = class FormCategoryComponent {
    constructor(categoryService, landaService) {
        this.categoryService = categoryService;
        this.landaService = landaService;
        this.MODE_CREATE = 'add';
        this.MODE_UPDATE = 'update';
        this.afterSave = new EventEmitter();
        this.isDisabledForm = false;
        this.isLoading = false;
    }
    ngOnInit() {
        this.resetForm();
    }
    resetForm() {
        this.formModel = {
            id: '',
            name: '',
        };
        if (this.categoryId != '') {
            this.activeMode = this.MODE_UPDATE;
            this.getCategory(this.categoryId);
            return true;
        }
        this.activeMode = this.MODE_CREATE;
    }
    getCategory(categoryId) {
        this.categoryService.getCategoryById(categoryId).subscribe((res) => {
            this.formModel = res.data;
        }, err => {
            console.log(err);
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
    insert() {
        this.isDisabledForm = true;
        this.isLoading = true;
        this.categoryService.createCategory(this.formModel).subscribe((res) => {
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
        this.categoryService.updateCategory(this.formModel).subscribe((res) => {
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
};
__decorate([
    Input()
], FormCategoryComponent.prototype, "categoryId", void 0);
__decorate([
    Output()
], FormCategoryComponent.prototype, "afterSave", void 0);
FormCategoryComponent = __decorate([
    Component({
        selector: 'app-form-category',
        templateUrl: './form-category.component.html',
        styleUrls: ['./form-category.component.scss']
    })
], FormCategoryComponent);
export { FormCategoryComponent };
//# sourceMappingURL=form-category.component.js.map