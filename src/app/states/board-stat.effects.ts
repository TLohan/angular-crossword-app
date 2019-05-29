import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { BoardService } from '../services/board.service';
import * as boardStatActions from './board-stat.actions';
import { mergeMap, map } from 'rxjs/operators';
import { BoardStat } from '../models/board/board-stat';


@Injectable()
export class BoardStatEffects {

    constructor(private actions$: Actions, private boardService: BoardService) {}

    @Effect()
    loadUserStats$ = this.actions$.pipe(
        ofType(boardStatActions.BoardStatActionTypes.LoadUserStats),
        mergeMap(action =>
            this.boardService.getBoardStatsForUser().pipe(
                map((boardStats: BoardStat[]) => new boardStatActions.LoadUserStatsSuccess(boardStats))
            )
        )
    );

    @Effect()
    loadRecordTimes$ = this.actions$.pipe(
        ofType(boardStatActions.BoardStatActionTypes.LoadRecordTimes),
        mergeMap(action =>
            this.boardService.getRecordStats().pipe(
                map((stats: BoardStat[]) => new boardStatActions.LoadRecordTimesSuccess(stats))
            )
        )
    );

}
