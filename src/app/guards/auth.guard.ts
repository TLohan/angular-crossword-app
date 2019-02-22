import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            console.log('activated');
            return true;
        } else {
            console.log('nope');
        }

        this.router.navigate(['/login'], {queryParams: {returnUrl: state.url }} );
        return false;
    }

}
