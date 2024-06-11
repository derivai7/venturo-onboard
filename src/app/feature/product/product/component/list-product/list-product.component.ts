import {Component, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from 'angular-datatables';
import Swal from 'sweetalert2';
import {CategoryService} from '../../../category/services/category.service';
import {ProductService} from '../../services/product.service';
import {ProgressServiceService} from "../../../../../core/services/progress-service.service";

@Component({
    selector: 'app-list-product',
    templateUrl: './list-product.component.html',
    styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {
    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;
    dtOptions: any;

    listProduct: Array<{
        id: string,
        no: string,
        name: string,
        product_category_id: string,
        product_category_name: string,
        price: string,
        description: string,
        photo: string,
        photo_url: string,
        is_available: string,
        details: any,
        details_deleted: any
    }> = [];

    categories: Array<{
        id: string,
        name: string
    }> = [];

    isLoadingCategories: boolean;
    loadingProgress: number = 0;

    titleForm: string;
    productId: string;
    showForm: boolean;

    filter: {
        name: '',
        product_category_id: '',
        is_available: ''
    };

    constructor(
        private productService: ProductService,
        private categoryService: CategoryService,
        private progressService: ProgressServiceService,
    ) {
    }

    ngOnInit(): void {
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
        }
    }

    getProducts() {
        this.dtOptions = {
            serverSide: true,
            pageLength: 3,
            ajax: (dtParams: any, callback) => {
                this.loadingProgress = 0;
                this.progressService.startLoading();

                const params = {
                    ...this.filter,
                    per_page: dtParams.length,
                    page: (dtParams.start / dtParams.length) + 1,
                };

                this.productService.getProducts(params).subscribe({
                    next: (res: any) => {
                        const {list, meta} = res.data;

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
                    error: (err: any) => {
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

    reloadDataTable(): void {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
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
            if (!result.value) return false;

            this.productService.deleteProduct(productId).subscribe(() => {
                this.reloadDataTable();
            });
        });
    }

    onAfterSave(success: boolean) {
        if (success) {
            this.getProducts();
        }
        this.showForm = false;
    }
}
