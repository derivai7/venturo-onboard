import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FeatureRoutingModule } from './feature-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserModule } from "./user/user.module";
import { CustomerModule } from "./customer/customer.module";
import { ProductModule } from "./product/product.module";
import { PromoModule } from "./promo/promo.module";
import { AppComponent } from "../app.component";
import { SaleModule } from "./sale/sale.module";
const DEFAULT_PERFECT_SCROLLBAR_CONFIG = {
    suppressScrollX: true,
    wheelSpeed: 0.3
};
let FeatureModule = class FeatureModule {
};
FeatureModule = __decorate([
    NgModule({
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
], FeatureModule);
export { FeatureModule };
//# sourceMappingURL=feature.module.js.map