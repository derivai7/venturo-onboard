import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let SaleService = class SaleService {
    constructor(landaService) {
        this.landaService = landaService;
    }
    getSale(arrParameter = {}) {
        return this.landaService.DataGet('/v1/sale', arrParameter);
    }
    createSale(payload) {
        return this.landaService.DataPost('/v1/sale', payload);
    }
};
SaleService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], SaleService);
export { SaleService };
//# sourceMappingURL=sale.service.js.map