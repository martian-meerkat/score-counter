import { createSelector } from "@ngrx/store";
import { Player } from "../models/player-list.models";
import { getPlayersState } from "../reducers";
import { adapter } from "../reducers/player-list.reducer";

export const selectPlayerState = createSelector(
    getPlayersState,
    state => state
);

export const getSortParameters = createSelector(
    selectPlayerState,
    state => state.sortBy
);

export const { selectAll: selectAllPlayers } = adapter.getSelectors(selectPlayerState);

export const getSortedPlayerList = createSelector(
    selectAllPlayers,
    getSortParameters,
    ( players, sortingKeys ): Player[] => {
        let sorted = players;
        if (players && Object.keys(players).length > 1) {
            let sortPlayers = (a: Player, b: Player): number => {
                let result: number = 0;
                if (a && b)
                    result = a[sortingKeys.name] < b[sortingKeys.name] ? -1 : 1;
                return result;
            }
            sorted = Object.values(players).sort(sortPlayers);
            if (sortingKeys.order === 'desc') {
                sorted = sorted.reverse();
            }
        }
        return sorted;
    }
);