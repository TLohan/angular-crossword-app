import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { BoardService } from '../services/board.service';
import * as boardActions from './board.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Board } from '../models/board/board';
import { of } from 'rxjs';

@Injectable()
export class BoardEffects {

    constructor(private actions$: Actions, private boardService: BoardService) { }

    @Effect()
    loadBoards$ = this.actions$.pipe(
        ofType(boardActions.BoardActionTypes.LoadBoards),
        mergeMap((action: boardActions.LoadBoards) =>
            this.boardService.getBoards().pipe(
                map((boards: Board[]) => (new boardActions.LoadBoardsSuccess(boards))),
                catchError(err => of(new boardActions.LoadBoardFail(err)))
            ))
    );

    @Effect()
    randomiseBoard$ = this.actions$.pipe(
        ofType(boardActions.BoardActionTypes.RandomiseCurrentBoard),
        mergeMap((action: boardActions.LoadBoards) =>
            this.boardService.getBoards().pipe(
                map((boards: Board[]) => {
                    const ids = boards.map(b => b.id);
                    console.log('ids', ids);
                    const randId = ids[Math.floor(Math.random() * ids.length)];
                    const setBoards = new boardActions.LoadBoardsSuccess(boards);
                    return new boardActions.RandomiseCurrentBoardSuccess(randId);
                }
            ), catchError(err => of(new boardActions.LoadBoardsFail(err))))
        )
    );

}
