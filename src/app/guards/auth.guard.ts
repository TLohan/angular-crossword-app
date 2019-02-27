import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Auth2Service } from '../core/auth2.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, public authService: Auth2Service) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.authService.isAuthenticated()) {
            this.router.navigate(['']);
            return false;
        }

        // this.router.navigate(['/login'], {queryParams: {returnUrl: state.url }} );
        return true;
    }

}
