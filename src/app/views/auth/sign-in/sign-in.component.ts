import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { Credentials } from '../../../interfaces/credentials.interface';
import { SessionService } from '../../../services/session.service';
import { SIGNIN_FORM_CONTROLS, SIGNIN_FORM_ERRORS } from './sign-in.configs';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
    public signInForm: FormGroup;

    constructor(private authService: AuthService,
                private formBuilder: FormBuilder,
                private router: Router,
                private sessionService: SessionService) {
    }

    ngOnInit() {
        this.initForm();
    }

    private initForm(): void {
        this.signInForm = this.formBuilder.group(SIGNIN_FORM_CONTROLS);
    }

    public signIn(): void {
        if (this.signInForm.valid) {
            const formValues = this.signInForm.value;
            const credentials: Credentials = {
                email: formValues.email,
                password: formValues.password
            };

            this.authService.signIn(credentials)
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

    public signUp() {
        this.router.navigate(['sign-up'])
    }

    public getErrorMessage(fieldName: string): string {
        const controlErrors = this.signInForm.controls[fieldName].errors;
        let errorText = 'error';
        Object.keys(controlErrors).forEach((error) => {
            if (error) {
                return errorText = this.obtainErrorText(fieldName, error);
            }
        });
        return errorText;
    }

    private obtainErrorText(fieldName: string, errorName: string): string {
        return SIGNIN_FORM_ERRORS[fieldName][errorName];
    }
}
