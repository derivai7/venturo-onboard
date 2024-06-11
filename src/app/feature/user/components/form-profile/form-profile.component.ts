import {Component, EventEmitter, Output} from '@angular/core';
import {UserService} from "../../services/user.service";
import {LandaService} from "../../../../core/services/landa.service";

@Component({
    selector: 'app-form-profile',
    templateUrl: './form-profile.component.html',
    styleUrls: ['./form-profile.component.scss']
})
export class FormProfileComponent {
    @Output() afterSave = new EventEmitter<boolean>

    formModel: {
        id: string,
        name: string,
        email: string,
        password: string,
        phone_number: string,
        user_roles_id: string,
        user_roles_name: string,
        photo: string,
        photo_url: string,
    }

    isDisabledForm: boolean = false;
    isLoading: boolean = false;

    constructor(
        private userService: UserService,
        private landaService: LandaService,
    ) {
    }

    ngOnInit() {
        this.resetForm();
    }

    getUserProfile(userId) {
        this.userService.getUserById(userId).subscribe({
            next: (res: any) => {
                this.formModel = res.data;
                this.getRoleUser(this.formModel.user_roles_id);
                console.log(this.formModel)
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    getRoleUser(roleId) {
        this.userService.getRolesById(roleId).subscribe({
            next: (res: any) => {
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
        }

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
            next: (res: any) => {
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
}
