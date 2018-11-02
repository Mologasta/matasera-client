import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public notificationOptions = {
        position: ['top', 'right'],
        timeOut: 3000,
        pauseOnHover: true,
        clickToClose: true,
        showProgressBar: false
    };
}
