import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FormPromoComponent} from './component/form-promo/form-promo.component';
import {ListPromoComponent} from './component/list-promo/list-promo.component';
import {CoreModule} from "../../core/core.module";
import {DataTablesModule} from "angular-datatables";
import {FormsModule} from "@angular/forms";
import {NgProgressModule} from "ngx-progressbar";
import {NgbButtonsModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {SharedModule} from "../../shared/shared.module";
import { ListVoucherComponent } from './voucher/components/list-voucher/list-voucher.component';
import { FormVoucherComponent } from './voucher/components/form-voucher/form-voucher.component';
import {CustomerModule} from "../customer/customer.module";
import {NgSelectModule} from "@ng-select/ng-select";
import { ListDiscountComponent } from './discount/components/list-discount/list-discount.component';

@NgModule({
    declarations: [
        FormPromoComponent,
        ListPromoComponent,
        ListVoucherComponent,
        FormVoucherComponent,
        ListDiscountComponent
    ],
    imports: [
        CommonModule,
        NgSelectModule,
        FormsModule,
        CoreModule,
        DataTablesModule,
        NgProgressModule,
        NgbTooltipModule,
        NgOptimizedImage,
        CKEditorModule,
        NgbButtonsModule,
        SharedModule,
        CustomerModule,
    ],
})
export class PromoModule {
}
