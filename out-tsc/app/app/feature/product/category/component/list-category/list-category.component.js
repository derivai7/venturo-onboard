import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
let ListCategoryComponent = class ListCategoryComponent {
    constructor(categoryService, modalService, progressService) {
        this.categoryService = categoryService;
        this.modalService = modalService;
        this.progressService = progressService;
        this.listCategory = [];
        this.loadingProgress = 0;
    }
    ngOnInit() {
        this.getCategories();
    }
    getCategories() {
        this.dtOptions = {
            serverSide: true,
            pageLength: 3,
            ajax: (dtParams, callback) => {
                this.loadingProgress = 0;
                this.progressService.startLoading();
                const params = {
                    per_page: dtParams.length,
                    page: (dtParams.start / dtParams.length) + 1,
                };
                this.categoryService.getCategories(params).subscribe({
                    next: (res) => {
                        const { list, meta } = res.data;
                        let number = dtParams.start + 1;
                        list.forEach(val => {
                            val.no = number++;
                        });
                        this.listCategory = list;
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
    reloadDataTable() {
        this.dtElement.dtInstance.then((dtInstance) => {
            dtInstance.draw();
        });
    }
    createCategory(modalId) {
        this.titleModal = 'Tambah Category';
        this.categoryId = '';
        this.modalService.open(modalId, { size: 'lg', backdrop: 'static' });
    }
    updateCategory(modalId, category) {
        this.titleModal = 'Edit Category: ' + category.name;
        this.categoryId = category.id;
        this.modalService.open(modalId, { size: 'lg', backdrop: 'static' });
    }
    deleteCategory(categoryId) {
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
            this.categoryService.deleteCategory(categoryId).subscribe(() => {
                this.reloadDataTable();
            });
        });
    }
    onAfterSave(success) {
        if (success) {
            this.reloadDataTable();
        }
    }
    onDragged(item, list) {
        const index = list.indexOf(item);
        list.splice(index, 1);
        //variable yang menampung payload untuk mengupdate data index
        const final = {
            id: item.id,
            index: this.listCategory.findIndex(x => x.id === item.id),
            drag: true,
        };
        //mengirim data payload ke api
        this.categoryService.updateCategory(final).subscribe(() => {
        });
    }
    /**
     * On task drop event
     */
    onDrop(event, filteredList) {
        if (filteredList && event.dropEffect === 'move') {
            let index = event.index;
            if (typeof index === 'undefined') {
                index = filteredList.length;
            }
            filteredList.splice(index, 0, event.data);
        }
    }
};
__decorate([
    ViewChild(DataTableDirective)
], ListCategoryComponent.prototype, "dtElement", void 0);
ListCategoryComponent = __decorate([
    Component({
        selector: 'app-list-category',
        templateUrl: './list-category.component.html',
        styleUrls: ['./list-category.component.scss']
    })
], ListCategoryComponent);
export { ListCategoryComponent };
//# sourceMappingURL=list-category.component.js.map