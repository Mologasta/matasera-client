import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { NotifierService } from '../services/notifier.service';
import { responseErrorHandler } from '../helpers/response-error-handler';

@Injectable()
export class ResponseErrorInterceptor implements HttpInterceptor {
    constructor(private Notification: NotifierService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(catchError((err: any) => {
                this.Notification.error(responseErrorHandler(err));
                return throwError(err);
            }));
    }
}
