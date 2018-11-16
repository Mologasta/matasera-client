import {Component} from '@angular/core';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent {
    coords = { lat: 49.9935, long: 36.2303 };

    constructor() {
    }
}
