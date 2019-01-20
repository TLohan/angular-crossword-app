import { Component, OnInit } from '@angular/core';
import { Board } from 'src/app/models/board/board';
import { BoardService } from 'src/app/services/board.service';
import { Router } from '@angular/router';

// TO DO:
// redirect to '/' on successful save
// finish writing test code

@Component({
    templateUrl: './create-crossword.component.html'
})
export class CreateCrosswordComponent implements OnInit {
    board: Board;
    pickSizeMode = true;

    constructor(private boardService: BoardService, private router: Router) {
        this.board = new Board(15, 15);
    }

    ngOnInit() {

    }

    nextStep(value: boolean) {
        console.log(value);
        this.pickSizeMode = !value;
    }

    save() {
        this.boardService.saveBoard(this.board).subscribe((data) => {
            if (data) {
                this.router.navigate(['/']);
            }
        });
    }
}
