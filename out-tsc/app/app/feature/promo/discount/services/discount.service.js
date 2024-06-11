import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let DiscountService = class DiscountService {
    constructor(landaService) {
        this.landaService = landaService;
    }
    getDiscount(arrParameter = {}) {
        return this.landaService.DataGet('/v1/discounts', arrParameter);
    }
    getDiscountById(id) {
        return this.landaService.DataGet('/v1/discounts/' + id);
    }
    createDiscount(payload) {
        return this.landaService.DataPost('/v1/discounts', payload);
    }
    updateDiscount(payload) {
        return this.landaService.DataPut('/v1/discounts', payload);
    }
    deleteDiscount(id) {
        return this.landaService.DataDelete('/v1/discounts/' + id);
    }
};
DiscountService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], DiscountService);
export { DiscountService };
//# sourceMappingURL=discount.service.js.map