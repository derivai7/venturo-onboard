import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CustomerService} from "../../services/customer.service";
import {LandaService} from "../../../../core/services/landa.service";

@Component({
  selector: 'app-form-customer',
  templateUrl: './form-customer.component.html',
  styleUrls: ['./form-customer.component.scss']
})

export class FormCustomerComponent {
  @Input() customerId: string;
  @Input() titleForm: String;
  @Input() isModal: boolean;
  @Output() afterSave = new EventEmitter<boolean>

  readonly MODE_CREATE = 'add';
  readonly MODE_UPDATE = 'update';

  formModel: {
    id: string,
    name: string,
    email: string,
    date_of_birth: string,
    phone_number: string,
    is_verified: string,
    photo: string,
    photo_url: string,
  }

  activeMode: string;

  isDisabledForm: boolean = false;
  isLoading:boolean = false;
  loadingProgress: number = 0;

  constructor(
      private customerService: CustomerService,
      private landaService: LandaService,
  ) {
  }

  ngOnInit() {
    this.resetForm();
  }

  getCustomer(userId) {
    this.customerService.getCustomerById(userId).subscribe({
      next: (res: any) => {
        this.loadingProgress = 100;

        this.formModel = res.data;
        console.log(this.formModel);
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
      date_of_birth: '',
      phone_number: '',
      is_verified: '',
      photo: '',
      photo_url: '',
    }

    if (this.customerId != '') {
      this.activeMode = this.MODE_UPDATE;
      this.getCustomer(this.customerId);
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

  back() {
    this.afterSave.emit(false);
  }

  insert() {
    this.isDisabledForm = true;
    this.isLoading = true;

    this.customerService.createCustomer(this.formModel).subscribe({
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

  update() {
    this.isDisabledForm = true;
    this.isLoading = true;

    this.customerService.updateCustomer(this.formModel).subscribe({
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
