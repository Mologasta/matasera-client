import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { MapComponent } from './map/map.component';

export const DashboardRouter: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            {
                path: '',
                redirectTo: 'map',
                pathMatch: 'full'
            },
            {
                path: 'map',
                component: MapComponent,
            }
        ]
    },

];
