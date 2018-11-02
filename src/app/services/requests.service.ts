import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ResponseModel } from '../classes/response';
import { UpdateRequest } from '../classes/request';
import { RequestParams } from '../classes/request-params';
import { API_ROUTES } from '../app.constants';

@Injectable()
export class RequestsService {
    private API_URL = API_ROUTES.REQUESTS;

    constructor(private httpClient: HttpClient) {
    }

    getList(params: RequestParams): Observable<ResponseModel<UpdateRequest[]>> {
        const httpParams = new HttpParams()
            .set('limit', `${params.limit}`)
            .set('offset', `${params.offset}`);
        return this.httpClient
            .get<ResponseModel<UpdateRequest[]>>(this.API_URL, {params: httpParams})
            .map((response: ResponseModel<UpdateRequest[]>) => response);
    }

    getOne(id: number): Observable<UpdateRequest> {
        return this.httpClient
            .get<ResponseModel<UpdateRequest>>(`${this.API_URL}/${id}`)
            .map((response: ResponseModel<UpdateRequest>) => new UpdateRequest(response.data));
    }

    acceptOne(id: number): Observable<UpdateRequest> {
        return this.httpClient
            .patch<ResponseModel<UpdateRequest>>(`${this.API_URL}/${id}`, {})
            .map((response: ResponseModel<UpdateRequest>) => new UpdateRequest(response.data));
    }

    rejectOne(id: number): Observable<UpdateRequest> {
        return this.httpClient
            .delete<ResponseModel<UpdateRequest>>(`${this.API_URL}/${id}`)
            .map((response: ResponseModel<UpdateRequest>) => new UpdateRequest(response.data));
    }
}
