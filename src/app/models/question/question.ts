export class Question {
    location: string;
    clue: string;
    answer: string;
    orientation: string;
    identifier: string;

    private _row: number;
    private _col: number;

    constructor(location: string, clue: string, answer: string, orientation: string, identifier: string) {
        this.location = location;
        this.clue = clue;
        this.answer = answer;
        this.orientation = orientation;
        this.identifier = identifier;
    }

    get row(): number {
        return +this.location.split('-')[0];
    }

    get col(): number {
        return +this.location.split('-')[1];
    }

}
