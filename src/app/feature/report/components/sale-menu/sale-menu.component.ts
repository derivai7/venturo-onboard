import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../product/category/services/category.service";
import {ReportService} from "../../services/report.service";
import {LandaService} from "../../../../core/services/landa.service";
import Swal from "sweetalert2";

@Component({
    selector: 'app-sale-menu',
    templateUrl: './sale-menu.component.html',
    styleUrls: ['./sale-menu.component.scss']
})
export class SaleMenuComponent implements OnInit {
    filter: {
        start_date: string,
        end_date: string,
        category_id: string
    }
    sale: [{
        category_name: string,
        category_total: string,
        products: [{
            product_name: string,
            transactions: [{
                total_sale: number
            }],
            transactions_total: string
        }],
    }];
    meta: {
        dates: any[],
        total_per_date: any[],
        grand_total: number
    };
    loadingProgress: number;
    loadingCustomer: boolean;
    isFilterCategory: boolean;
    categories: [{
        id: string,
        name: string
    }];

    constructor(
        private saleService: ReportService,
        private categoryService: CategoryService,
        private landaService: LandaService
    ) {
    }

    ngOnInit(): void {
        this.resetFilter();
        this.getCategories();
    }

    getCategories(name: string = '') {
        this.loadingCustomer = true;
        this.categoryService.getCategories({name: name}).subscribe({
            next: (res: any) => {
                this.categories = res.data.list;
                this.loadingCustomer = false;
            },
            error: (err: any) => {
                console.error(err);
            }
        });
    }

    resetFilter() {
        this.filter = {
            start_date: null,
            end_date: null,
            category_id: null
        }

        this.meta = {
            dates: [],
            total_per_date: [],
            grand_total: 0
        }

        this.loadingCustomer = false;
    }

    loadSale() {
        this.runFilterValidation();

        this.loadingProgress = 0;
        this.isFilterCategory = false;
        this.saleService.getSaleMenu(this.filter).subscribe((res: any) => {
            const {data, settings} = res;
            this.sale = data;
            this.meta = settings;

            this.loadingProgress = 100;
            if (this.filter?.category_id) {
                this.isFilterCategory = true;
            }
        });
    }

    runFilterValidation() {
        if (!this.filter.start_date || !this.filter.end_date) {
            Swal.fire({
                title: 'Terjadi Kesalahan',
                text: 'Silahkan isi periode penjualan terlebih dahulu',
                icon: 'warning',
                showCancelButton: false
            });
            throw new Error("Start and End date is required");
        }
    }

    setFilterPeriod($event: any) {
        this.filter.start_date = $event.startDate;
        this.filter.end_date = $event.endDate;
    }

    downloadExcel() {
        this.runFilterValidation();
        let queryParams = {
            start_date: this.filter.start_date,
            end_date: this.filter.end_date,
            category_id: this.filter.category_id,
            is_export_excel: true
        }
        this.landaService.DownloadLink('/v1/download/sale-category', queryParams)
    }
}
