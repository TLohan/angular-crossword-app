import { Component, OnInit } from '@angular/core';
import { Board } from 'src/app/models/board/board';
import { BoardService } from 'src/app/services/board.service';

@Component({
    templateUrl: './create-crossword.component.html'
})
export class CreateCrosswordComponent implements OnInit {
    board: Board;
    pickSizeMode = true;

    constructor(private boardService: BoardService) {
        this.board = new Board(15, 15);
    }

    ngOnInit() {

    }

    nextStep(value: boolean) {
        console.log(value);
        
        this.pickSizeMode = !value;
    }
}
