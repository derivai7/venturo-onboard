import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let VoucherService = class VoucherService {
    constructor(landaService) {
        this.landaService = landaService;
    }
    getVoucher(arrParameter = {}) {
        return this.landaService.DataGet('/v1/vouchers', arrParameter);
    }
    getVoucherById(id) {
        return this.landaService.DataGet('/v1/vouchers/' + id);
    }
    createVoucher(payload) {
        return this.landaService.DataPost('/v1/vouchers', payload);
    }
    updateVoucher(payload) {
        return this.landaService.DataPut('/v1/vouchers', payload);
    }
    deleteVoucher(id) {
        return this.landaService.DataDelete('/v1/vouchers/' + id);
    }
};
VoucherService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], VoucherService);
export { VoucherService };
//# sourceMappingURL=voucher.service.js.map