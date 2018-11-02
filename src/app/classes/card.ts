export class Card {
    id: number;
    lastFour: string;
    expMonth: number;
    expYear: number;

    constructor(card) {
        this.id = card.id;
        this.lastFour = card.lastFour;
        this.expMonth = card.expMonth;
        this.expYear = card.expYear;
    }
}
