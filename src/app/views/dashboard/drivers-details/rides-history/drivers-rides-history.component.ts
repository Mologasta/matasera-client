import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Ride } from '../../../../classes/ride';
import { RidesService } from '../../../../services/rides.service';
import { Driver } from '../../../../classes/driver';
import {PAGINATION_PARAMETERS} from '../../../../app.constants';
import {PageEvent} from '@angular/material';
import {RequestParams} from '../../../../classes/request-params';

@Component({
    selector: 'app-drivers-details',
    templateUrl: './drivers-rides-history.component.html',
    styleUrls: ['./drivers-rides-history.component.scss', '../../dashboard-shared.scss']
})
export class DriverRidesHistoryComponent implements OnInit {
    public rides =  [];
    public paginationParameters = PAGINATION_PARAMETERS;
    public pageIndex = 0;
    public totalCount = 0;
    private driver: Driver;
    private params: RequestParams;
    public displayedColumns = ['startLocation', 'endLocation', 'type', 'action'];

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private ridesService: RidesService) {
        this.params = new RequestParams();
        this.activatedRoute.data.subscribe(({driver}) => {
            this.driver = driver;
        });
    }

    public onPageChanges(event: PageEvent): void {
        this.params.offset = event.pageIndex * PAGINATION_PARAMETERS.LIMIT;
        this.getList();
    }

    private getList(): void {
        this.ridesService
            .getList(this.driver.id, this.params)
            .subscribe(results => {
                this.rides = results.data;
                this.totalCount = results.pagination.totalCount;
            });
    }

    ngOnInit() {
        this.getList();
    }

}
