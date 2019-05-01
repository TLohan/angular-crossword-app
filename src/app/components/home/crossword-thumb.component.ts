import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Board } from 'src/app/models/board/board';
import { BoardService } from 'src/app/services/board.service';
import { Auth2Service } from 'src/app/core/auth2.service';
import { BoardStat } from 'src/app/models/board/board-stat';

@Component({
    selector: 'app-crossword-thumb',
    templateUrl: 'crossword-thumb.component.html',
    styleUrls: ['./crossword-thumb.component.sass']
})

export class CrosswordThumbComponent implements OnInit {

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
