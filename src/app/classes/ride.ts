import {Rider} from './rider';
import {Driver} from './driver';

export class Ride {
    readonly id: number;
    readonly rider: Rider;
    readonly driver: Driver;
    readonly startLocation: string;
    readonly startTime: string;
    readonly destinationLocation: string;
    readonly endTime: string;
    readonly state: number;
    readonly duration: number;
    readonly distance: number;
    readonly createdAt: string;
    readonly updatedAt: string;

    constructor (ride) {
        this.id = ride.id;
        this.rider = ride.rider;
        this.driver = ride.driver;
        this.startLocation = ride.startLocation;
        this.startTime = ride.startTime;
        this.destinationLocation = ride.destinationLocation;
        this.endTime = ride.endTime;
        this.state = ride.state;
        this.distance = ride.distance;
        this.duration = ride.duration;
        this.createdAt = ride.createdAt;
        this.updatedAt = ride.updatedAt;
    }
}

