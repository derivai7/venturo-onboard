import { __decorate } from "tslib";
import { Component } from '@angular/core';
let LoginComponent = class LoginComponent {
    constructor(authService, landaService, router) {
        this.authService = authService;
        this.landaService = landaService;
        this.router = router;
        this.year = new Date().getFullYear();
        if (this.authService.getToken() !== '') {
            this.router.navigate(['/home']);
        }
    }
    ngOnInit() {
        this.authService.logout();
    }
    ngAfterViewInit() {
    }
    login() {
        this.authService.login(this.email, this.password).subscribe((res) => {
            this.authService.saveToken(res.data.access_token);
            this.router.navigate(['/home']);
        }, (err) => {
            this.landaService.alertError('Mohon Maaf', err.error.errors);
        });
    }
};
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.scss']
    })
    /**
     * Login component
     */
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map