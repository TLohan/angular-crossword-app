import { Injectable } from '@angular/core';
import { Auth2Service } from '../core/auth2.service';
import { Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router';

@Injectable()
export class ScopeGuardService implements CanActivate {

    constructor(private authService: Auth2Service, public router: Router) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const scopes = (route.data as any).expectedScopes;

        if (!this.authService.authenticated || !this.authService.userHasScopes(scopes)) {
            this.router.navigate(['']);
            return false;
        }

        return true;
    }

}
