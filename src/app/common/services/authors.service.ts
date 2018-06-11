import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { AppStore } from '../models/appstore.model';
import { Author } from '../models/author.model';

const BASE_URL = 'http://localhost:8090/authors';
const BASE_SINGLE_URL = 'http://localhost:8090/author';
const BASE_CREATE_URL = 'http://localhost:8090/create/author';
const BASE_DELETE_URL = 'http://localhost:8090/delete/author';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthorsService {
    authorsObservable: Observable<Array<Author>>;

    constructor(private http: HttpClient, private store: Store<AppStore>) {
        this.authorsObservable = store.select(state => state.authors);
    }

    loadAuthors() {
        this.http.get(`${BASE_URL}`, httpOptions)
            .pipe(
                map(payload => ({ type: 'ADD_AUTHORS', payload }))
            )
            .subscribe(action => this.store.dispatch(action),
                err => console.error(err),
                () => { console.log('loadAuthors(): completed.'); }
            );
    }

    getAuthor(id: number) {
        return this.http.get<Author>(`${BASE_SINGLE_URL}/${id}`, httpOptions);
    }

    updateAuthor(author: Author) {
        this.http.put(`${BASE_SINGLE_URL}`, JSON.stringify(author), httpOptions)
            .pipe(
                map(payload => ({ type: 'UPDATE_AUTHOR', payload }))
            )
            .subscribe(action =>
                this.store.dispatch(action),
                err => console.error(err),
                () => { console.log('updateAuthor(): completed'); }
            );
    }

    createAuthor(author: Author) {
        console.log(`${BASE_CREATE_URL}`);
        console.log('author=' + JSON.stringify(author));
        this.http.post(`${BASE_CREATE_URL}`, JSON.stringify(author), httpOptions)
            .pipe(map(payload => ({ type: 'CREATE_AUTHOR', payload })))
            .subscribe(action =>
                this.store.dispatch(action),
                err => console.error(err),
                () => { console.log('createAuthor(): completed'); }
            );
    }

    deleteAuthor(author: Author) {
        this.http.delete(`${BASE_SINGLE_URL}/${author.id}`)
            .pipe(
                map(payload => ({ type: 'DELETE_AUTHOR', payload }))
            )
            .subscribe(action =>
                this.store.dispatch(action)
            );
    }

}
