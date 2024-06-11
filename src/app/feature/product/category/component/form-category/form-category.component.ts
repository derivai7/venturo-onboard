import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { LandaService } from 'src/app/core/services/landa.service';
import { CategoryService } from '../../services/category.service';
@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.scss']
})
export class FormCategoryComponent implements OnInit {
  readonly MODE_CREATE = 'add';
  readonly MODE_UPDATE = 'update';

  @Input() categoryId: string;
  @Output() afterSave = new EventEmitter<boolean>();

  activeMode: string;
  isDisabledForm: boolean = false;
  isLoading: boolean = false;

  formModel: {
    id: string,
    name: string,
  }
  constructor(
      private categoryService: CategoryService,
      private landaService: LandaService
  ) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm() {
    this.formModel = {
      id: '',
      name: '',
    }
    if (this.categoryId != '') {
      this.activeMode = this.MODE_UPDATE;
      this.getCategory(this.categoryId);
      return true;
    }
    this.activeMode = this.MODE_CREATE;
  }

  getCategory(categoryId) {
    this.categoryService.getCategoryById(categoryId).subscribe((res: any) => {
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

    this.categoryService.createCategory(this.formModel).subscribe((res: any) => {
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

    this.categoryService.updateCategory(this.formModel).subscribe((res: any) => {
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
}
