import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TestDirectiveComponent} from "./test/components/test-directive/test-directive.component";
import {ListUserComponent} from "./user/components/list-user/list-user.component";
import {ListCustomerComponent} from "./customer/components/list-customer/list-customer.component";
import {ListProductComponent} from "./product/product/component/list-product/list-product.component";
import {ListCategoryComponent} from "./product/category/component/list-category/list-category.component";
import {ListPromoComponent} from "./promo/component/list-promo/list-promo.component";
import {ListVoucherComponent} from "./promo/voucher/components/list-voucher/list-voucher.component";
import {ListDiscountComponent} from "./promo/discount/components/list-discount/list-discount.component";
import {ListSaleComponent} from "./sale/components/list-sale/list-sale.component";
import {SalePromoComponent} from "./report/components/sale-promo/sale-promo.component";
import {SaleTransactionComponent} from "./report/components/sale-transaction/sale-transaction.component";
import {SaleMenuComponent} from "./report/components/sale-menu/sale-menu.component";
import {SaleCustomerComponent} from "./report/components/sale-customer/sale-customer.component";

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: DashboardComponent},
    {path: 'test', component: TestDirectiveComponent},
    {path: 'user', component: ListUserComponent},
    {path: 'customer', component: ListCustomerComponent},
    {path: 'category', component: ListCategoryComponent},
    {path: 'product', component: ListProductComponent},
    {path: 'promo', component: ListPromoComponent},
    {path: 'voucher', component: ListVoucherComponent},
    {path: 'discount', component: ListDiscountComponent},
    {path: 'sale', component: ListSaleComponent},
    {path: 'report/sale-promo', component: SalePromoComponent},
    {path: 'report/sale-transaction', component: SaleTransactionComponent},
    {path: 'report/sale-menu', component: SaleMenuComponent},
    {path: 'report/sale-customer', component: SaleCustomerComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FeatureRoutingModule {
}
