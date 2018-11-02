import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Credentials } from '../interfaces/credentials.interface';
import { ResponseModel } from '../classes/response';
import { SessionModel } from '../interfaces/session.interface';
import { API_ROUTES } from '../app.constants';

@Injectable()
export class AuthService {
    private API_ROOT = API_ROUTES.SESSIONS;

    constructor(private httpClient: HttpClient) {
    }

    public signIn(credentials: Credentials): Observable<SessionModel> {
        return this.httpClient
            .post<ResponseModel<SessionModel>>(this.API_ROOT, credentials)
            .map((response: ResponseModel<SessionModel>) => response.data);
    }

    public logout(): Observable<any> {
        return this.httpClient
            .delete<ResponseModel<any>>(this.API_ROOT)
            .map((response: ResponseModel<any>) => response.data);
    }

}
