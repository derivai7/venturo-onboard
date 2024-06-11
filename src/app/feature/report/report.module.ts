import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {SalePromoComponent} from "./components/sale-promo/sale-promo.component";
import {CoreModule} from "../../core/core.module";
import {CurrencyPipe, DatePipe, DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {DataTablesModule} from "angular-datatables";
import {NgSelectModule} from "@ng-select/ng-select";
import {NgbButtonsModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {SaleTransactionComponent} from './components/sale-transaction/sale-transaction.component';
import {SaleMenuComponent} from './components/sale-menu/sale-menu.component';
import {SaleCustomerComponent} from './components/sale-customer/sale-customer.component';
import {ModalDetailComponent} from './components/modal-detail/modal-detail.component';


@NgModule({
    declarations: [
        SalePromoComponent,
        SaleTransactionComponent,
        SaleMenuComponent,
        SaleCustomerComponent,
        ModalDetailComponent,
    ],
    imports: [
        FormsModule,
        SharedModule,
        CoreModule,
        CurrencyPipe,
        DataTablesModule,
        DatePipe,
        DecimalPipe,
        NgForOf,
        NgIf,
        NgSelectModule,
        NgbTooltipModule,
        NgbButtonsModule,
    ]
})
export class ReportModule {
}
