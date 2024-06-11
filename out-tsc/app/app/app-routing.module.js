import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layouts/layout.component';
const routes = [
    { path: 'auth', loadChildren: () => import('./feature/auth/auth.module').then(m => m.AuthModule) },
    {
        path: '',
        component: LayoutComponent,
        loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule)
    },
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map