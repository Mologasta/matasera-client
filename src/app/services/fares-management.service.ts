import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ResponseModel } from '../classes/response';
import { API_ROUTES } from '../app.constants';
import { Fare } from '../classes/fare';
import { FeesUpdate } from '../interfaces/fee-update.interface';

@Injectable()
export class FaresManagementService {
    private API_URL = API_ROUTES.FEES;

    constructor(private httpClient: HttpClient) {
    }

    update(data: FeesUpdate): Observable<Fare> {
        return this.httpClient
            .put<ResponseModel<Fare>>(this.API_URL, data)
            .map((response: ResponseModel<Fare>) => new Fare(response.data));
    }

    get(): Observable<Fare> {
        return this.httpClient
            .get<ResponseModel<Fare>>(this.API_URL)
            .map((response: ResponseModel<Fare>) => new Fare(response.data));
    }
}
