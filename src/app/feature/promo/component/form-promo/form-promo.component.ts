import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PromoService} from "../../services/promo.service";
import {LandaService} from "../../../../core/services/landa.service";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-form-promo',
  templateUrl: './form-promo.component.html',
  styleUrls: ['./form-promo.component.scss']
})
export class FormPromoComponent {
  readonly MODE_CREATE = 'add';
  readonly MODE_UPDATE = 'update';

  @Input() promoId: string;
  @Output() afterSave = new EventEmitter<boolean>();

  formModel: {
    id: string,
    name: string,
    status: string,
    expired_in_day: string,
    nominal_percentage: string,
    nominal_rupiah: string,
    term_conditions: string,
    photo: string,
    photo_url: string,
  };

  configEditor = ClassicEditor;
  activeMode: string;

  isDisabledForm: boolean = false;
  loadingProgress: number = 0;

  constructor(
      private promoService: PromoService,
      private landaService: LandaService,
  ) {
  }

  ngOnInit(): void {
    this.resetForm();
  }

  getCroppedImage($event) {
    this.formModel.photo = $event;
  }

  resetForm() {
    this.formModel = {
      id: '',
      name: '',
      status: 'voucher',
      expired_in_day: '',
      nominal_percentage: '',
      nominal_rupiah: '',
      term_conditions: '',
      photo: '',
      photo_url: '',
    }

    if (this.promoId != '') {
      this.activeMode = this.MODE_UPDATE;
      this.getProduct(this.promoId);
      return true;
    }

    this.activeMode = this.MODE_CREATE;
  }

  getProduct(productId) {
    this.promoService.getPromoById(productId).subscribe({
      next: (res: any) => {
        this.loadingProgress = 100;

        this.formModel = res.data;
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

    this.promoService.createPromo(this.formModel).subscribe({
      next: (res: any) => {
        this.landaService.alertSuccess('Berhasil', res.message);
        this.afterSave.emit(true);

        this.isDisabledForm = false;
      },
      error: (err) => {
        this.landaService.alertError('Mohon Maaf', err.error.errors);

        this.isDisabledForm = false;
      }
    });
  }

  update() {
    this.isDisabledForm = true;

    this.promoService.updatePromo(this.formModel).subscribe({
      next: (res: any) => {
        this.landaService.alertSuccess('Berhasil', res.message);
        this.afterSave.emit(true);
        this.isDisabledForm = false;
      },
      error: (err) => {
        this.landaService.alertError('Mohon Maaf', err.error.errors);

        this.isDisabledForm = false;
      }
    });
  }
}
