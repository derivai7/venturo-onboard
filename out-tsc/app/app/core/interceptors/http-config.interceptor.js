import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';
let HttpConfigInterceptor = class HttpConfigInterceptor {
    constructor(authService, router, loaderService) {
        this.authService = authService;
        this.router = router;
        this.loaderService = loaderService;
    }
    intercept(request, next) {
        let token = this.authService.getToken();
        let tokenCsrf = this.authService.getCsrf();
        if (['PUT', 'POST', 'DELETE'].includes(request.method)) {
            this.loaderService.show();
        }
        if (token) {
            request = request.clone({
                headers: request.headers.set('Authorization', 'Bearer ' + token),
            });
        }
        if (!request.headers.has('Content-Type')) {
            request = request.clone({
                headers: request.headers.set('Content-Type', 'application/json'),
            });
        }
        request = request.clone({
            headers: request.headers.set('Accept', 'application/json'),
        });
        request = request.clone({
            headers: request.headers.set('X-CSRF-TOKEN', tokenCsrf),
        });
        return next.handle(request).pipe(map((event) => {
            return event;
        }), catchError((error) => {
            if ([403, 401].includes(error.error.status_code)) {
                Swal.fire({
                    title: 'Ooops',
                    text: error.error.errors[0],
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: '#34c38f',
                    cancelButtonColor: '#f46a6a',
                    confirmButtonText: 'Login Ulang',
                }).then((result) => {
                    if (result.value) {
                        token = '';
                        this.authService.logout();
                        this.router.navigate(['/auth/login']).then(() => {
                            window.location.reload();
                        });
                    }
                });
                return throwError(error);
            }
            return throwError(error);
        }), finalize(() => this.loaderService.hide()));
    }
};
HttpConfigInterceptor = __decorate([
    Injectable()
], HttpConfigInterceptor);
export { HttpConfigInterceptor };
//# sourceMappingURL=http-config.interceptor.js.map