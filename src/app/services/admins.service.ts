import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { API_ROUTES } from '../app.constants';
import { Admin } from '../classes/admin';
import { ResponseModel } from '../classes/response';

@Injectable()
export class AdminsService {
    private API_ROOT = API_ROUTES.ADMIN;

    constructor(private httpClient: HttpClient) {
    }

    get(): Observable<Admin> {
        return this.httpClient
            .get<ResponseModel<Admin>>(`${this.API_ROOT}/`)
            .map((response: ResponseModel<Admin>) => new Admin(response.data));
    }

    changePassword(data: { password: string, newPassword: string }): Observable<Admin> {
        return this.httpClient
            .put<ResponseModel<Admin>>(`${this.API_ROOT}/password`, data)
            .map((response: ResponseModel<Admin>) => new Admin(response.data));
    }

}
