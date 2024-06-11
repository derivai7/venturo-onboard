import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let PromoService = class PromoService {
    constructor(landaService) {
        this.landaService = landaService;
    }
    getPromo(arrParameter = {}) {
        return this.landaService.DataGet('/v1/promo', arrParameter);
    }
    getPromoById(userId) {
        return this.landaService.DataGet('/v1/promo/' + userId);
    }
    createPromo(payload) {
        return this.landaService.DataPost('/v1/promo', payload);
    }
    updatePromo(payload) {
        return this.landaService.DataPut('/v1/promo', payload);
    }
    deletePromo(userId) {
        return this.landaService.DataDelete('/v1/promo/' + userId);
    }
};
PromoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], PromoService);
export { PromoService };
//# sourceMappingURL=promo.service.js.map