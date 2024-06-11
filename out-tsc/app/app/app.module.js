import { __decorate } from "tslib";
import { AsyncPipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpConfigInterceptor } from './core/interceptors/http-config.interceptor';
import { LayoutsModule } from './layouts/layouts.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter, CustomDateParserFormatter } from './core/adapter/datepicker-adapter';
let AppModule = class AppModule {
    constructor(authService) {
        this.authService = authService;
        this.authService.saveCsrf();
        if (this.authService.getToken() !== '') {
            this.authService.saveUserLogin();
        }
    }
};
AppModule = __decorate([
    NgModule({
        declarations: [
            AppComponent,
        ],
        imports: [
            BrowserModule,
            BrowserAnimationsModule,
            LayoutsModule,
            AppRoutingModule,
            HttpClientModule,
        ],
        providers: [
            AsyncPipe,
            {
                provide: HTTP_INTERCEPTORS,
                useClass: HttpConfigInterceptor,
                multi: true,
            },
            { provide: NgbDateAdapter, useClass: CustomAdapter },
            { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
        ],
        bootstrap: [AppComponent],
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map