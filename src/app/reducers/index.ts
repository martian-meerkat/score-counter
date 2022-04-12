import { PlayersState, scoresReducer } from './player-list.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export const rootReducer = {};

export interface AppState {
    players: PlayersState;
};

export const reducers: ActionReducerMap<AppState, any> = {
    players: scoresReducer
};

export const getPlayersState = createFeatureSelector<PlayersState>('players');
