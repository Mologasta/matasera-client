import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

import { Rider } from '../classes/rider';
import { RidersService } from '../services/riders.service';

@Injectable()
export class RiderResolver implements Resolve<Rider> {
    constructor(private ridersService: RidersService,
                private router: Router) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Rider> {
        return new Observable((subscriber) => {
            this.ridersService.getOne(route.params.id)
                .subscribe(
                    (rider: Rider) => {
                        subscriber.next(rider);
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
