import { BoardActionTypes } from './board.actions';
import { BoardStat } from '../models/board/board-stat';
import { Action } from '@ngrx/store';

export enum BoardStatActionTypes {

    LoadUserStats = '[BoardStat] Load User Stats',
    LoadUserStatsSuccess = '[BoardStat] Load User Stats Success',
    LoadUserStatsFail = '[BoardStat] Load User Stats Fail',

    LoadRecordTimes = '[BoardStat] Load Record Times',
    LoadRecordTimesSuccess = '[BoardStat] Load Record Times Success',
    LoadRecordTimesFail = '[BoardStat] Load Record Times Fail'
}

export class LoadUserStats implements Action {

    readonly type = BoardStatActionTypes.LoadUserStats;
}

export class LoadUserStatsSuccess implements Action {

    readonly type = BoardStatActionTypes.LoadUserStatsSuccess;

    constructor(public payload: BoardStat[]) { }
}

export class LoadUserStatsFail implements Action {

    readonly type = BoardStatActionTypes.LoadUserStatsFail;
}

export class LoadRecordTimes implements Action {

    readonly type = BoardStatActionTypes.LoadRecordTimes;
}

export class LoadRecordTimesSuccess implements Action {

    readonly type = BoardStatActionTypes.LoadRecordTimesSuccess;

    constructor(public payload: BoardStat[]) { }
}

export class LoadRecordTimesFail implements Action {

    readonly type = BoardStatActionTypes.LoadRecordTimesFail;
}



export type BoardStatActions =
    | LoadUserStats
    | LoadUserStatsSuccess
    | LoadUserStatsFail
    | LoadRecordTimes
    | LoadRecordTimesSuccess
    | LoadRecordTimesFail;
