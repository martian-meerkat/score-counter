import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, mergeMap, Observable } from 'rxjs';
import { PlayersState } from '../../reducers/player-list.reducer';
import * as PlayerListActions from '../../actions/player-list.actions';
import { getSortedPlayerList, getSortParameters } from '../../selectors/player-list.selectors';
import { OrderBy, Player } from '../../models/player-list.models';

@Component({
    selector: 'app-player-list',
    templateUrl: './player-list.component.html',
    styleUrls: ['./player-list.component.css']
})

export class PlayerListComponent implements OnInit {
    players$: Observable<Player[]>;
    sortBy$: Observable<OrderBy>;
    newplayername: string = '';

    constructor(private _store: Store<PlayersState>) {
        this.players$ = this._store.pipe(select(getSortedPlayerList));
        this.sortBy$ = this._store.pipe(select(getSortParameters));
    }

    private _generateId() {
        let playerIds = new Array();
        this.players$.pipe(
            mergeMap(players => players),
            map(player => player.id)
        ).subscribe(playerId => playerIds.push(playerId));
        return playerIds.length ? Math.max(...playerIds) + 1 : 1;
    }

    addPlayer(name: string) {
        this._store.dispatch(new PlayerListActions.AddPlayer(
            {
                id: this._generateId(),
                name,
                score: 0,
                createDate: Date.now()
            }
        ));
    }

    removePlayer(id: number) {
        this._store.dispatch(new PlayerListActions.RemovePlayer(id));
    }

    incrementPlayerScore(player: Player) {
        this._store.dispatch(new PlayerListActions.UpdatePlayerScore(
            {
                id: player.id,
                changes: {
                    score: player.score + 1
                }
            }
        ));
    }

    decrementPlayerScore(player: Player) {
        this._store.dispatch(new PlayerListActions.UpdatePlayerScore(
            {
                id: player.id,
                changes: {
                    score: player.score > 0 ? player.score - 1 : 0
                }
            }
        ));
    }

    sortBy(sortBy: OrderBy) {
        this._store.dispatch(new PlayerListActions.SortBy(sortBy));
    }

    ngOnInit(): void {
    }
}
