import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Board } from '../models/board/board';

@Injectable({
    providedIn: 'root'
})
export class CreateCrosswordService {
    private saveCrosswordSource = new Subject<Board>();

    saveCrosswordTriggered$ = this.saveCrosswordSource.asObservable();

    saveCrossword(crossword: Board): void {
        this.saveCrosswordSource.next(crossword);
    }
}
