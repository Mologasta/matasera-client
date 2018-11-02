import { Validators } from '@angular/forms';

export const DRIVER_FORM_GROUP: any = {
    driversLicenceExpDate: ['', [
        Validators.required
    ]],
    paramedicLicenceExpDate: ['', [
        Validators.required
    ]],
    vehicleRegistrationExpDate: ['', [
        Validators.required
    ]],
    model: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9\s]+$/),
        Validators.minLength(1),
        Validators.maxLength(30)
    ]],
    licencePlate: ['', [
        Validators.required,
        Validators.pattern(/^[A-Z0-9]+$/),
        Validators.minLength(8),
        Validators.maxLength(8)
    ]],
    numberOfSeats: ['', [
        Validators.required,
        Validators.min(1),
        Validators.max(10),
        Validators.pattern(/^[0-9]+$/)
    ]],
    standard: [false],
    canDriveChildren: [false],
    drivePassengersWithNeeds: [false],
    electricWheelChair: [false],
    foldingWheelChair: [false],
    needSomeAssistance: [false],
    placeForLuggage: [false],
    pets: [false],
    taxi: [false],
    babyChair: [false],
    smoking: [false]
};

export const DRIVER_SHORTENED_FORM_GROUP: any = {
    driversLicenceExpDate: ['', [
        Validators.required
    ]],
    paramedicLicenceExpDate: ['', [
        Validators.required
    ]],
    vehicleRegistrationExpDate: ['', [
        Validators.required
    ]],
    standard: [false],
    canDriveChildren: [false],
    drivePassengersWithNeeds: [false],
    electricWheelChair: [false],
    foldingWheelChair: [false],
    needSomeAssistance: [false],
    placeForLuggage: [false],
    pets: [false],
    taxi: [false],
    babyChair: [false],
    smoking: [false]
};

export const DRIVER_FORM_ERRORS: any = {
    driversLicenceExpDate: {
        required: 'This field is mandatory',
        matDatepickerParse: 'Wrong date format',
        matDatepickerMin: 'Should not be the current date or earlier'
    },
    paramedicLicenceExpDate: {
        required: 'This field is mandatory',
        matDatepickerParse: 'Wrong date format',
        matDatepickerMin: 'Should not be the current date or earlier'
    },
    vehicleRegistrationExpDate: {
        required: 'This field is mandatory',
        matDatepickerParse: 'Wrong date format',
        matDatepickerMin: 'Should not be the current date or earlier'
    },
    model: {
        required: 'This field is mandatory',
        pattern: 'Wrong make and model of a car format',
        minlength: 'Must be between 1 and 30 symbols',
        maxlength: 'Must be between 1 and 30 symbols'
    },
    licencePlate: {
        required: 'This field is mandatory',
        pattern: 'Only latin capital letters and digits',
        minlength: 'Only latin capital letters and digits',
        maxlength: 'Only latin capital letters and digits'
    },
    numberOfSeats: {
        required: 'This field is mandatory',
        pattern: 'Must be a number',
        min: 'Value must be between 1 and 10',
        max: 'Value must be between 1 and 10',
    },
    standard: {},
    canDriveChildren: {},
    drivePassengersWithNeeds: {},
    electricWheelChair: {},
    foldingWheelChair: {},
    needSomeAssistance: {},
    placeForLuggage: {},
    pets: {},
    taxi: {},
    babyChair: {},
};

