import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

import { Driver } from '../classes/driver';
import { DriversService } from '../services/drivers.service';

@Injectable()
export class DriverResolver implements Resolve<Driver> {
    constructor(private driversService: DriversService,
                private router: Router) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Driver> {
        return new Observable((subscriber) => {
            this.driversService.getOne(route.params.id)
                .subscribe(
                    (rider: Driver) => {
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
