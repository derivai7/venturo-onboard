import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let ProgressServiceService = class ProgressServiceService {
    constructor(ngProgress) {
        this.progressRef = ngProgress.ref();
    }
    startLoading() {
        this.progressRef.start();
    }
    finishLoading() {
        this.progressRef.complete();
    }
};
ProgressServiceService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ProgressServiceService);
export { ProgressServiceService };
//# sourceMappingURL=progress-service.service.js.map