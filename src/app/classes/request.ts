import { Rider } from './rider';

export class UpdateRequest {
    id: number;
    isAdult: boolean;
    characteristics: number;
    smokingPreference: number;
    ridePreference: number;
    rider?: Rider;

    constructor(request) {
        this.id = request.id;
        this.isAdult = request.isAdult;
        this.characteristics = request.characteristics;
        this.smokingPreference = request.smokingPreference;
        this.ridePreference = request.ridePreference;
        this.rider = request.rider;
    }
}
