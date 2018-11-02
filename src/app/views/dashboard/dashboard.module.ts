import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule, MatButtonToggleModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSortModule,
    MatTableModule,
    MatSelectModule,
    MatToolbarModule
} from '@angular/material';
import { MediaMatcher } from '@angular/cdk/layout';

import { DashboardComponent } from './dashboard.component';
import { DashboardRouter } from './dashboard.router';
import { RidersRequestsComponent } from './riders-requests/riders-requests.component';
import { DriversRequestsComponent } from './drivers-requests/drivers-requests.component';
import { RouteWrapModule } from '../../components/route-wrap/route-wrap.module';
import { RidersService } from '../../services/riders.service';
import { DriversService } from '../../services/drivers.service';
import { RidersDetailsComponent } from './riders-details/riders-details.component';
import { ModalsModule } from '../../components/modals/modals.module';
import { RiderResolver } from '../../resolvers/rider.resolver';
import { DriversDetailsComponent } from './drivers-details/drivers-details.component';
import { DriverResolver } from '../../resolvers/driver.resolver';
import { DriversListComponent } from './drivers-list/drivers-list.component';
import { RidersListComponent } from './riders-list/riders-list.component';
import { FaresManagementComponent } from './fares-management/fares-management.component';
import { FaresManagementService } from '../../services/fares-management.service';
import { SettingsComponent } from './settings/settings.component';
import { AdminsService } from '../../services/admins.service';
import { SettingsPasswordComponent } from './settings-password/settings-password.component';
import { RequestsListComponent } from './requests-list/requests-list.component';
import {RequestsService} from '../../services/requests.service';
import {RequestsDetailsComponent} from './requests-details/riders-details.component';
import {RequestResolver} from '../../resolvers/request.resolver';
import {DriverRidesHistoryComponent} from './drivers-details/rides-history/drivers-rides-history.component';
import {RidesService} from '../../services/rides.service';
import {RideStatesPipe} from '../../pipes/ride.states.pipe';
import {RideDetailsComponent} from './drivers-details/ride-details/ride-details.component';
import {DistancePipe} from '../../pipes/distance.pipe';
import {DurationPipe} from '../../pipes/duration.pipe';
import {RideResolver} from '../../resolvers/ride.resolver';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(DashboardRouter),
        MatIconModule,
        MatSidenavModule,
        MatMenuModule,
        MatButtonModule,
        MatListModule,
        MatToolbarModule,
        MatTableModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatCardModule,
        MatSortModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonToggleModule,
        ModalsModule,
        RouteWrapModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        DashboardComponent,
        RidersRequestsComponent,
        DriversRequestsComponent,
        RidersDetailsComponent,
        DriversDetailsComponent,
        DriversListComponent,
        RidersListComponent,
        RequestsListComponent,
        RequestsDetailsComponent,
        FaresManagementComponent,
        SettingsComponent,
        RidersListComponent,
        SettingsPasswordComponent,
        DriverRidesHistoryComponent,
        RideDetailsComponent,
        RideStatesPipe,
        DistancePipe,
        DurationPipe,
    ],
    providers: [
        MediaMatcher,
        RidersService,
        RequestsService,
        DriversService,
        FaresManagementService,
        AdminsService,
        RidesService,
        RiderResolver,
        RequestResolver,
        DriverResolver,
        RideResolver,
    ]
})
export class DashboardModule {
}
