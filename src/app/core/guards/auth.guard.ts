import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/feature/auth/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let userLogin: any;
        this.authenticationService.getProfile().subscribe((user: any) => (userLogin = user));
        if (userLogin.id != '') {
            return true;
        }

        this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
