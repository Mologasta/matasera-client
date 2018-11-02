
export class Fare {
    readonly id: number;
    private _cancellationFee: number;
    readonly createdAt: string;
    readonly updatedAt: string;

    constructor(fare) {
        this.id = fare.id;
        this._cancellationFee = fare.cancellationFee;
        this.createdAt = fare.createdAt;
        this.updatedAt = fare.updatedAt;
    }

    get cancellationFee() {
        return this._cancellationFee / 100;
    }

    set cancellationFee(value: number) {
        this._cancellationFee = value * 100;
    }
}
