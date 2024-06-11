import { __decorate } from "tslib";
import { Component } from '@angular/core';
let LayoutComponent = class LayoutComponent {
    constructor(eventService) {
        this.eventService = eventService;
    }
    ngOnInit() {
        this.layoutType = 'horizontal';
        this.eventService.subscribe('changeLayout', (layout) => {
            this.layoutType = layout;
        });
    }
    ngAfterViewInit() {
    }
};
LayoutComponent = __decorate([
    Component({
        selector: 'app-layout',
        templateUrl: './layout.component.html',
    })
], LayoutComponent);
export { LayoutComponent };
//# sourceMappingURL=layout.component.js.map