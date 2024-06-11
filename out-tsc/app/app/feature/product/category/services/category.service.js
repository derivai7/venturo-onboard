import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let CategoryService = class CategoryService {
    constructor(landaService) {
        this.landaService = landaService;
    }
    getCategories(arrParameter = {}) {
        return this.landaService.DataGet('/v1/categories', arrParameter);
    }
    getCategoryById(id) {
        return this.landaService.DataGet('/v1/categories/' + id);
    }
    createCategory(payload) {
        return this.landaService.DataPost('/v1/categories', payload);
    }
    updateCategory(payload) {
        return this.landaService.DataPut('/v1/categories', payload);
    }
    deleteCategory(id) {
        return this.landaService.DataDelete('/v1/categories/' + id);
    }
};
CategoryService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], CategoryService);
export { CategoryService };
//# sourceMappingURL=category.service.js.map