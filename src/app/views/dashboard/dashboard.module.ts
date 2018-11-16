import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatSortModule,
    MatTableModule,
    MatSelectModule,
    MatToolbarModule
} from '@angular/material';
import { MediaMatcher } from '@angular/cdk/layout';

import { DashboardComponent } from './dashboard.component';
import { DashboardRouter } from './dashboard.router';
import { RouteWrapModule } from '../../components/route-wrap/route-wrap.module';
import { ModalsModule } from '../../components/modals/modals.module';
import { UsersService } from '../../services/users.service';
import { MapComponent } from './map/map.component';
import { environment } from '../../../environments/environment';
import { AgmCoreModule } from '@agm/core';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(DashboardRouter),
        AgmCoreModule.forRoot({
            apiKey: environment.GOOGLE_API_KEY,
            libraries: ["places"]
        }),
        ModalsModule,
        MatIconModule,
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
        RouteWrapModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        DashboardComponent,
        MapComponent,
    ],
    providers: [
        MediaMatcher,
        UsersService,
    ]
})
export class DashboardModule {
}
