import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Injectable()
export class NotifierService {

    constructor(private notificationService: NotificationsService) {
    }

    public error(message: string): void {
        this.notificationService.error('Error', message);
    }

    public success(message: string): void {
        this.notificationService.success('Success', message);
    }

}
