import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material';

import { RouteWrapComponent } from './route-wrap.component';

@NgModule({
    imports: [
        CommonModule,
        MatCardModule
    ],
    declarations: [
        RouteWrapComponent
    ],
    exports: [
        RouteWrapComponent
    ]
})
export class RouteWrapModule {
}
