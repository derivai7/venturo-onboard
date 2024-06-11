import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let ProductService = class ProductService {
    constructor(landaService) {
        this.landaService = landaService;
    }
    getProducts(arrParameter = {}) {
        return this.landaService.DataGet('/v1/products', arrParameter);
    }
    getProductId(id) {
        return this.landaService.DataGet('/v1/products/' + id);
    }
    createProduct(payload) {
        return this.landaService.DataPost('/v1/products', payload);
    }
    updateProduct(payload) {
        return this.landaService.DataPut('/v1/products', payload);
    }
    deleteProduct(id) {
        return this.landaService.DataDelete('/v1/products/' + id);
    }
};
ProductService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ProductService);
export { ProductService };
//# sourceMappingURL=product.service.js.map