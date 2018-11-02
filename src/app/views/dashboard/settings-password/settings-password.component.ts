import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CHANGE_PASSWORD_ERRORS, CHANGE_PASSWORD_VALIDATION } from './settings-password.config';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminsService } from '../../../services/admins.service';
import { NotificationsService} from 'angular2-notifications';
import { Validation } from '../../../helpers/validation';

@Component({
    selector: 'app-settings-password',
    templateUrl: './settings-password.component.html',
    styleUrls: ['./settings-password.component.scss', '../dashboard-shared.scss']
})
export class SettingsPasswordComponent implements OnInit {
    public changePasswordForm: FormGroup;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private notifierService: NotificationsService,
        private adminService: AdminsService) {
    }

    public getErrorMessage(fieldName: string): string {
        const controlErrors = this.changePasswordForm.controls[fieldName].errors;
        let errorText = 'error';
        Object.keys(controlErrors).forEach((error) => {
            if (error) {
                return errorText = this.obtainErrorText(fieldName, error);
            }
        });
        return errorText;
    }

    public cancel(): void {
        this.markFormGroupTouched(this.changePasswordForm);
        this.changePasswordForm.reset();
        this.router.navigate(['/settings']);
    }

    public save(): void {
        this.adminService.changePassword(
            {
                password: this.changePasswordForm.controls['password'].value,
                newPassword: this.changePasswordForm.controls['newPassword'].value
            })
            .subscribe(() => {
                this.changePasswordForm.reset();
                this.markFormGroupTouched(this.changePasswordForm);
                this.notifierService.success('Password was successfully changed');
                this.router.navigate(['/settings']);
            });
    }

    ngOnInit() {
        this.initForm();
    }

    private initForm(): void {
        this.changePasswordForm = this.formBuilder.group(CHANGE_PASSWORD_VALIDATION, { validator: Validation.matchPassword });
    }

    private obtainErrorText(fieldName: string, errorName: string): string {
        return CHANGE_PASSWORD_ERRORS[fieldName][errorName];
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
