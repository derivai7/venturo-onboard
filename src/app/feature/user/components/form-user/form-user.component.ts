import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from "../../services/user.service";
import {LandaService} from "../../../../core/services/landa.service";

@Component({
    selector: 'app-form-user',
    templateUrl: './form-user.component.html',
    styleUrls: ['./form-user.component.scss']
})

export class FormUserComponent implements OnInit{
    @Input() userId: string;
    @Output() afterSave = new EventEmitter<boolean>

    readonly MODE_CREATE = 'add';
    readonly MODE_UPDATE = 'update';

    roles: Array<{
        id: string,
        name: string,
    }> = [];

    formModel: {
        id: string,
        name: string,
        email: string,
        password: string,
        phone_number: string,
        user_roles_id: string,
        photo: string,
        photo_url: string,
    }

    activeMode: string;

    isDisabledForm: boolean = false;
    isLoading:boolean = false;

    constructor(
        private userService: UserService,
        private landaService: LandaService,
    ) {
    }

    ngOnInit() {
        this.getRoles();
        this.resetForm();
    }

    getUser(userId: string) {
        this.userService.getUserById(userId).subscribe((res: any) => {
            this.formModel = res.data;
        }, err => {
            console.log(err);
        });
    }

    getRoles() {
        this.userService.getRoles().subscribe((res: any) => {
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
        }

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

        this.userService.createUser(this.formModel).subscribe((res: any) => {
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

        this.userService.updateUser(this.formModel).subscribe((res: any) => {
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

    getCroppedImage($event: any) {
        this.formModel.photo = $event;
    }
}
