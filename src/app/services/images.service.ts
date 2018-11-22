import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ResponseModel } from '../classes/response';
import { API_ROUTES } from '../app.constants';
import { Image } from '../classes/image';
import { map } from 'rxjs/internal/operators';
import { ImageComment } from '../classes/comment';

@Injectable()
export class ImagesService {
    private API_URL = API_ROUTES.IMAGES;

    constructor(private httpClient: HttpClient) {
    }

    getList(data): Observable<ResponseModel<Image[]>> {
        const httpParams = new HttpParams()
            .append('lat', data.lat)
            .append('lng', data.lng)
            .append('radius', data.radius);

        return this.httpClient
            .get<ResponseModel<Image[]>>(this.API_URL, {params: httpParams});
    }

    upload(image: Blob, lat?: number, lng?: number): Observable<Image> {
        let formData = new FormData();
        formData.append("image", image);

        if(lat && lng) {
            formData.append('lat', `${lat}`);
            formData.append('lng', `${lng}`);
        }

        return this.httpClient
            .post<ResponseModel<Image>>(API_ROUTES.IMAGES, formData)
            .pipe(map((response: ResponseModel<Image>) => response.data));
    }

    getComments(imageId: number): Observable<ResponseModel<ImageComment[]>> {
        return this.httpClient
            .get<ResponseModel<ImageComment[]>>(`${this.API_URL}/${imageId}/comments`);
    }

    addComment(data, imageId: number): Observable<ImageComment> {
        return this.httpClient
            .post<ResponseModel<ImageComment>>(`${this.API_URL}/${imageId}/comments`, data)
            .pipe(map((response: ResponseModel<ImageComment>) => response.data));
    }
}
