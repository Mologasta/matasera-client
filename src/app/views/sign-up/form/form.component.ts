import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { SessionService } from '../../../services/session.service';
import { SIGNUP_FORM_CONTROLS, SIGNUP_FORM_ERRORS } from './form.configs';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class SignUpComponent implements OnInit {
    public signUpForm: FormGroup;

    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private router: Router,
        private sessionService: SessionService) {
    }

    ngOnInit() {
        this.initForm();
    }

    private initForm(): void {
        this.signUpForm = this.formBuilder.group(SIGNUP_FORM_CONTROLS);
    }

    public signUp(): void {
        if (this.signUpForm.valid) {
            const formValues = this.signUpForm.value;

            this.authService.signUp(formValues)
                .subscribe(
                    (response) => {
                        this.sessionService.startSession(response);
                        this.sessionService.addCurrentUserInfo(response.profile);
                        this.router.navigate(['/']);
                    },
                    () => {
                        // do nothing
                    }
                );
        }
    }

    public getErrorMessage(fieldName: string): string {
        const controlErrors = this.signUpForm.controls[fieldName].errors;
        let errorText = 'error';
        Object.keys(controlErrors).forEach((error) => {
            if (error) {
                return errorText = this.obtainErrorText(fieldName, error);
            }
        });
        return errorText;
    }

    private obtainErrorText(fieldName: string, errorName: string): string {
        return SIGNUP_FORM_ERRORS[fieldName][errorName];
    }
}
