import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { Driver } from '../../../classes/driver';
import { DriversService } from '../../../services/drivers.service';
import { DriverDetails } from '../../../interfaces/driver-details.interface';
import { ConfirmationDialogComponent } from '../../../components/modals/confirmation-dialog/confirmation-dialog.component';
import { NotifierService } from '../../../services/notifier.service';
import { DRIVER_FORM_ERRORS, DRIVER_FORM_GROUP, DRIVER_SHORTENED_FORM_GROUP } from './drivers-detail.config';
import { formatDate } from '../../../helpers/format-date';
import { UserStates } from '../../../enums/user-states.enum';

@Component({
    selector: 'app-drivers-details',
    templateUrl: './drivers-details.component.html',
    styleUrls: ['./drivers-details.component.scss', '../dashboard-shared.scss']
})
export class DriversDetailsComponent implements OnInit {
    public driver: Driver;
    public userStates = UserStates;
    public avatarPlaceholder = 'assets/img/avatar-placeholder.png';
    public driverForm: FormGroup;
    public minDate = new Date();

    private driverDetails: DriverDetails;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private formBuilder: FormBuilder,
                private driversService: DriversService,
                private notifierService: NotifierService,
                private matDialog: MatDialog) {
        const today = new Date();
        this.minDate.setDate(today.getDate() + 1);
        this.activatedRoute.data.subscribe(({driver}) => {
            this.driver = driver;
            // if driver is verified and driver detail are exists
            if (driver.isVerified && driver.driverDetail) {
                this.driverDetails = driver.driverDetail;
            }
        });
    }

    ngOnInit() {
        this.initForm();
    }

    private initForm(): void {
        this.driverForm = this.driver.isVerified
            ? this.formBuilder.group(DRIVER_SHORTENED_FORM_GROUP)
            : this.formBuilder.group(DRIVER_FORM_GROUP);
        // if driver details exists - fill the form with existing values
        (<any>Object).keys(this.driver).forEach((key) => {
            if (this.driverForm.controls[key]) {
                this.driverForm.controls[key].patchValue(this.driver[key]);
            }
        });
        if (this.driverDetails) {
            (<any>Object).keys(this.driverDetails).forEach((key) => {
                if (this.driverForm.controls[key]) {
                    this.driverForm.controls[key].patchValue(this.driverDetails[key]);
                }
            });
        }
    }

    public onAcceptClick(): void {
        this.markFormGroupTouched(this.driverForm);
        if (this.driverForm.valid) {
            const formValues = this.driverForm.value;
            const data: any = {
                driversLicenceExpDate: formatDate(formValues.driversLicenceExpDate),
                paramedicLicenceExpDate: formatDate(formValues.paramedicLicenceExpDate),
                vehicleRegistrationExpDate: formatDate(formValues.vehicleRegistrationExpDate),
                model: formValues.model,
                licencePlate: formValues.licencePlate,
                numberOfSeats: formValues.numberOfSeats,
                placeForLuggage: formValues.placeForLuggage,
                pets: formValues.pets,
                taxi: false,
                babyChair: formValues.babyChair,
                smoking: formValues.smoking,
                standard: formValues.standard,
                canDriveChildren: formValues.canDriveChildren,
                drivePassengersWithNeeds: formValues.drivePassengersWithNeeds,
                electricWheelChair: formValues.electricWheelChair,
                foldingWheelChair: formValues.foldingWheelChair,
                needSomeAssistance: formValues.needSomeAssistance,
            };
            this.driversService.editAndVerifyOne(this.driver.id, data)
                .subscribe((response) => {
                    this.notifierService
                        .success(`User ${response.firstName} ${response.lastName} was approved!`);
                    this.router.navigate(['/drivers', 'requests']);
                });
        }
    }

    public onSaveClick(): void {
        this.markFormGroupTouched(this.driverForm);
        if (this.driverForm.valid) {
            const formValues = this.driverForm.value;
            const data: DriverDetails = {
                driversLicenceExpDate: formatDate(formValues.driversLicenceExpDate),
                paramedicLicenceExpDate: formatDate(formValues.paramedicLicenceExpDate),
                vehicleRegistrationExpDate: formatDate(formValues.vehicleRegistrationExpDate),
                placeForLuggage: formValues.placeForLuggage,
                pets: formValues.pets,
                taxi: formValues.taxi,
                smoking: formValues.smoking,
                babyChair: formValues.babyChair,
            };
            this.driversService.editOne(this.driver.id, data)
                .subscribe((response) => {
                    this.notifierService
                        .success(`User ${response.firstName} ${response.lastName} was edited!`);
                    this.router.navigate(['/drivers']);
                });
        }
    }

    public onDeclineClick(): void {
        const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
            width: '250px',
            data: {
                title: `Decline driver's request`,
                message: `Remove driver's account?`
            }
        });

        dialogRef.afterClosed().subscribe(
            (confirmResult: boolean) => {
                if (confirmResult) {
                    this.deleteDriver(
                        this.driver.id,
                        `User ${this.driver.firstName} ${this.driver.lastName} was deleted!`,
                        ['/drivers', 'requests']
                    );
                }
            }
        );
    }

    public onDeleteClick(): void {
        const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
            width: '250px',
            data: {
                title: `Delete driver's account`,
                message: `Remove driver's account?`
            }
        });

        dialogRef.afterClosed().subscribe(
            (confirmResult: boolean) => {
                if (confirmResult) {
                    this.deleteDriver(
                        this.driver.id,
                        `User ${this.driver.firstName} ${this.driver.lastName} was deleted!`,
                        ['/drivers']
                    );
                }
            }
        );
    }

    public onBlockClick(): void {
        const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
            width: '250px',
            data: {
                title: `Block driver's account`,
                message: `Are you sure that you want to block this Driver?`
            }
        });

        dialogRef
            .afterClosed()
            .subscribe(
                (confirmResult: boolean) => {
                    if (confirmResult) {
                        this.blockDriver(
                            this.driver.id,
                            `User ${this.driver.firstName} ${this.driver.lastName} was blocked!`,
                            ['/drivers']
                        );
                    }
                }
            );
    }

    public onUnblockClick(): void {
        const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
            width: '250px',
            data: {
                title: `Unblock driver's account`,
                message: `Are you sure that you want to unblock this Driver?`
            }
        });

        dialogRef
            .afterClosed()
            .subscribe(
                (confirmResult: boolean) => {
                    if (confirmResult) {
                        this.unblockDriver(
                            this.driver.id,
                            `User ${this.driver.firstName} ${this.driver.lastName} was unblocked!`,
                            ['/drivers']
                        );
                    }
                }
            );
    }


    public getErrorMessage(fieldName: string): string {
        const controlErrors = this.driverForm.controls[fieldName].errors;
        let errorText = 'error';
        Object.keys(controlErrors).forEach((error) => {
            if (error) {
                return errorText = this.obtainErrorText(fieldName, error);
            }
        });
        return errorText;
    }

    public onStandardChange(): void {
        this.driver.standard = !this.driver.standard;

        if (this.driver.standard) {
            this.driverForm.controls['electricWheelChair'].patchValue(false);
            this.driverForm.controls['foldingWheelChair'].patchValue(false);
            this.driverForm.controls['drivePassengersWithNeeds'].patchValue(false);
        }
        if (!this.driver.standard) {
            this.driverForm.controls['canDriveChildren'].patchValue(false);
            this.driverForm.controls['needSomeAssistance'].patchValue(false);
        }
    }

    private deleteDriver(driverId: number, message: string, navigate: (string | number)[]): void {
        this.driversService.deleteOne(driverId)
            .subscribe(() => {
                // here is empty response
                this.notifierService
                    .success(message);
                this.router.navigate(navigate);
            });
    }

    private blockDriver(riderId: number, message: string, navigate: (string | number)[]): void {
        this.driversService.blockOne(riderId)
            .subscribe(() => {
                // here is empty response
                this.notifierService
                    .success(message);
                this.router.navigate(navigate);
            });
    }

    private unblockDriver(riderId: number, message: string, navigate: (string | number)[]): void {
        this.driversService.unblockOne(riderId)
            .subscribe(() => {
                // here is empty response
                this.notifierService
                    .success(message);
                this.router.navigate(navigate);
            });
    }

    private obtainErrorText(fieldName: string, errorName: string): string {
        return DRIVER_FORM_ERRORS[fieldName][errorName];
    }

    private markFormGroupTouched(formGroup: FormGroup) {
        (<any>Object).values(formGroup.controls).forEach(control => {
            control.markAsTouched();

            if (control.controls) {
                control.controls.forEach(c => this.markFormGroupTouched(c));
            }
        });
    }

}
