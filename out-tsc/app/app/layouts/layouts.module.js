import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ClickOutsideModule } from 'ng-click-outside';
import { LayoutComponent } from './layout.component';
import { FooterComponent } from './footer/footer.component';
import { HorizontalComponent } from './horizontal/horizontal.component';
import { HorizontaltopbarComponent } from './horizontaltopbar/horizontaltopbar.component';
import { NgProgressModule } from "ngx-progressbar";
import { UserModule } from "../feature/user/user.module";
let LayoutsModule = class LayoutsModule {
};
LayoutsModule = __decorate([
    NgModule({
        declarations: [LayoutComponent, FooterComponent, HorizontalComponent, HorizontaltopbarComponent],
        imports: [
            CommonModule,
            RouterModule,
            NgbDropdownModule,
            ClickOutsideModule,
            PerfectScrollbarModule,
            NgProgressModule,
            UserModule,
        ],
        exports: []
    })
], LayoutsModule);
export { LayoutsModule };
//# sourceMappingURL=layouts.module.js.map