import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
let ListProductComponent = class ListProductComponent {
    constructor(productService, categoryService, progressService) {
        this.productService = productService;
        this.categoryService = categoryService;
        this.progressService = progressService;
        this.listProduct = [];
        this.categories = [];
        this.loadingProgress = 0;
    }
    ngOnInit() {
        this.showForm = false;
        this.setDefault();
        this.getProducts();
        this.getCategories();
    }
    setDefault() {
        this.filter = {
            name: '',
            product_category_id: '',
            is_available: ''
        };
    }
    getProducts() {
        this.dtOptions = {
            serverSide: true,
            pageLength: 3,
            ajax: (dtParams, callback) => {
                this.loadingProgress = 0;
                this.progressService.startLoading();
                const params = {
                    ...this.filter,
                    per_page: dtParams.length,
                    page: (dtParams.start / dtParams.length) + 1,
                };
                this.productService.getProducts(params).subscribe({
                    next: (res) => {
                        const { list, meta } = res.data;
                        let number = dtParams.start + 1;
                        list.forEach(val => {
                            val.no = number++;
                        });
                        this.listProduct = list;
                        this.loadingProgress = 100;
                        this.progressService.finishLoading();
                        callback({
                            recordsTotal: meta.total,
                            recordsFiltered: meta.total,
                            data: [],
                        });
                    },
                    error: (err) => {
                        console.error(err);
                        this.loadingProgress = 100;
                        this.progressService.finishLoading();
                    }
                });
            },
        };
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
    reloadDataTable() {
        this.dtElement.dtInstance.then((dtInstance) => {
            dtInstance.draw();
        });
    }
    formCreate() {
        this.showForm = true;
        this.titleForm = 'Tambah Product';
        this.productId = '';
    }
    formUpdate(product) {
        this.showForm = true;
        this.titleForm = 'Edit Product: ' + product.name;
        this.productId = product.id;
    }
    deleteProduct(productId) {
        Swal.fire({
            title: 'Apakah kamu yakin ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#34c38f',
            cancelButtonColor: '#f46a6a',
            confirmButtonText: 'Ya, Hapus data ini !',
        }).then((result) => {
            if (!result.value)
                return false;
            this.productService.deleteProduct(productId).subscribe(() => {
                this.reloadDataTable();
            });
        });
    }
    onAfterSave(success) {
        if (success) {
            this.getProducts();
        }
        this.showForm = false;
    }
};
__decorate([
    ViewChild(DataTableDirective)
], ListProductComponent.prototype, "dtElement", void 0);
ListProductComponent = __decorate([
    Component({
        selector: 'app-list-product',
        templateUrl: './list-product.component.html',
        styleUrls: ['./list-product.component.scss']
    })
], ListProductComponent);
export { ListProductComponent };
//# sourceMappingURL=list-product.component.js.map