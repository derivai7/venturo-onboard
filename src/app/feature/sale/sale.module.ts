import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListSaleComponent} from './components/list-sale/list-sale.component';
import {FormSaleComponent} from './components/form-sale/form-sale.component';
import {CoreModule} from "../../core/core.module";
import {DataTablesModule} from "angular-datatables";
import {FormsModule} from "@angular/forms";
import {NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {CustomerModule} from "../customer/customer.module";
import {ProductModule} from "../product/product.module";
import {NgSelectModule} from "@ng-select/ng-select";
import {DndModule} from "ngx-drag-drop";
import {CdkDrag, CdkDropList} from "@angular/cdk/drag-drop";

@NgModule({
    declarations: [
        ListSaleComponent,
        FormSaleComponent
    ],
    imports: [
        CommonModule,
        CoreModule,
        DataTablesModule,
        FormsModule,
        NgbTooltipModule,
        CustomerModule,
        ProductModule,
        NgSelectModule,
        DndModule,
        CdkDropList,
        CdkDrag
    ]
})
export class SaleModule {
}
