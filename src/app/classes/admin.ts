import { User } from './user';
import { Card } from './card';

export class Admin extends User {
    lastPasswordUpdate?: string;
    card?: Card;

    constructor(admin) {
        super(admin);

        this.card = admin.card;
        this.lastPasswordUpdate = admin.lastPasswordUpdate;
    }
}
