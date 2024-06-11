import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DataTablesModule} from 'angular-datatables';
import {NgSelectModule} from '@ng-select/ng-select';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {CoreModule} from 'src/app/core/core.module';
import {SharedModule} from 'src/app/shared/shared.module';
import {DndModule} from 'ngx-drag-drop';
import {ListCategoryComponent} from './category/component/list-category/list-category.component';
import {FormCategoryComponent} from './category/component/form-category/form-category.component';
import {FormProductComponent} from './product/component/form-product/form-product.component';
import {ListProductComponent} from './product/component/list-product/list-product.component';
import {NgProgressModule} from "ngx-progressbar";

@NgModule({
    declarations: [
        ListCategoryComponent,
        FormCategoryComponent,
        FormProductComponent,
        ListProductComponent
    ],
    exports: [
        FormProductComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        DataTablesModule,
        NgSelectModule,
        SharedModule,
        CoreModule,
        CKEditorModule,
        DndModule,
        NgProgressModule,
        NgOptimizedImage,
    ]
})
export class ProductModule {
}
