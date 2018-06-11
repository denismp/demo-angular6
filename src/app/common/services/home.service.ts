import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppStore } from '../models/appstore.model';
import { HomeScreen } from '../models/home-screen.model';

@Injectable()
export class HomeService {
    home: Observable<HomeScreen>;

    constructor( private store: Store<AppStore> ) {
        this.home = store.select( state => state.selectedHome );
    }

    loadHome(): void {
        const payload: HomeScreen = { homeScreenName: 'home'};
        this.store.dispatch({ type: 'UPDATE_HOME', payload });
    }
}
