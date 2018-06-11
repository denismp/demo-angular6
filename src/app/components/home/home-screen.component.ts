import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppStore } from '../../common/models/appstore.model';
import { HomeScreen } from '../../common/models/home-screen.model';
import { HomeService } from '../../common/services/home.service';


@Component({
    selector: 'app-home-screen',
    templateUrl: './home-screen.component.html',
    providers: [HomeService]
})
export class HomeScreenComponent implements OnInit {
    title = 'Demo';
    home: Observable<HomeScreen>;
    constructor(
        private store: Store<AppStore>,
        private homeService: HomeService
    ) {
        this.home = store.select(state => state.selectedHome);
        this.home.subscribe(v => console.log(v));

    }
    ngOnInit(): void {
        this.homeService.loadHome();
    }

    loadHome(): void {
        const emptyItem: HomeScreen = {
            homeScreenName: ''
        };
        this.store.dispatch({ type: 'UPDATE_HOME', payload: emptyItem });

    }
}
