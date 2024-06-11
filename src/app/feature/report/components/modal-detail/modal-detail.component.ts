import {Component, Input, OnInit} from '@angular/core';
import {ReportService} from "../../services/report.service";

@Component({
    selector: 'app-modal-detail',
    templateUrl: './modal-detail.component.html',
    styleUrls: ['./modal-detail.component.scss']
})
export class ModalDetailComponent implements OnInit {
    @Input() customerId: string;
    @Input() date: string;

    detailSale: {
        date: string,
        customer_name: string,
        transactions: [{
            no_receipt: string,
            subtotal: number,
            tax: number,
            voucher: number,
            discount: number,
            total_payment: number,
        }],
        transactions_total: number
    };

    loadingProgress: number;

    constructor(
        private reportService: ReportService
    ) {
    }

    ngOnInit() {
        this.detailSale = {
            date: '',
            customer_name: '',
            transactions: [{
                no_receipt: '',
                subtotal: 0,
                tax: 0,
                voucher: 0,
                discount: 0,
                total_payment: 0,
            }],
            transactions_total: 0
        };

        this.getSaleDetail();
    }

    getSaleDetail() {
        this.loadingProgress = 0;

        this.reportService.getSaleDetail(this.customerId, this.date).subscribe({
            next: (res: any) => {
                this.detailSale = res.data;
                this.loadingProgress = 100;
            },
            error: (err: any) => {
                console.error(err);
            }
        });
    }
}
