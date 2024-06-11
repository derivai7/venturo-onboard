import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
let LoaderService = class LoaderService {
    constructor() {
        this.isLoading = new Subject();
    }
    show() {
        this.isLoading.next(true);
    }
    hide() {
        this.isLoading.next(false);
    }
};
LoaderService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], LoaderService);
export { LoaderService };
//# sourceMappingURL=loader.service.js.map