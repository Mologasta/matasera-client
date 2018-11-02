import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { NotifierService } from '../services/notifier.service';
import { responseErrorHandler } from '../helpers/response-error-handler';

@Injectable()
export class ResponseErrorInterceptor implements HttpInterceptor {
    constructor(private Notification: NotifierService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .catch((err: any) => {
                this.Notification.error(responseErrorHandler(err));
                return Observable.throw(err);
            });
    }
}
