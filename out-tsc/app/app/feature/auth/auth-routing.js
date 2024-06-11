import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
const routes = [
    {
        path: 'login',
        component: LoginComponent
    }
];
let AuthRoutingModule = class AuthRoutingModule {
};
AuthRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], AuthRoutingModule);
export { AuthRoutingModule };
//# sourceMappingURL=auth-routing.js.map