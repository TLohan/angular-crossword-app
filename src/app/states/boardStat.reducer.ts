import { BoardStat } from '../models/board/board-stat';
import * as fromRoot from './app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardStatActions, BoardStatActionTypes } from './board-stat.actions';

export interface State extends fromRoot.State {
    boardStats: BoardStatState;
}

export interface BoardStatState {
    boardStats: BoardStat[];
    recordTimes: BoardStat[];
}

const initialState: BoardStatState = {
    boardStats: [],
    recordTimes: []
};

const getBoardStatFeatureState = createFeatureSelector<BoardStatState>('boardStats');

export const getBoardStats = createSelector(
    getBoardStatFeatureState,
    state => state.boardStats
);

export const getRecordStats = createSelector(
    getBoardStatFeatureState,
    state => state.recordTimes
);

export function boardStatReducer(state: BoardStatState = initialState, action: BoardStatActions): BoardStatState {
    switch (action.type) {
        case BoardStatActionTypes.LoadUserStatsSuccess:
            return {
                ...state,
                boardStats: action.payload
            };
        case BoardStatActionTypes.LoadRecordTimesSuccess:
            return {
                ...state,
                recordTimes: action.payload
            };
        default:
            return state;
    }
}
