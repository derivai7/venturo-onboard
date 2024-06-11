import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../services/user.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

import Swal from "sweetalert2";
import {ProgressServiceService} from "../../../../core/services/progress-service.service";
import {DataTableDirective} from "angular-datatables";

@Component({
    selector: 'app-list-user',
    templateUrl: './list-user.component.html',
    styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
    listUser: Array<{
        id: string,
        no: string,
        name: string,
        email: string,
        phone_number: string
    }> = [];

    titleModal: string;
    userId: string;

    loadingProgress: number = 0;

    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;
    dtOptions: DataTables.Settings = {};

    filter: {
        name: ''
    };

    constructor(
        private userService: UserService,
        private modalService: NgbModal,
        private progressService: ProgressServiceService
    ) {
    }

    ngOnInit(): void {
        this.setDefault();
        this.getUser();
    }

    setDefault() {
        this.filter = {
            name: ''
        }
    }

    getUser() {
        this.dtOptions = {
            serverSide: true,
            ordering: false,
            pageLength: 3,
            ajax: (dtParams: any, callback) => {
                this.loadingProgress = 0;
                this.progressService.startLoading();

                const params = {
                    ...this.filter,
                    per_page: dtParams.length,
                    page: (dtParams.start / dtParams.length) + 1,
                };

                this.userService.getUsers(params).subscribe({
                    next: (res: any) => {
                        const {list, meta} = res.data;

                        let number = dtParams.start + 1;
                        list.forEach((val: any) => {
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
                    error: (err: any) => {
                        console.error(err);

                        this.loadingProgress = 100;
                        this.progressService.finishLoading();
                    }
                });
            },
        };
    }

    reloadDataTable(): void {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.draw();
        });
    }

    createUser(modalId: any) {
        this.titleModal = 'Tambah User';
        this.userId = '';
        this.modalService.open(modalId, {size: 'lg', backdrop: 'static'});
    }

    updateUser(modalId: any, user: any) {
        this.titleModal = 'Edit User: ' + user.name;
        this.userId = user.id;
        this.modalService.open(modalId, {size: 'lg', backdrop: 'static'});
    }

    deleteUser(userId: string) {
        Swal.fire({
            title: 'Apakah kamu yakin ?',
            text: 'User ini tidak dapat login setelah kamu menghapus datanya',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#34c38f',
            cancelButtonColor: '#f46a6a',
            confirmButtonText: 'Ya, Hapus data ini !',
        }).then((result) => {
            if (!result.value) return false;

            this.userService.deleteUser(userId).subscribe(() => {
                this.reloadDataTable();
            });
        });
    }

    onAfterSave(success: boolean) {
        if (success) {
            this.reloadDataTable();
            this.getUser();
        }
    }
}
