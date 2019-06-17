import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Board } from 'src/app/models/board/board';
import { BoardStat } from 'src/app/models/board/board-stat';
import { BoardService } from 'src/app/services/board.service';
import { Auth2Service } from 'src/app/core/auth2.service';
import * as fromRoot from '../../states/app.state';
import { Store } from '@ngrx/store';
import * as boardActions from '../../states/board.actions';
import { Router } from '@angular/router';

@Component({
    selector: 'app-board-thumb',
    templateUrl: './board-thumb.component.html',
    styleUrls: ['./board-thumb.component.sass']
})
export class BoardThumbComponent implements OnInit {


    @Input() board: Board;
    @Input() recordStat?: BoardStat;

    @Output() deleteBoard: EventEmitter<Board> = new EventEmitter();

    constructor(private store: Store<fromRoot.State>, public authService: Auth2Service, private router: Router) { }

    ngOnInit() {
     }

    playBoard() {
        this.store.dispatch(new boardActions.SetCurrentBoardId(this.board.id));
        this.router.navigate(['play', this.board.id]);
    }

    edit(board: Board, event: Event) {
        event.stopPropagation();
    }

    delete(board: Board, event: Event) {
        event.stopPropagation();
        this.deleteBoard.emit(board);
    }


}
