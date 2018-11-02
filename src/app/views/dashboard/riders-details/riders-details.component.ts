import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { RidersService } from '../../../services/riders.service';
import { Rider } from '../../../classes/rider';
import { NotifierService } from '../../../services/notifier.service';
import { RiderCharacteristics } from '../../../enums/rider-characteristics.enum';
import { RiderSmoking } from '../../../enums/rider-smoking.enum';
import { RiderTaxis } from '../../../enums/rider-taxis.enum';
import { UserStates } from '../../../enums/user-states.enum';
import { ConfirmationDialogComponent } from '../../../components/modals/confirmation-dialog/confirmation-dialog.component';

@Component({
    selector: 'app-riders-details',
    templateUrl: './riders-details.component.html',
    styleUrls: ['./riders-details.component.scss', '../dashboard-shared.scss']
})
export class RidersDetailsComponent {
    public riderCharacteristics = RiderCharacteristics;
    public riderSmoking = RiderSmoking;
    public riderTaxis = RiderTaxis;
    public rider: Rider;
    public userStates = UserStates;
    public avatarPlaceholder = 'assets/img/avatar-placeholder.png';

    constructor(private ridersService: RidersService,
                private activatedRoute: ActivatedRoute,
                private notifierService: NotifierService,
                private matDialog: MatDialog,
                private router: Router) {
        this.activatedRoute.data.subscribe(({rider}) => {
            this.rider = rider;
        });
    }

    public isDefinedCharachteristic(pref: RiderCharacteristics): boolean {
        return this.rider.characteristics === pref;
    }

    public onAcceptClick(): void {
        if (this.rider) {
            this.ridersService.verifyOne(this.rider.id)
                .subscribe(
                    (response) => {
                        this.router.navigate(['/']);
                    });
        }
    }

    public onBlockClick(): void {
        const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
            width: '250px',
            data: {
                title: `Block rider's account`,
                message: `Are you sure that you want to block this Rider?`
            }
        });

        dialogRef
            .afterClosed()
            .subscribe(
                (confirmResult: boolean) => {
                    if (confirmResult) {
                        this.blockRider(
                            this.rider.id,
                            `User ${this.rider.firstName} ${this.rider.lastName} was blocked!`,
                            ['/riders']
                        );
                    }
                }
            );
    }

    public onUnblockClick(): void {
        const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
            width: '250px',
            data: {
                title: `Unblock rider's account`,
                message: `Are you sure that you want to unblock this Rider?`
            }
        });

        dialogRef
            .afterClosed()
            .subscribe(
                (confirmResult: boolean) => {
                    if (confirmResult) {
                        this.unblockRider(
                            this.rider.id,
                            `User ${this.rider.firstName} ${this.rider.lastName} was unblocked!`,
                            ['/riders']
                        );
                    }
                }
            );
    }

    public onDeleteClick(): void {
        const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
            width: '250px',
            data: {
                title: `Delete rider's account`,
                message: `Remove riders's account?`
            }
        });

        dialogRef
            .afterClosed()
            .subscribe(
            (confirmResult: boolean) => {
                if (confirmResult) {
                    this.deleteRider(
                        this.rider.id,
                        `User ${this.rider.firstName} ${this.rider.lastName} was deleted!`,
                        ['/riders']
                    );
                }
            }
        );
    }

    public onDeclineClick(): void {
        const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
            width: '250px',
            data: {
                title: `Decline rider's request`,
                message: `Remove rider's account?`
            }
        });

        dialogRef.afterClosed().subscribe(
            (confirmResult: boolean) => {
                if (confirmResult) {
                    this.ridersService.deleteOne(this.rider.id)
                        .subscribe(() => {
                            // here is empty response
                            this.notifierService
                                .success(`User ${this.rider.firstName} ${this.rider.lastName} was deleted!`);
                            this.router.navigate(['/']);
                        });
                }
            }
        );
    }

    private deleteRider(riderId: number, message: string, navigate: (string | number)[]): void {
        this.ridersService.deleteOne(riderId)
            .subscribe(() => {
                // here is empty response
                this.notifierService
                    .success(message);
                this.router.navigate(navigate);
            });
    }

    private blockRider(riderId: number, message: string, navigate: (string | number)[]): void {
        this.ridersService.blockOne(riderId)
            .subscribe(() => {
                // here is empty response
                this.notifierService
                    .success(message);
                this.router.navigate(navigate);
            });
    }

    private unblockRider(riderId: number, message: string, navigate: (string | number)[]): void {
        this.ridersService.unblockOne(riderId)
            .subscribe(() => {
                // here is empty response
                this.notifierService
                    .success(message);
                this.router.navigate(navigate);
            });
    }
}
