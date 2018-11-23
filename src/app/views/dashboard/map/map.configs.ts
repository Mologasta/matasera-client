import { Validators } from '@angular/forms';

export const MAP_FORM_CONTROLS: any = {
    distance: [50, [
        Validators.required,
        Validators.min(1),
        Validators.max(400)
    ]],
};

export const MAP_FORM_ERRORS: any = {
    distance: {
        required: 'Field is required',
        max: 'Value must be between 1 and 400',
        min: 'Value must be between 1 and 400',
    }
};
