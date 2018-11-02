import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { RidersRequestsComponent } from './riders-requests/riders-requests.component';
import { DriversRequestsComponent } from './drivers-requests/drivers-requests.component';
import { RidersDetailsComponent } from './riders-details/riders-details.component';
import { RiderResolver } from '../../resolvers/rider.resolver';
import { DriversDetailsComponent } from './drivers-details/drivers-details.component';
import { DriverResolver } from '../../resolvers/driver.resolver';
import { DriversListComponent } from './drivers-list/drivers-list.component';
import { RidersListComponent } from './riders-list/riders-list.component';
import { FaresManagementComponent } from './fares-management/fares-management.component';
import { SettingsComponent } from './settings/settings.component';
import { SettingsPasswordComponent } from './settings-password/settings-password.component';
import { RequestsListComponent } from './requests-list/requests-list.component';
import {RequestResolver} from '../../resolvers/request.resolver';
import {RequestsDetailsComponent} from './requests-details/riders-details.component';
import {DriverRidesHistoryComponent} from './drivers-details/rides-history/drivers-rides-history.component';
import {RideDetailsComponent} from './drivers-details/ride-details/ride-details.component';
import {RideResolver} from '../../resolvers/ride.resolver';

export const DashboardRouter: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            {
                path: '',
                redirectTo: 'riders/requests',
                pathMatch: 'full'
            },
            {
                path: 'riders/requests',
                component: RidersRequestsComponent
            },
            {
                path: 'riders/update-requests',
                component: RequestsListComponent
            },
            {
                path: 'drivers/requests',
                component: DriversRequestsComponent
            },
            {
                path: 'riders',
                component: RidersListComponent
            },
            {
                path: 'drivers',
                component: DriversListComponent
            },
            {
                path: 'settings',
                component: SettingsComponent
            },
            {
                path: 'settings/password',
                component: SettingsPasswordComponent
            },
            {
                path: 'fares/management',
                component: FaresManagementComponent
            },
            {
                path: 'riders/:id',
                component: RidersDetailsComponent,
                resolve: {
                    rider: RiderResolver
                }
            },
            {
                path: 'riders/update-requests/:id',
                component: RequestsDetailsComponent,
                resolve: {
                    request: RequestResolver
                }
            },
            {
                path: 'drivers/:id',
                component: DriversDetailsComponent,
                resolve: {
                    driver: DriverResolver
                }
            },
            {
                path: 'drivers/:id/rides',
                component: DriverRidesHistoryComponent,
                resolve: {
                    driver: DriverResolver
                },
            },
            {
                path: 'drivers/:id/rides/:rideId',
                component: RideDetailsComponent,
                resolve: {
                    ride: RideResolver,
                },
            }
        ]
    }
];
