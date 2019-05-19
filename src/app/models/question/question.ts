import { Orientation } from 'src/app/components/play/orientation.enum';

export class Question {
    id: number;
    location: string;
    clue: string;
    answer: string;
    orientation: Orientation;
    identifier: string;

    _order: number;
    _row: number;
    _col: number;

    constructor(location: string, clue: string, answer: string, orientation: Orientation, identifier: string) {
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

    get order(): number {
        const ident = this.identifier.split('');
        if (ident.length === 3) {
            return +`${ident[0]}${ident[1]}`;
        } else {
            return +`${ident[0]}`;
        }
    }

}
