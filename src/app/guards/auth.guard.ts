import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { SessionService } from '../services/session.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private sessionService: SessionService,
                private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.sessionService.checkLoggedInState()
            .do((isLoggedIn: boolean) => {
                if (!isLoggedIn) {
                    this.router.navigate(['/sign-in']);
                }
            });
    }
}
