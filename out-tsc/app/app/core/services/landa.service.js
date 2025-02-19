import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
let LandaService = class LandaService {
    constructor(http) {
        this.http = http;
        this.apiURL = environment.apiURL;
    }
    ngOnInit() { }
    /**
     * Request GET
     */
    DataGet(path, payloads = {}) {
        let clearParams = {};
        for (const key in payloads) {
            if (payloads[key])
                clearParams[key] = payloads[key];
        }
        return this.http.get(this.apiURL + path, {
            params: clearParams,
        });
    }
    /**
     * Request POST
     */
    DataPost(path, payloads = {}) {
        const reqHeader = this.httpOptions;
        return this.http.post(this.apiURL + path, payloads, reqHeader);
    }
    /**
     * Request PUT
     */
    DataPut(path, payloads = {}) {
        const reqHeader = this.httpOptions;
        return this.http.put(this.apiURL + path, payloads, reqHeader);
    }
    /**
    * Request DELETE
    */
    DataDelete(path, payloads = {}) {
        return this.http.delete(this.apiURL + path, {
            params: payloads,
        });
    }
    /**
     * Sweet alert Sukses
     */
    alertSuccess(title, content, timer = 3.5) {
        Swal.fire({
            title,
            text: content,
            icon: 'success',
            timer: timer * 1000,
            showConfirmButton: true,
        });
    }
    /**
     * Sweet alert warning
     */
    alertWarning(title, content, timer = 3.5) {
        Swal.fire({
            title,
            text: content,
            icon: 'warning',
            timer: timer * 1000,
            showConfirmButton: true,
        });
    }
    /**
     * Sweet alert info
     */
    alertInfo(title, content, timer = 3.5) {
        Swal.fire({
            title,
            text: content,
            icon: 'info',
            timer: timer * 1000,
            showConfirmButton: true,
        });
    }
    /**
     * Sweet alert error
     */
    alertError(title, content) {
        let isi = '';
        if (Array.isArray(content) === true) {
            content.forEach(function (element) {
                isi += `${element} <br>`;
            });
        }
        else if (typeof content === 'object') {
            for (const key in content) {
                isi += `${content[key]} <br>`;
            }
        }
        else {
            isi = String(content);
        }
        Swal.fire(title, isi, 'error');
    }
};
LandaService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], LandaService);
export { LandaService };
//# sourceMappingURL=landa.service.js.map