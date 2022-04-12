import { UpdateNum } from '@ngrx/entity/src/models';
import { Action } from '@ngrx/store';
import { OrderBy, Player } from '../models/player-list.models';

export const ADD_PLAYER = 'ADD_PLAYER';
export const REMOVE_PLAYER = 'REMOVE_PLAYER';
export const UPDATE_SCORE = 'INCREMENT_SCORE';
export const SORT_BY = 'SORT_BY';

export class AddPlayer implements Action {
    readonly type = ADD_PLAYER;
    constructor(public payload: Player) { }
}

export class RemovePlayer implements Action {
    readonly type = REMOVE_PLAYER;
    constructor(public id: number) { }
}

export class UpdatePlayerScore implements Action {
    readonly type = UPDATE_SCORE;
    constructor(public update: UpdateNum<Player>) { }
}

export class SortBy implements Action {
    readonly type = SORT_BY;
    constructor(public sortBy: OrderBy) { }
}

export type PlayerActions = AddPlayer | RemovePlayer | UpdatePlayerScore | SortBy;