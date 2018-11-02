import { User } from './user';

export class Rider extends User {
    number: string;
    isAdult: boolean;
    isVerified: boolean;
    state: number;
    verifiedDate: string;
    characteristics: number;
    smokingPreference: number;
    ridePreference: number;

    constructor(rider) {
        super(rider);

        this.number = rider.number;
        this.state = rider.state;
        this.isAdult = rider.isAdult;
        this.isVerified = rider.isVerified;
        this.characteristics = rider.characteristics;
        this.smokingPreference = rider.smokingPreference;
        this.ridePreference = rider.ridePreference;
        if (rider.verifiedDate) {
            this.verifiedDate = rider.verifiedDate;
        }
    }
}
