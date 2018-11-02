import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RequestParams } from '../../../classes/request-params';
import {MatPaginator, MatSort, PageEvent} from '@angular/material';
import { DriversService } from '../../../services/drivers.service';
import { PAGINATION_PARAMETERS, QUALIFICATION_GROUPS } from '../../../app.constants';

@Component({
    selector: 'app-drivers-list',
    templateUrl: './drivers-list.component.html',
    styleUrls: ['./drivers-list.component.scss', '../dashboard-shared.scss']
})
export class DriversListComponent implements OnInit {
    @ViewChild('paginator') paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    public drivers = [];
    public paginationParameters = PAGINATION_PARAMETERS;
    public pageIndex = 0;
    public totalDrivers = 0;
    public searchForm: FormGroup;
    public isSearchDisabled = false;
    public searchString = '';
    public displayedColumns = ['firstName', 'lastName', 'email', 'number', 'action'];
    public isBlocked = false;
    public qualificationGroups = QUALIFICATION_GROUPS;

    private params: RequestParams;

    constructor(private formBuilder: FormBuilder,
                private driversService: DriversService) {
        this.params = new RequestParams({isVerified: true});
    }

    ngOnInit() {
        this.initForm();
        this.getList();
    }

    private initForm(): void {
        this.searchForm = this.formBuilder.group({
            searchString: '',
            driverQualification: '',
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
        this.driversService.getList(this.params)
            .subscribe((result) => {
                this.drivers = result.data;
                this.totalDrivers = result.pagination.totalCount;
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

    public selectQualification(): void {
        this.params.qualification = this.searchForm.value.driverQualification;
        this.getList(this.searchString);
    }
}
