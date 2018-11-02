import { Validators } from '@angular/forms';

export const SIGNIN_FORM_CONTROLS: any = {
    email: ['', [
        Validators.required,
        Validators.email
    ]],
    password: ['', [
        Validators.required
    ]]
};

export const SIGNIN_FORM_ERRORS: any = {
    email: {
        required: 'Email address field is empty',
        email: 'Email address is incorrect'
    },
    password: {
        required: 'Password field is empty'
    }
};
