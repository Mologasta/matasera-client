import { User } from './user';
import { DriverDetails } from '../interfaces/driver-details.interface';

export class Driver extends User {
    number: string;
    homeAddress: string;
    city: string;
    standard: boolean;
    canDriveChildren: boolean;
    drivePassengersWithNeeds: boolean;
    electricWheelChair: boolean;
    foldingWheelChair: boolean;
    needSomeAssistance: boolean;
    isVerified: boolean;
    state: number;
    rating: number;
    driverDetail: DriverDetails;
    verifiedDate: string;

    constructor(driver) {
        super(driver);

        this.number = driver.number;
        this.homeAddress = driver.homeAddress;
        this.city = driver.city;
        this.state = driver.state;
        this.standard = driver.standard;
        this.canDriveChildren = driver.canDriveChildren;
        this.drivePassengersWithNeeds = driver.drivePassengersWithNeeds;
        this.electricWheelChair = driver.electricWheelChair;
        this.foldingWheelChair = driver.foldingWheelChair;
        this.needSomeAssistance = driver.needSomeAssistance;
        this.isVerified = driver.isVerified;
        this.rating = driver.rating;
        if (driver.driverDetail) {
            this.driverDetail = driver.driverDetail;
        }
        if (driver.verifiedDate) {
            this.verifiedDate = driver.verifiedDate;
        }
    }
}
