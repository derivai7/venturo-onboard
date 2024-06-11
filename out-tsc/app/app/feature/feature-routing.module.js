import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TestDirectiveComponent } from "./test/components/test-directive/test-directive.component";
import { ListUserComponent } from "./user/components/list-user/list-user.component";
import { ListCustomerComponent } from "./customer/components/list-customer/list-customer.component";
import { ListProductComponent } from "./product/product/component/list-product/list-product.component";
import { ListCategoryComponent } from "./product/category/component/list-category/list-category.component";
import { ListPromoComponent } from "./promo/component/list-promo/list-promo.component";
import { ListVoucherComponent } from "./promo/voucher/components/list-voucher/list-voucher.component";
import { ListDiscountComponent } from "./promo/discount/components/list-discount/list-discount.component";
import { ListSaleComponent } from "./sale/components/list-sale/list-sale.component";
const routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: DashboardComponent },
    { path: 'test', component: TestDirectiveComponent },
    { path: 'user', component: ListUserComponent },
    { path: 'customer', component: ListCustomerComponent },
    { path: 'category', component: ListCategoryComponent },
    { path: 'product', component: ListProductComponent },
    { path: 'promo', component: ListPromoComponent },
    { path: 'voucher', component: ListVoucherComponent },
    { path: 'discount', component: ListDiscountComponent },
    { path: 'sale', component: ListSaleComponent },
];
let FeatureRoutingModule = class FeatureRoutingModule {
};
FeatureRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], FeatureRoutingModule);
export { FeatureRoutingModule };
//# sourceMappingURL=feature-routing.module.js.map