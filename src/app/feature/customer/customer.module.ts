import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CustomerRoutingModule} from './customer-routing.module';
import {FormCustomerComponent} from './components/form-customer/form-customer.component';
import {ListCustomerComponent} from './components/list-customer/list-customer.component';
import {DataTablesModule} from "angular-datatables";
import {NgProgressModule} from "ngx-progressbar";
import {NgbModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {UiSwitchModule} from "ngx-ui-switch";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
    declarations: [
        FormCustomerComponent,
        ListCustomerComponent
    ],
    exports: [
        FormCustomerComponent
    ],
    imports: [
        CommonModule,
        CustomerRoutingModule,
        DataTablesModule,
        NgProgressModule,
        NgbTooltipModule,
        UiSwitchModule,
        NgbModule,
        SharedModule
    ]
})
export class CustomerModule {
}
