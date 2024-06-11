import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { StateService } from 'src/app/core/services/state.service';
const initialState = {
    userLogin: {
        id: '',
        nama: '',
        email: '',
        user_profile: '',
    },
};
let AuthService = class AuthService extends StateService {
    constructor(landaService) {
        super(initialState);
        this.landaService = landaService;
        this.userLogin = this.select(state => state.userLogin);
    }
    /**
     * Request login
     */
    login(email, password) {
        return this.landaService.DataPost('/v1/auth/login', {
            email: email,
            password: password
        });
    }
    /**
     * Ambil token CSRF dari server dan simpan di localStorage
     */
    saveCsrf() {
        this.landaService.DataGet('/v1/auth/csrf').subscribe((res) => {
            return new Promise((resolve, reject) => {
                localStorage.setItem('csrf', res.data);
                resolve(true);
            });
        });
    }
    /**
     * Ambil token CSRF dari localStorage
     */
    getCsrf() {
        const token = localStorage.getItem('csrf');
        if (token) {
            return token;
        }
        return '';
    }
    /**
     * Logout
     */
    logout() {
        this.removeToken();
    }
    /**
     * Ambil profile user yang login dari state management
     */
    getProfile() {
        return this.select(state => state.userLogin);
    }
    /**
     * Ambil user yang login ke server
     * dan simpan di RxJS
     */
    saveUserLogin() {
        return this.landaService.DataGet('/v1/auth/profile').subscribe((res) => {
            this.setState({ userLogin: res.data });
        });
    }
    /**
    * Simpan token user ke localstorage
    */
    saveToken(payload) {
        return new Promise((resolve, reject) => {
            localStorage.setItem('user', payload);
            resolve(true);
        });
    }
    /**
     * Hapus user dari local Storage
     */
    removeToken() {
        return new Promise((resolve, reject) => {
            localStorage.removeItem('user');
            resolve(true);
        });
    }
    /**
     * Ambil token user dari localstorage
     */
    getToken() {
        const token = localStorage.getItem('user');
        if (token) {
            return token;
        }
        return '';
    }
};
AuthService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map