import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DebounceKeyupDirective } from './directives/debounce-keyup.directive';
let CoreModule = class CoreModule {
};
CoreModule = __decorate([
    NgModule({
        declarations: [DebounceKeyupDirective],
        imports: [
            CommonModule
        ],
        exports: [
            DebounceKeyupDirective
        ]
    })
], CoreModule);
export { CoreModule };
//# sourceMappingURL=core.module.js.map