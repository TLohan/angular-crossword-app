import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Board } from 'src/app/models/board/board';
import { BoardStat } from 'src/app/models/board/board-stat';
import { BoardService } from 'src/app/services/board.service';
import { Auth2Service } from 'src/app/core/auth2.service';

@Component({
    selector: 'app-board-thumb',
    templateUrl: './board-thumb.component.html',
    styleUrls: ['./board-thumb.component.sass']
})
export class BoardThumbComponent implements OnInit {


    @Input() board: Board;
    @Input() recordStat?: BoardStat;

    @Output() deleteBoard: EventEmitter<Board> = new EventEmitter();

    constructor(private boardService: BoardService, public authService: Auth2Service) { }

    ngOnInit() { }

    edit(board: Board, event: Event) {
        event.stopPropagation();

    }

    delete(board: Board, event: Event) {
        event.stopPropagation();
        this.deleteBoard.emit(board);
    }


}
