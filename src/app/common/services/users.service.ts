import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { AppStore } from '../models/appstore.model';
import { User } from '../models/user.model';

const BASE_URL = 'http://localhost:8090/users';
const BASE_SINGLE_URL = 'http://localhost:8090/user/get-by-email';
const BASE_CREATE_URL = 'http://localhost:8090/create/user';
const BASE_UPDATE_URL = 'http://localhost:8090/update/user';
const BASE_DELETE_URL = 'http://localhost:8090/delete/user/';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class UsersService {
    usersObservable: Observable<Array<User>>;

    constructor( private http: HttpClient, private store: Store<AppStore>) {
        this.usersObservable = store.select( state => state.users );
    }

    loadUsers() {
        this.http.get(`${BASE_URL}`, httpOptions)
        .pipe(
            map(payload => ({ type: 'ADD_USERS', payload }))
        )
        .subscribe( action => this.store.dispatch(action));
    }

    getUser(email: string) {
        return this.http.get<User>(`${BASE_SINGLE_URL}/${email}`, httpOptions);
    }

    updateUser( user: User ) {
        console.log('updateUser(): ' + `${BASE_SINGLE_URL}`);
        console.log('updateUser(): ' + JSON.stringify(user));
        this.http.put(`${BASE_UPDATE_URL}`, JSON.stringify(user), httpOptions)
        .pipe(
            map(payload => ({ type: 'UPDATE_USER', payload }))
        )
        .subscribe( action => this.store.dispatch(action));
    }

    createUser( user: User ) {
        this.http.post(`${BASE_CREATE_URL}`, JSON.stringify(user), httpOptions)
        .pipe(
            map(payload => ({ type: 'CREATE_USER', payload }))
        )
        .subscribe( action => this.store.dispatch(action));
    }

    deleteUser( user: User ) {
        this.http.delete(`${BASE_DELETE_URL}/${user.id}`, httpOptions)
        .pipe(
            map(payload => ({ type: 'DELETE_USER', payload }))
        )
        .subscribe( action => this.store.dispatch(action));
    }

}
