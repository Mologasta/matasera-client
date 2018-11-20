import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ResponseModel } from '../classes/response';
import { RequestParams } from '../classes/request-params';
import { API_ROUTES } from '../app.constants';
import { Image } from '../classes/image';
import { map } from 'rxjs/internal/operators';

@Injectable()
export class ImagesService {
    private API_URL = API_ROUTES.IMAGES;

    constructor(private httpClient: HttpClient) {
    }

    getList(params: RequestParams): Observable<ResponseModel<Image[]>> {
        let httpParams = new HttpParams()
            .set('limit', `${params.limit}`)
            .set('offset', `${params.offset}`);

        return this.httpClient
            .get<ResponseModel<Image[]>>(this.API_URL, {params: httpParams});
    }

    upload(image: Blob, lat?: number, long?: number): Observable<Image> {
        let formData = new FormData();
        formData.append("image", image);

        if(lat && long) {
            formData.append('lat', `${lat}`);
            formData.append('long', `${long}`);
        }

        return this.httpClient
            .post<ResponseModel<Image>>(API_ROUTES.IMAGES, formData)
            .pipe(map((response: ResponseModel<Image>) => response.data));
    }
}
