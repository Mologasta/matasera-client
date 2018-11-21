export class Image {
    readonly id?: number;
    readonly url: string;
    readonly lacation: {
        coordinates: number[]
    };
    readonly createdAt?: string;
    readonly updatedAt?: string;

    constructor (image) {
        this.id = image.id;
        this.url = image.url;
        this.lacation = image.lacation;
        this.createdAt = image.createdAt;
        this.updatedAt = image.updatedAt;
    }
}
