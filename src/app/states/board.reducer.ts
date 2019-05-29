import { Board } from '../models/board/board';
import * as fromRoot from '../states/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardActions, BoardActionTypes } from './board.actions';

export interface State extends fromRoot.State {
    boards: BoardState;
}

export interface BoardState {
    currentBoardId: number | null;
    boards: Board[];
    error: string;
}

const initialState: BoardState  = {
    currentBoardId: null,
    boards: [],
    error: ''
};

const getBoardsFeatureState = createFeatureSelector<BoardState>('boards');

export const getBoards = createSelector(
    getBoardsFeatureState,
    state => state.boards
);

export const getCurrentBoardId = createSelector(
    getBoardsFeatureState,
    state => state.currentBoardId
);

export const getCurrentBoard = createSelector(
    getBoardsFeatureState,
    getCurrentBoardId,
    (state, currentBoardId) => {
        return state.boards.find(p => p.id === currentBoardId);
    }
);

export const randomiseCurrentBoard = createSelector(
    getBoardsFeatureState,
    getBoards,
    // tslint:disable-next-line:arrow-return-shorthand
    (state, boards) => {
        const ids = state.boards.map(b => b.id);
        state.currentBoardId = ids[Math.floor(Math.random() * ids.length)];
    }
);


export const getError = createSelector(
    getBoardsFeatureState,
    state => state.error
);

export function boardReducer(state: BoardState = initialState, action: BoardActions): BoardState {

    switch (action.type) {
        case BoardActionTypes.SetCurrentBoardId:
            return {
                ...state,
                currentBoardId: action.payload
            };
        case BoardActionTypes.ClearCurrentBoardId:
            return {
                ...state,
                currentBoardId: null
            };
        case BoardActionTypes.RandomiseCurrentBoardSuccess:
            return {
                ...state,
                currentBoardId: action.payload
            };
        case BoardActionTypes.LoadBoardsSuccess:
            return {
                ...state,
                error: '',
                boards: action.payload
            };
        case BoardActionTypes.LoadBoardsFail:
            return {
                ...state,
                boards: [],
                error: action.payload
            };
        default:
            return state;
    }
}
