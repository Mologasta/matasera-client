import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ResponseModel } from '../classes/response';
import { User } from '../classes/user';
import { RequestParams } from '../classes/request-params';
import { API_ROUTES } from '../app.constants';
import { SessionModel } from '../interfaces/session.interface';

@Injectable()
export class UsersService {
    private API_URL = API_ROUTES.USERS;

    constructor(private httpClient: HttpClient) {
    }

    getList(params: RequestParams): Observable<ResponseModel<User[]>> {
        let httpParams = new HttpParams()
            .set('limit', `${params.limit}`)
            .set('offset', `${params.offset}`);

        return this.httpClient
            .get<ResponseModel<User[]>>(this.API_URL, {params: httpParams});
    }

    getOne(id: number): Observable<User> {
        return this.httpClient
            .get<ResponseModel<User>>(`${this.API_URL}/${id}`)
            .pipe(map((response: ResponseModel<User>) => new User(response.data)));
    }
}
