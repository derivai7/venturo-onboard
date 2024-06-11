import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbAlertModule, NgbButtonsModule} from '@ng-bootstrap/ng-bootstrap';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {NgChartsModule} from "ng2-charts";

import {FeatureRoutingModule} from './feature-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {UserModule} from "./user/user.module";
import {CustomerModule} from "./customer/customer.module";
import {ProductModule} from "./product/product.module";
import {PromoModule} from "./promo/promo.module";
import {AppComponent} from "../app.component";
import {SaleModule} from "./sale/sale.module";
import {ReportModule} from "./report/report.module";
import {SharedModule} from "../shared/shared.module";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    wheelSpeed: 0.3
};

@NgModule({
    declarations: [DashboardComponent],
    imports: [
        ReactiveFormsModule,
        NgbAlertModule,
        CommonModule,
        FeatureRoutingModule,
        PerfectScrollbarModule,
        UserModule,
        CustomerModule,
        ProductModule,
        PromoModule,
        SaleModule,
        ReportModule,
        NgChartsModule,
        NgbButtonsModule,
        FormsModule,
        SharedModule
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ]
})
export class FeatureModule {
}
