import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, PageEvent } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';

import { PAGINATION_PARAMETERS, RIDER_PREFERENCES } from '../../../app.constants';
import { RidersService } from '../../../services/riders.service';
import { RequestParams } from '../../../classes/request-params';

@Component({
    selector: 'app-riders-list',
    templateUrl: './riders-list.component.html',
    styleUrls: ['./riders-list.component.scss', '../dashboard-shared.scss']
})
export class RidersListComponent implements OnInit {
    @ViewChild('paginator') paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    public riders = [];
    public paginationParameters = PAGINATION_PARAMETERS;
    public pageIndex = 0;
    public totalRiders = 0;
    public preferences = RIDER_PREFERENCES;
    public searchForm: FormGroup;
    public isSearchDisabled = false;
    public searchString = '';
    public displayedColumns = ['firstName', 'lastName', 'email', 'number', 'action'];
    public isBlocked = false;

    private params: RequestParams;

    constructor(private formBuilder: FormBuilder,
                private ridersService: RidersService) {
        this.params = new RequestParams({isVerified: true});
    }

    ngOnInit() {
        this.initForm();
        this.getList();
    }

    private initForm(): void {
        this.searchForm = this.formBuilder.group({
            searchString: '',
            riderPreference: '',
        });
        this.searchForm.valueChanges.subscribe(({searchString}) => {
            this.isSearchDisabled = searchString.length > 0 && searchString.length < 3;
        });
    }

    private getList(search?: string): void {
        if (search) {
            this.params.search = search ? search : '';
        } else {
            this.params.search = '';
        }
        this.params.isBlocked = this.isBlocked;
        this.ridersService.getList(this.params)
            .subscribe((result) => {
                this.riders = result.data;
                this.totalRiders = result.pagination.totalCount;
            });
    }

    public sortData(event): void {
        this.params.field = event.active;
        this.params.order = event.direction.toUpperCase();
        this.getList(this.searchString);
    }

    public onPageChanges(event: PageEvent): void {
        this.params.offset = event.pageIndex * PAGINATION_PARAMETERS.LIMIT;
        this.getList(this.searchString);
    }

    public onFilterClick(): void {
        this.searchString = this.searchForm.value.searchString;
        this.params.offset = PAGINATION_PARAMETERS.OFFSET;
        this.paginator.firstPage();
        this.getList(this.searchString);
    }

    public onSwitcherChange(event): void {
        this.isBlocked = event;
        this.getList(this.searchString);
    }

    public selectPreference(): void {
        this.params.preference = this.searchForm.value.riderPreference;
        this.getList(this.searchString);
    }
}
