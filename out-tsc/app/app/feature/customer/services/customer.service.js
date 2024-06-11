import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let CustomerService = class CustomerService {
    constructor(landaService) {
        this.landaService = landaService;
    }
    getCustomers(arrParameter = {}) {
        return this.landaService.DataGet('/v1/customers', arrParameter);
    }
    getCustomerById(userId) {
        return this.landaService.DataGet('/v1/customers/' + userId);
    }
    createCustomer(payload) {
        return this.landaService.DataPost('/v1/customers', payload);
    }
    updateCustomer(payload) {
        return this.landaService.DataPut('/v1/customers', payload);
    }
    deleteCustomer(userId) {
        return this.landaService.DataDelete('/v1/customers/' + userId);
    }
};
CustomerService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], CustomerService);
export { CustomerService };
//# sourceMappingURL=customer.service.js.map