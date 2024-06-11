import { __decorate } from "tslib";
import { Component } from '@angular/core';
let FooterComponent = class FooterComponent {
    constructor() {
        // set the currenr year
        this.year = new Date().getFullYear();
    }
    ngOnInit() {
    }
};
FooterComponent = __decorate([
    Component({
        selector: 'app-footer',
        templateUrl: './footer.component.html',
    })
    /**
     * Footer component
     */
], FooterComponent);
export { FooterComponent };
//# sourceMappingURL=footer.component.js.map