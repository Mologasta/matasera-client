import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ResponseModel } from '../classes/response';
import { Driver } from '../classes/driver';
import { RequestParams } from '../classes/request-params';
import { API_ROUTES } from '../app.constants';
import { DriverDetails } from '../interfaces/driver-details.interface';
import {Rider} from '../classes/rider';

@Injectable()
export class DriversService {
    private API_URL = API_ROUTES.DRIVERS;

    constructor(private httpClient: HttpClient) {
    }

    getList(params: RequestParams): Observable<ResponseModel<Driver[]>> {
        let httpParams = new HttpParams()
            .set('limit', `${params.limit}`)
            .set('offset', `${params.offset}`)
            .set('order', params.order)
            .set('isVerified', `${params.isVerified}`)
            .set('isBlocked', `${params.isBlocked}`)
            .set('field', `${params.field}`)
            .set('filter', params.search.replace(/[+]/, ''));

        if (params.qualification) {
            httpParams = httpParams.set('qualification', `${params.qualification}`);
        }
        return this.httpClient
            .get<ResponseModel<Driver[]>>(this.API_URL, {params: httpParams})
            .map((response: ResponseModel<Driver[]>) => response);
    }

    getOne(id: number): Observable<Driver> {
        return this.httpClient
            .get<ResponseModel<Driver>>(`${this.API_URL}/${id}`)
            .map((response: ResponseModel<Driver>) => new Driver(response.data));
    }

    // Method for driver verification
    editAndVerifyOne(id: number, data: DriverDetails): Observable<Driver> {
        return this.httpClient
            .patch<ResponseModel<Driver>>(`${this.API_URL}/${id}`, data)
            .map((response: ResponseModel<Driver>) => new Driver(response.data));
    }

    // Method is purely for driver editing
    editOne(id: number, data: DriverDetails): Observable<Driver> {
        return this.httpClient
            .put<ResponseModel<Driver>>(`${this.API_URL}/${id}`, data)
            .map((response: ResponseModel<Driver>) => new Driver(response.data));
    }

    deleteOne(id: number): Observable<Driver> {
        return this.httpClient
            .delete<ResponseModel<Driver>>(`${this.API_URL}/${id}`)
            .map((response: ResponseModel<Driver>) => new Driver(response.data));
    }

    blockOne(id: number): Observable<Driver> {
        return this.httpClient
            .patch<ResponseModel<Driver>>(`${this.API_URL}/${id}/block`, {})
            .map((response: ResponseModel<Driver>) => new Driver(response.data));
    }

    unblockOne(id: number): Observable<Driver> {
        return this.httpClient
            .patch<ResponseModel<Driver>>(`${this.API_URL}/${id}/unblock`, {})
            .map((response: ResponseModel<Driver>) => new Driver(response.data));
    }
}
