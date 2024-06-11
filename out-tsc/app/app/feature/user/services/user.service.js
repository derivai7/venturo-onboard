import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let UserService = class UserService {
    constructor(landaService) {
        this.landaService = landaService;
    }
    getUsers(arrParameter = {}) {
        return this.landaService.DataGet('/v1/users', arrParameter);
    }
    getUserById(userId) {
        return this.landaService.DataGet('/v1/users/' + userId);
    }
    createUser(payload) {
        return this.landaService.DataPost('/v1/users', payload);
    }
    updateUser(payload) {
        return this.landaService.DataPut('/v1/users', payload);
    }
    deleteUser(userId) {
        return this.landaService.DataDelete('/v1/users/' + userId);
    }
    getRoles(arrParameter = {}) {
        return this.landaService.DataGet('/v2/roles', arrParameter);
    }
    getRolesById(roleId) {
        return this.landaService.DataGet('/v2/roles/' + roleId);
    }
};
UserService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], UserService);
export { UserService };
//# sourceMappingURL=user.service.js.map