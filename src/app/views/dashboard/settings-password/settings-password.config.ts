import { Validators } from '@angular/forms';

const passValidation = ['', [
    Validators.required,
    Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/),
    Validators.minLength(6),
    Validators.maxLength(50)
]];
const errorText = {
    required: 'This field is mandatory',
    pattern: 'Password should contain at least one letter and one digit',
    minlength: 'Password should be from 6 to 50 characters',
    maxlength: 'Password should be from 6 to 50 characters'
};

export const CHANGE_PASSWORD_VALIDATION = {
    password: passValidation,
    newPassword: passValidation,
    confirmPassword: passValidation,
};

export const CHANGE_PASSWORD_ERRORS: any = {
    password: errorText,
    newPassword: errorText,
    confirmPassword: { matchPassword: `Confirm password doesn't match`},
};


