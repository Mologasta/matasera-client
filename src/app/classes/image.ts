export class Image {
    readonly id?: number;
    readonly path: string;
    readonly lacation: {
        coordinates: number[]
    };
    readonly createdAt?: string;
    readonly updatedAt?: string;

    constructor (image) {
        this.id = image.id;
        this.path = image.path;
        this.lacation = image.lacation;
        this.createdAt = image.createdAt;
        this.updatedAt = image.updatedAt;
    }
}
