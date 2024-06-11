import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {LandaService} from 'src/app/core/services/landa.service';
import {CategoryService} from '../../../category/services/category.service';
import {ProductService} from '../../services/product.service';

@Component({
    selector: 'app-form-product',
    templateUrl: './form-product.component.html',
    styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {
    readonly DEFAULT_STATUS = '1';
    readonly DEFAULT_TYPE = 'Toping';
    readonly MODE_CREATE = 'add';
    readonly MODE_UPDATE = 'update';

    @Input() productId: string;
    @Output() afterSave = new EventEmitter<boolean>();

    formModel: {
        id: string,
        name: string,
        product_category_id: string,
        price: string,
        description: string,
        photo: string,
        photo_url: string,
        is_available: string,
        details: any,
        details_deleted: any
    }

    categories: Array<{
        id: string,
        name: string
    }> = [];

    configEditor = ClassicEditor;
    activeMode: string;

    isLoadingCategories: boolean;
    isDisabledForm: boolean = false;
    isLoading:boolean = false;
    loadingProgress: number = 0;

    isMobile = window.innerWidth < 768;

    constructor(
        private productService: ProductService,
        private categoryService: CategoryService,
        private landaService: LandaService,
    ) {
    }

    ngOnInit(): void {
        this.resetForm();
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.isMobile = window.innerWidth < 768;
    }

    getCategories(name = '') {
        this.isLoadingCategories = true;

        this.categoryService.getCategories({name: name}).subscribe({
            next: (res: any) => {
                this.categories = res.data.list;
                this.isLoadingCategories = false;
            },
            error: (err: any) => {
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
        }

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
            next: (res: any) => {
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

        console.log(this.formModel);
        this.productService.updateProduct(this.formModel).subscribe({
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

    addDetail() {
        let val = {
            is_added: true,
            description: '',
            type: this.DEFAULT_TYPE,
            price: 0,
        }

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
}
