
export class ImageComment {
    readonly id?: number;
    readonly text: string;
    readonly createdAt?: string;
    readonly updatedAt?: string;

    constructor (comment) {
        this.id = comment.id;
        this.text = comment.text;
        this.createdAt = comment.createdAt;
        this.updatedAt = comment.updatedAt;
    }
}
