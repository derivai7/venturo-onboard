import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import Swal from "sweetalert2";
import { DataTableDirective } from "angular-datatables";
let ListUserComponent = class ListUserComponent {
    constructor(userService, modalService, progressService) {
        this.userService = userService;
        this.modalService = modalService;
        this.progressService = progressService;
        this.listUser = [];
        this.loadingProgress = 0;
        this.dtOptions = {};
    }
    ngOnInit() {
        this.setDefault();
        this.getUser();
    }
    setDefault() {
        this.filter = {
            name: ''
        };
    }
    getUser() {
        this.dtOptions = {
            serverSide: true,
            ordering: false,
            pageLength: 3,
            ajax: (dtParams, callback) => {
                this.loadingProgress = 0;
                this.progressService.startLoading();
                const params = {
                    ...this.filter,
                    per_page: dtParams.length,
                    page: (dtParams.start / dtParams.length) + 1,
                };
                this.userService.getUsers(params).subscribe({
                    next: (res) => {
                        const { list, meta } = res.data;
                        let number = dtParams.start + 1;
                        list.forEach(val => {
                            val.no = number++;
                        });
                        this.listUser = list;
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
    createUser(modalId) {
        this.titleModal = 'Tambah User';
        this.userId = '';
        this.modalService.open(modalId, { size: 'lg', backdrop: 'static' });
    }
    updateUser(modalId, user) {
        this.titleModal = 'Edit User: ' + user.name;
        this.userId = user.id;
        this.modalService.open(modalId, { size: 'lg', backdrop: 'static' });
    }
    deleteUser(userId) {
        Swal.fire({
            title: 'Apakah kamu yakin ?',
            text: 'User ini tidak dapat login setelah kamu menghapus datanya',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#34c38f',
            cancelButtonColor: '#f46a6a',
            confirmButtonText: 'Ya, Hapus data ini !',
        }).then((result) => {
            if (!result.value)
                return false;
            this.userService.deleteUser(userId).subscribe(() => {
                this.reloadDataTable();
            });
        });
    }
    onAfterSave(success) {
        if (success) {
            this.reloadDataTable();
            this.getUser();
        }
    }
};
__decorate([
    ViewChild(DataTableDirective)
], ListUserComponent.prototype, "dtElement", void 0);
ListUserComponent = __decorate([
    Component({
        selector: 'app-list-user',
        templateUrl: './list-user.component.html',
        styleUrls: ['./list-user.component.scss']
    })
], ListUserComponent);
export { ListUserComponent };
//# sourceMappingURL=list-user.component.js.map