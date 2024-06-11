import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { AuthRoutingModule } from './auth-routing';
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    NgModule({
        declarations: [LoginComponent],
        imports: [
            CommonModule,
            FormsModule,
            NgbAlertModule,
            AuthRoutingModule
        ]
    })
], AuthModule);
export { AuthModule };
//# sourceMappingURL=auth.module.js.map