import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as PlayerActions from '../actions/player-list.actions';
import { OrderBy, Player } from '../models/player-list.models';

export interface PlayersState extends EntityState<Player> { 
    sortBy: OrderBy;
}

const initialPlayersState: PlayersState = {
    ids: [],
    sortBy: {name: 'none', order: 'off'},
    entities: { }
}

export const adapter : EntityAdapter<Player> = 
    createEntityAdapter<Player>({
        selectId: (player) => player.id
    });

export const { selectAll } = adapter.getSelectors();

export function scoresReducer(playersState: PlayersState = initialPlayersState, action: PlayerActions.PlayerActions): PlayersState {
    switch (action.type) {
        case PlayerActions.ADD_PLAYER:
            return adapter.addOne(action.payload, playersState);
        case PlayerActions.REMOVE_PLAYER:
            return adapter.removeOne(action.id, playersState);
        case PlayerActions.UPDATE_SCORE:
            return adapter.updateOne(action.update, playersState);
        case PlayerActions.SORT_BY:
            return {...playersState, sortBy: action.sortBy};
        default:
            return playersState;
    }
};
