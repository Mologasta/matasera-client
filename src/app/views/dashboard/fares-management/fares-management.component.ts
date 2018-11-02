import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FaresManagementService } from '../../../services/fares-management.service';
import { Fare } from '../../../classes/fare';
import { FARE_VALIDATION, FARE_FORM_ERRORS } from './fares-management.config';
import { NotifierService } from '../../../services/notifier.service';

@Component({
    selector: 'app-fares-management',
    templateUrl: './fares-management.component.html',
    styleUrls: ['./fares-management.component.scss', '../dashboard-shared.scss']
})
export class FaresManagementComponent implements OnInit {
    public faresForm: FormGroup;
    public fare: Fare;

    constructor(
        private formBuilder: FormBuilder,
        private faresManagementService: FaresManagementService,
        private notifierService: NotifierService
    ) {
        }

    public onSaveClick() {
        this.faresManagementService
            .update({ cancellationFee: Math.round(this.faresForm.value.cancellationFee * 100) })
            .subscribe( fare => {
                this.fare.cancellationFee = fare.cancellationFee;
                this.notifierService.success(`Saved!`);
            });
    }

    public getErrorMessage(fieldName: string): string {
        const controlErrors = this.faresForm.controls[fieldName].errors;
        let errorText = 'error';
        Object.keys(controlErrors).forEach((error) => {
            if (error) {
                return errorText = this.obtainErrorText(fieldName, error);
            }
        });
        return errorText;
    }

    private obtainErrorText(fieldName: string, errorName: string): string {
        return FARE_FORM_ERRORS[fieldName][errorName];
    }

    ngOnInit() {
        this.initForm();
        this.faresManagementService
            .get()
            .subscribe( fare => {
                this.fare = fare;
        });
    }

    private initForm(): void {
        this.faresForm = this.formBuilder.group(FARE_VALIDATION);
    }
}
