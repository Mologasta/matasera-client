import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {ResponseModel} from '../classes/response';
import {Rider} from '../classes/rider';
import {RequestParams} from '../classes/request-params';
import {API_ROUTES} from '../app.constants';

@Injectable()
export class RidersService {
    private API_URL = API_ROUTES.RIDERS;

    constructor(private httpClient: HttpClient) {
    }

    getList(params: RequestParams): Observable<ResponseModel<Rider[]>> {
        let httpParams = new HttpParams()
            .set('order', params.order)
            .set('limit', `${params.limit}`)
            .set('offset', `${params.offset}`)
            .set('isVerified', `${params.isVerified}`)
            .set('isBlocked', `${params.isBlocked}`)
            .set('field', `${params.field}`)
            .set('filter', params.search);

        if (params.preference) {
            httpParams = httpParams.set('preferences', `${params.preference}`);
        }
        return this.httpClient
            .get<ResponseModel<Rider[]>>(this.API_URL, {params: httpParams})
            .map((response: ResponseModel<Rider[]>) => response);
    }

    getOne(id: number): Observable<Rider> {
        return this.httpClient
            .get<ResponseModel<Rider>>(`${this.API_URL}/${id}`)
            .map((response: ResponseModel<Rider>) => new Rider(response.data));
    }

    verifyOne(id: number): Observable<Rider> {
        return this.httpClient
            .patch<ResponseModel<Rider>>(`${this.API_URL}/${id}`, {})
            .map((response: ResponseModel<Rider>) => new Rider(response.data));
    }

    deleteOne(id: number): Observable<Rider> {
        return this.httpClient
            .delete<ResponseModel<Rider>>(`${this.API_URL}/${id}`)
            .map((response: ResponseModel<Rider>) => new Rider(response.data));
    }

    blockOne(id: number): Observable<Rider> {
        return this.httpClient
            .patch<ResponseModel<Rider>>(`${this.API_URL}/${id}/block`, {})
            .map((response: ResponseModel<Rider>) => new Rider(response.data));
    }

    unblockOne(id: number): Observable<Rider> {
        return this.httpClient
            .patch<ResponseModel<Rider>>(`${this.API_URL}/${id}/unblock`, {})
            .map((response: ResponseModel<Rider>) => new Rider(response.data));
    }
}
