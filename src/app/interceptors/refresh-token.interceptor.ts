import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpEventType,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Observable, throwError } from 'rxjs/index';
import { filter, finalize, catchError, switchMap } from 'rxjs/operators';

import { SessionService } from '../services/session.service';
import { NotifierService } from '../services/notifier.service';
import { environment } from '../../environments/environment';
import { SessionModel } from '../interfaces/session.interface';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
    private tokenRequested = new Subject();
    private onHold = false;

    constructor(private sessionService: SessionService,
                private router: Router,
                private notifierService: NotifierService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        return next.handle(req)
            .pipe(catchError((error) => {
                if (error.status !== 401) {
                    return throwError(error);
                }

                const refreshToken = this.sessionService.getCurrentSessionInfo().refreshToken;

                // decline several refresh token requests
                if (this.onHold) {
                    return this.tokenRequested.pipe()
                        .pipe(filter(res => !!res))
                        .pipe(switchMap((res: any) => {
                            const updatedReq = req.clone({
                                headers: new HttpHeaders({
                                    Authorization: `Bearer ${res}`
                                })
                            });
                            return next.handle(updatedReq);
                        }));
                }

                // Obtain new session data
                this.onHold = true;
                const request = new HttpRequest(
                    'PUT',
                    environment.API_URL + '/admins/sessions',
                    { refreshToken },
                    {
                        headers: req.headers.set('Authorization', `Bearer ${this.sessionService.getCurrentSessionInfo().token}`),
                        reportProgress: false
                    }
                );

                return next.handle(request)
                    .pipe(
                        filter((httpEvent: HttpEvent<any>) => httpEvent.type === HttpEventType.Response),
                        switchMap((success: HttpResponse<any>) => {
                            const signInData: SessionModel = success.body.data;
                            this.sessionService.startSession(signInData);
                            const updatedReq = req.clone({
                                headers: new HttpHeaders({
                                    Authorization: `Bearer ${signInData.credentials.token}`
                                })
                            });
                            this.tokenRequested.next(signInData.credentials.token);
                            return next.handle(updatedReq);
                        }),
                        finalize(() => this.onHold = null),
                        catchError(() => {
                            this.notifierService.error('Your token is invalid, please re-login');
                            this.router.navigate(['/sign-in']);
                            return null;
                        }));
            }));
    }
}
