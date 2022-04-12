import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PlayerListComponent } from './components/player-list/player-list.component';

import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { FormsModule } from '@angular/forms';
import { localStorageSync } from 'ngrx-store-localstorage';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: ['players'],
    rehydrate: true
  })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    PlayerListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot(
      reducers,
      {metaReducers}
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
