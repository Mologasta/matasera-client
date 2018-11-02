export interface DriverDetails {
    id?: number;
    driversLicenceExpDate: string;
    paramedicLicenceExpDate: string;
    vehicleRegistrationExpDate: string;
    model?: string;
    licencePlate?: string;
    numberOfSeats?: number;
    placeForLuggage: boolean;
    pets: boolean;
    taxi: boolean;
    smoking: boolean;
    babyChair: boolean;
    createdAt?: string;
    updatedAt?: string;
}
