import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let PageTitleComponent = class PageTitleComponent {
    constructor() { }
    ngOnInit() {
    }
};
__decorate([
    Input()
], PageTitleComponent.prototype, "breadcrumbItems", void 0);
__decorate([
    Input()
], PageTitleComponent.prototype, "title", void 0);
PageTitleComponent = __decorate([
    Component({
        selector: 'app-page-title',
        templateUrl: './page-title.component.html',
        styleUrls: ['./page-title.component.scss']
    })
], PageTitleComponent);
export { PageTitleComponent };
//# sourceMappingURL=page-title.component.js.map