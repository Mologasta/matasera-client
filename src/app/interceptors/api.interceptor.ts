import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { SessionService } from '../services/session.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

    constructor(private sessionService: SessionService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const accessToken = (this.sessionService.getCurrentSessionInfo()
            && this.sessionService.getCurrentSessionInfo().token)
            ? this.sessionService.getCurrentSessionInfo().token
            : null;

        const request = req.clone({
            url: [environment.API_URL, req.url].join(''),
            headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
        });

        return next.handle(request);
    }
}
