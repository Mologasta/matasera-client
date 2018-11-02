import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

import {Ride} from '../classes/ride';
import {RidesService} from '../services/rides.service';

@Injectable()
export class RideResolver implements Resolve<Ride> {
    constructor(private ridesService: RidesService,
                private router: Router) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Ride> {
        return new Observable((subscriber) => {
            this.ridesService.getOneByDriver(route.params.id, route.params.rideId)
                .subscribe(
                    (ride: Ride) => {
                        subscriber.next(ride);
                        subscriber.complete();
                    },
                    (err) => {
                        this.router.navigate(['/']);
                        subscriber.complete();
                    }
                );
        });
    }
}
