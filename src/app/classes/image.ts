export class Image {
    readonly id?: number;
    readonly url: string;
    readonly lat: string;
    readonly long: string;
    readonly createdAt?: string;
    readonly updatedAt?: string;

    constructor (image) {
        this.id = image.id;
        this.url = image.url;
        this.lat = image.lat;
        this.long = image.long;
        this.createdAt = image.createdAt;
        this.updatedAt = image.updatedAt;
    }
}
