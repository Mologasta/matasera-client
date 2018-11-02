import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';

import { PAGINATION_PARAMETERS } from '../../../app.constants';
import { RidersService } from '../../../services/riders.service';
import { RequestParams } from '../../../classes/request-params';

@Component({
    selector: 'app-riders-requests',
    templateUrl: './riders-requests.component.html',
    styleUrls: ['./riders-requests.component.scss', '../dashboard-shared.scss']
})
export class RidersRequestsComponent implements OnInit {
    @ViewChild('paginator') paginator: MatPaginator;
    public riders = [];
    public paginationParameters = PAGINATION_PARAMETERS;
    public pageIndex = 0;
    public totalRiders = 0;
    public searchForm: FormGroup;
    public isSearchDisabled = false;
    public searchString = '';
    public displayedColumns = ['firstName', 'lastName', 'email', 'action'];

    private params: RequestParams;

    constructor(private formBuilder: FormBuilder,
                private ridersService: RidersService) {
        this.params = new RequestParams({isVerified: false});
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
        this.ridersService.getList(this.params)
            .subscribe((result) => {
                this.riders = result.data;
                this.totalRiders = result.pagination.totalCount;
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
