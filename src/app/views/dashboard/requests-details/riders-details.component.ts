import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { RequestsService } from '../../../services/requests.service';
import { UpdateRequest } from '../../../classes/request';
import { NotifierService } from '../../../services/notifier.service';
import { RiderCharacteristics } from '../../../enums/rider-characteristics.enum';
import { RiderSmoking } from '../../../enums/rider-smoking.enum';
import { RiderTaxis } from '../../../enums/rider-taxis.enum';
import { UserStates } from '../../../enums/user-states.enum';
import { ConfirmationDialogComponent } from '../../../components/modals/confirmation-dialog/confirmation-dialog.component';
import {Rider} from '../../../classes/rider';

@Component({
    selector: 'app-riders-details',
    templateUrl: './riders-details.component.html',
    styleUrls: ['./riders-details.component.scss', '../dashboard-shared.scss']
})
export class RequestsDetailsComponent {
    public riderCharacteristics = RiderCharacteristics;
    public riderSmoking = RiderSmoking;
    public riderTaxis = RiderTaxis;
    public request: UpdateRequest;

    constructor(private requestsService: RequestsService,
                private activatedRoute: ActivatedRoute,
                private notifierService: NotifierService,
                private matDialog: MatDialog,
                private router: Router) {
        this.activatedRoute.data.subscribe(({request}) => {
            this.request = request;
        });
    }

    public isDefinedCharacteristic(source: UpdateRequest|Rider, pref: RiderCharacteristics): boolean {
        return source.characteristics === pref;
    }

    public onAcceptClick(): void {
        if (this.request) {
            const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
                width: '250px',
                data: {
                    title: `Accept rider's request`,
                    message: `Are you sure that you want to accept this Rider's request?`
                }
            });

            dialogRef
                .afterClosed()
                .subscribe(
                    (confirmResult: boolean) => {
                        if (confirmResult) {
                            this.acceptRequest(
                                this.request.id,
                                `Rider's request was accepted!`,
                                ['/riders', 'update-requests']
                            );
                        }
                    }
                );
        }
    }

    public onRejectClick(): void {
        if (this.request) {
            const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
                width: '250px',
                data: {
                    title: `Reject rider's request`,
                    message: `Are you sure that you want to reject this Rider's request?`
                }
            });

            dialogRef
                .afterClosed()
                .subscribe(
                    (confirmResult: boolean) => {
                        if (confirmResult) {
                            this.rejectRequest(
                                this.request.id,
                                `Rider's request was rejected!`,
                                ['/riders', 'update-requests']
                            );
                        }
                    }
                );
        }
    }

    private rejectRequest(requestId: number, message: string, navigate: (string | number)[]): void {
        this.requestsService.rejectOne(requestId)
            .subscribe(() => {
                // here is empty response
                this.notifierService
                    .success(message);
                this.router.navigate(navigate);
            });
    }

    private acceptRequest(requestId: number, message: string, navigate: (string | number)[]): void {
        this.requestsService.acceptOne(requestId)
            .subscribe(() => {
                // here is empty response
                this.notifierService
                    .success(message);
                this.router.navigate(navigate);
            });
    }
}
