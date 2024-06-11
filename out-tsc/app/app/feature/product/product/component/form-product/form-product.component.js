import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
let FormProductComponent = class FormProductComponent {
    constructor(productService, categoryService, landaService) {
        this.productService = productService;
        this.categoryService = categoryService;
        this.landaService = landaService;
        this.DEFAULT_STATUS = '1';
        this.DEFAULT_TYPE = 'Toping';
        this.MODE_CREATE = 'add';
        this.MODE_UPDATE = 'update';
        this.afterSave = new EventEmitter();
        this.categories = [];
        this.configEditor = ClassicEditor;
        this.isDisabledForm = false;
        this.isLoading = false;
        this.loadingProgress = 0;
    }
    ngOnInit() {
        this.resetForm();
    }
    getCategories(name = '') {
        this.isLoadingCategories = true;
        this.categoryService.getCategories({ name: name }).subscribe({
            next: (res) => {
                this.categories = res.data.list;
                this.isLoadingCategories = false;
            },
            error: (err) => {
                console.error(err);
            }
        });
    }
    getCroppedImage($event) {
        this.formModel.photo = $event;
    }
    resetForm() {
        this.formModel = {
            id: '',
            name: '',
            product_category_id: '',
            price: '',
            description: '',
            photo: '',
            photo_url: '',
            is_available: this.DEFAULT_STATUS,
            details: [],
            details_deleted: []
        };
        this.getCategories();
        if (this.productId != '') {
            this.activeMode = this.MODE_UPDATE;
            this.getProduct(this.productId);
            return true;
        }
        this.activeMode = this.MODE_CREATE;
    }
    getProduct(productId) {
        this.productService.getProductId(productId).subscribe({
            next: (res) => {
                this.loadingProgress = 100;
                this.formModel = res.data;
                this.formModel.details_deleted = [];
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
        this.isLoading = true;
        this.productService.createProduct(this.formModel).subscribe({
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
        console.log(this.formModel);
        this.productService.updateProduct(this.formModel).subscribe({
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
    addDetail() {
        let val = {
            is_added: true,
            description: '',
            type: this.DEFAULT_TYPE,
            price: 0,
        };
        this.formModel.details.push(val);
    }
    removeDetail(details, paramIndex) {
        if (details[paramIndex]?.id) {
            this.formModel.details_deleted.push(details[paramIndex]);
        }
        details.splice(paramIndex, 1);
    }
    changeDetail(details) {
        if (details?.id) {
            details.is_updated = true;
        }
    }
};
__decorate([
    Input()
], FormProductComponent.prototype, "productId", void 0);
__decorate([
    Output()
], FormProductComponent.prototype, "afterSave", void 0);
FormProductComponent = __decorate([
    Component({
        selector: 'app-form-product',
        templateUrl: './form-product.component.html',
        styleUrls: ['./form-product.component.scss']
    })
], FormProductComponent);
export { FormProductComponent };
//# sourceMappingURL=form-product.component.js.map