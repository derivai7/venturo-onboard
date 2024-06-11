import {Injectable} from '@angular/core';
import {LandaService} from "../../../core/services/landa.service";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private landaService: LandaService) {
    }

    getUsers(arrParameter = {}) {
        return this.landaService.DataGet('/v1/users', arrParameter);
    }

    getUserById(userId: string) {
        return this.landaService.DataGet('/v1/users/' + userId);
    }

    createUser(payload: any) {
        return this.landaService.DataPost('/v1/users', payload);
    }

    updateUser(payload: any) {
        return this.landaService.DataPut('/v1/users', payload);
    }

    deleteUser(userId: string) {
        return this.landaService.DataDelete('/v1/users/' + userId);
    }

    getRoles(arrParameter = {}) {
        return this.landaService.DataGet('/v1/roles', arrParameter);
    }

    getRolesById(roleId: string) {
        return this.landaService.DataGet('/v1/roles/' + roleId);
    }
}
