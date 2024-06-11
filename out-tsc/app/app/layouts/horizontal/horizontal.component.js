import { __decorate } from "tslib";
import { Component } from '@angular/core';
let HorizontalComponent = class HorizontalComponent {
    constructor() { }
    ngOnInit() {
        document.body.setAttribute('data-layout', 'horizontal');
        document.body.setAttribute('data-topbar', 'dark');
        document.body.removeAttribute('data-sidebar');
        document.body.removeAttribute('data-layout-size');
        document.body.removeAttribute('data-keep-enlarged');
        document.body.removeAttribute('data-sidebar-small');
    }
    ngAfterViewInit() {
    }
    /**
     * on settings button clicked from topbar
     */
    onSettingsButtonClicked() {
        document.body.classList.toggle('right-bar-enabled');
    }
};
HorizontalComponent = __decorate([
    Component({
        selector: 'app-horizontal',
        templateUrl: './horizontal.component.html',
    })
    /**
     * Horizontal-layout component
     */
], HorizontalComponent);
export { HorizontalComponent };
//# sourceMappingURL=horizontal.component.js.map