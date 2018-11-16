import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { SessionService } from '../services/session.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private sessionService: SessionService,
                private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.sessionService.checkLoggedInState()
            .pipe(tap((isLoggedIn: boolean) => {
                if (!isLoggedIn) {
                    this.router.navigate(['/sign-in']);
                }
            }));
    }
}
