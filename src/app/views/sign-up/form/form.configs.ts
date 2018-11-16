import { Validators } from '@angular/forms';

export const SIGNUP_FORM_CONTROLS: any = {
    email: ['', [
        Validators.required,
        Validators.email
    ]],
    firstName: ['', [
        Validators.required,
        Validators.pattern(/^[A-Z][A-Za-z\s-]*$/),
    ]],
    lastName: ['', [
        Validators.required,
        Validators.pattern(/^[A-Z][A-Za-z\s-]*$/),
    ]],
    password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/),
    ]]
};

export const SIGNUP_FORM_ERRORS: any = {
    email: {
        required: 'Email address field is empty',
        email: 'Email address is incorrect'
    },
    password: {
        required: 'Password field is empty',
        pattern: 'Password is incorrect'
    },
    firstName: {
        required: 'First name field is empty',
        pattern: 'First name is incorrect'
    },
    lastName: {
        required: 'Last name field is empty',
        pattern: 'Last name is incorrect'
    }

};
