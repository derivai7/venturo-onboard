import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { PageTitleComponent } from './page-title/page-title.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { DaterangepickerComponent } from './daterangepicker/daterangepicker.component';
import { Daterangepicker } from 'ng2-daterangepicker';
import { FormsModule } from '@angular/forms';
import { UploadImageComponent } from "./upload-image/upload-image.component";
import { HammerModule } from "@angular/platform-browser";
let SharedModule = class SharedModule {
};
SharedModule = __decorate([
    NgModule({
        declarations: [PageTitleComponent, DaterangepickerComponent, UploadImageComponent],
        imports: [
            CommonModule,
            FormsModule,
            ImageCropperModule,
            Daterangepicker,
            NgOptimizedImage,
            HammerModule
        ],
        exports: [
            PageTitleComponent,
            DaterangepickerComponent,
            UploadImageComponent
        ]
    })
], SharedModule);
export { SharedModule };
//# sourceMappingURL=shared.module.js.map