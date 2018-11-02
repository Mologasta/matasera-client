import {Validators, AbstractControl} from '@angular/forms';

export const FARE_VALIDATION = {
    cancellationFee: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]+\.?([0-9]{1,2})?$/),
        allowZero,
    ]],
};

export const FARE_FORM_ERRORS: any = {
    cancellationFee: {
        required: 'This field is mandatory',
        pattern: 'Invalid value',
        validValue: 'Value must be 0 or greater then 0.50',
    },
};

function allowZero(control: AbstractControl) {
    if (+control.value < 0.5 && +control.value !== 0) {
        return { validValue: true };
    }

    return null;
}

