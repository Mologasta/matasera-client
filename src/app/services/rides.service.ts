import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ResponseModel } from '../classes/response';
import { Ride } from '../classes/ride';
import { API_ROUTES } from '../app.constants';
import {RequestParams} from '../classes/request-params';
import {Driver} from '../classes/driver';

@Injectable()
export class RidesService {
    private API_URL = API_ROUTES.DRIVERS;

    constructor(private httpClient: HttpClient) {
    }

    getList(driverId: number, params: RequestParams): Observable<ResponseModel<Ride[]>> {
        const httpParams = new HttpParams()
            .set('limit', `${params.limit}`)
            .set('offset', `${params.offset}`);
        return this.httpClient
            .get<ResponseModel<Ride[]>>(`${this.API_URL}/${driverId}/rides`, {params: httpParams})
            .map((response: ResponseModel<Ride[]>) => response);
    }

    getOneByDriver(driverId: number, rideId: number): Observable<Ride> {
        return this.httpClient
            .get<ResponseModel<Ride>>(`${this.API_URL}/${driverId}/rides/${rideId}`)
            .map((response: ResponseModel<Ride>) => new Ride(response.data));
    }
}
