import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-route-wrap',
    templateUrl: './route-wrap.component.html',
    styleUrls: ['./route-wrap.component.scss']
})
export class RouteWrapComponent implements OnInit {
    @Input() cardView = true;

    constructor() {
    }

    ngOnInit() {
    }

}
