import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { User } from '../../../common/models/user.model';

import { UsersService } from '../../../common/services/users.service';

import { AppStore } from '../../../common/models/appstore.model';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html'
})
export class UsersListComponent {
    @Input() users: User[];
    @Output() selected = new EventEmitter();
    @Output() deleted = new EventEmitter();

    originalId: number;
    selectedUser: User = {
        id: null,
        email: '',
        name: '',
        books: null,
        createdBy: '',
        createdDate: null,
        updatedBy: '',
        updatedDate: null
    };

    @Input() set user(value: User) {
        if (value) {
            this.originalId = value.id;
        }
        this.selectedUser = Object.assign({}, value);
    }

    observableUsers: Observable<Array<User>>;
    selectedObservableUser: Observable<User>;

    constructor(
        private router: Router,
        private store: Store<AppStore>,
    ) {
        this.observableUsers = store.select(state => state.users);
        this.selectedObservableUser = store.select(state => state.selectedUser);
        this.observableUsers.subscribe(v => console.log(v));
        this.selectedObservableUser.subscribe(v => console.log(v));
    }

    routeToUser(author: User): void {
        this.selectedUser = author;
        console.log('routeToUser(): called...');
        this.store.dispatch({ type: 'SELECT_USER', payload: this.selectedUser });
        this.router.navigate(['/home/users/detail']);
    }

    addUser( event: any ): void {
        console.log('addUser(): called...');
        this.store.dispatch({ type: 'SELECT_USER', payload: this.selectedUser });
        this.router.navigate(['/home/users/add']);
    }
}
