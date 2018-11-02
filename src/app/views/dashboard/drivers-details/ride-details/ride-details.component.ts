import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Ride } from '../../../../classes/ride';
import { Driver } from '../../../../classes/driver';

@Component({
    selector: 'app-drivers-details',
    templateUrl: './ride-details.component.html',
    styleUrls: ['./ride-details.component.scss', '../../dashboard-shared.scss']
})
export class RideDetailsComponent {
    public ride: Ride;
    private driver: Driver;
    public avatarPlaceholder = 'assets/img/avatar-placeholder.png';

    constructor(private router: Router, private activatedRoute: ActivatedRoute) {
        this.activatedRoute.data.subscribe(({driver, ride}) => {
            this.driver = driver;
            this.ride = ride;
        });
    }

    public onViewClick(): void {
        this.router.navigate(['/riders', this.ride.rider.id]);
    }

}
