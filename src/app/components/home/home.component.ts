import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';
import { Board } from 'src/app/models/board/board';
import { Router } from '@angular/router';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

    boards: Board[];

    constructor(private boardService: BoardService) {

    }

    ngOnInit(): void {
        this.boardService.getBoards().subscribe(data => {
            this.boards = data;
        });
    }

    delete(board: Board, event: Event) {
        event.stopPropagation();

        this.boardService.deleteBoard(board).subscribe((response) => {
            this.boardService.getBoards().subscribe(data => {
                this.boards = data;
            });
        });
    }

}
