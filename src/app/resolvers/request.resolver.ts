import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

import { UpdateRequest } from '../classes/request';
import { RequestsService } from '../services/requests.service';

@Injectable()
export class RequestResolver implements Resolve<UpdateRequest> {
    constructor(private requestsService: RequestsService,
                private router: Router) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UpdateRequest> {
        return new Observable((subscriber) => {
            this.requestsService.getOne(route.params.id)
                .subscribe(
                    (request: UpdateRequest) => {
                        subscriber.next(request);
                        subscriber.complete();
                    },
                    () => {
                        this.router.navigate(['/']);
                        subscriber.complete();
                    }
                );
        });
    }
}
