import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';

import { PAGINATION_PARAMETERS } from '../../../app.constants';
import { DriversService } from '../../../services/drivers.service';
import { RequestParams } from '../../../classes/request-params';

@Component({
    selector: 'app-drivers-requests',
    templateUrl: './drivers-requests.component.html',
    styleUrls: ['./drivers-requests.component.scss', '../dashboard-shared.scss']
})
export class DriversRequestsComponent implements OnInit {
    @ViewChild('paginator') paginator: MatPaginator;
    public drivers = [];
    public paginationParameters = PAGINATION_PARAMETERS;
    public pageIndex = 0;
    public totalDrivers = 0;
    public searchForm: FormGroup;
    public isSearchDisabled = false;
    public searchString = '';
    public displayedColumns = ['firstName', 'lastName', 'email', 'phone', 'action'];

    private params: RequestParams;

    constructor(private formBuilder: FormBuilder,
                private driversService: DriversService) {
        this.params = new RequestParams();
    }

    ngOnInit() {
        this.initForm();
        this.getList();
    }

    private initForm(): void {
        this.searchForm = this.formBuilder.group({
            searchString: ''
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
        this.driversService.getList(this.params)
            .subscribe((result) => {
                this.drivers = result.data;
                this.totalDrivers = result.pagination.totalCount;
            });
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
}
