import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';
import { Board } from 'src/app/models/board/board';

@Component({
    templateUrl: './home.component.html'
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

}
