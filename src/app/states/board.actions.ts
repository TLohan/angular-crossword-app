import { Action } from '@ngrx/store';
import { Board } from '../models/board/board';

export enum BoardActionTypes {
    SetCurrentBoardId = '[Board] Set Current Board Id',
    ClearCurrentBoardId = '[Board] Clear Current Board Id',

    RandomiseCurrentBoard = '[Board] Randomise Current Board',
    RandomiseCurrentBoardSuccess = '[Board] Randomise Current Board Success',

    LoadBoards = '[Board] Load Boards',
    LoadBoardsSuccess = '[Board] Load Boards Success',
    LoadBoardsFail = '[Board] Load Boards Fail',

    LoadBoard = '[Board] Load Board',
    LoadBoardSuccess = '[Board] Load Board Success',
    LoadBoardFail = '[Board] Load Board Fail'
}

export class SetCurrentBoardId implements Action {

    readonly type = BoardActionTypes.SetCurrentBoardId;

    constructor(public payload: number) { }
}

export class ClearCurrentBoardId implements Action {

    readonly type = BoardActionTypes.ClearCurrentBoardId;
}

export class RandomiseCurrentBoard implements Action {

    readonly type = BoardActionTypes.RandomiseCurrentBoard;
}

export class RandomiseCurrentBoardSuccess implements Action {

    readonly type = BoardActionTypes.RandomiseCurrentBoardSuccess;

    constructor(public payload: number) { }
}

export class LoadBoards implements Action {

    readonly type = BoardActionTypes.LoadBoards;
}

export class LoadBoardsSuccess implements Action {

    readonly type = BoardActionTypes.LoadBoardsSuccess;

    constructor(public payload: Board[]) { }
}

export class LoadBoardsFail implements Action {

    readonly type = BoardActionTypes.LoadBoardsFail;

    constructor(public payload: string) { }
}

export class LoadBoard implements Action {

    readonly type = BoardActionTypes.LoadBoards;
}

export class LoadBoardSuccess implements Action {

    readonly type = BoardActionTypes.LoadBoardSuccess;

    constructor(public payload: Board) { }
}

export class LoadBoardFail implements Action {

    readonly type = BoardActionTypes.LoadBoardsFail;

    constructor(public payload: string) { }
}

export type BoardActions =
    SetCurrentBoardId
    | ClearCurrentBoardId
    | RandomiseCurrentBoard
    | RandomiseCurrentBoardSuccess
    | LoadBoards
    | LoadBoardsSuccess
    | LoadBoardsFail
    | LoadBoard
    | LoadBoardSuccess
    | LoadBoardFail;

