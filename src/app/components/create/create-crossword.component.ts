import { Component, OnInit } from '@angular/core';
import { Board } from 'src/app/models/board/board';
import { BoardService } from 'src/app/services/board.service';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';


@Component({
    templateUrl: './create-crossword.component.html',
    styleUrls: ['./create-crossword.component.sass']
})
export class CreateCrosswordComponent {
    board: Board;
    pickSizeMode = true;

    constructor(private boardService: BoardService, private router: Router) {
        this.board = new Board(15, 15);
    }

    nextStep(value: boolean) {
        console.log(value);
        this.pickSizeMode = !value;
    }

    save() {
        this.boardService.saveBoard(this.board).subscribe((res: HttpResponse<any>) => {
            if (res.status === 201) {
                this.router.navigate(['/']);
            }
        },
            (err: HttpErrorResponse) => {
                console.log(err.error);
                console.log(err.status);
            }
        );
    }
}
