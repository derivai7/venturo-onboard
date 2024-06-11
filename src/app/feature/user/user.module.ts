import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormUserComponent} from './components/form-user/form-user.component';
import {ListUserComponent} from './components/list-user/list-user.component';
import {FormsModule} from "@angular/forms";
import {NgProgressModule} from "ngx-progressbar";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {DataTablesModule} from "angular-datatables";
import {SharedModule} from "../../shared/shared.module";
import {FormProfileComponent} from './components/form-profile/form-profile.component';
import {CoreModule} from "../../core/core.module";


@NgModule({
    declarations: [
        FormUserComponent,
        ListUserComponent,
        FormProfileComponent
    ],
    exports: [
        FormProfileComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        DataTablesModule,
        SharedModule,
        NgProgressModule,
        NgbModule,
        CoreModule,
    ]
})
export class UserModule {
}
