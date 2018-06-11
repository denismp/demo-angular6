import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { AppStore } from '../models/appstore.model';
import { Book } from '../models/book.model';

const BASE_URL = 'http://localhost:8090/books';
const BASE_SINGLE_URL = 'http://localhost:8090/book';
const BASE_CREATE_URL = 'http://localhost:8090/create/book/';
const BASE_UPDATE_URL = 'http://localhost:8090/update/book/';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class BooksService {
    booksObservable: Observable<Array<Book>>;

    constructor(private http: HttpClient, private store: Store<AppStore>) {
        this.booksObservable = store.select(state => state.books);
    }

    loadBooks() {
        this.http.get(`${BASE_URL}`, httpOptions)
            .pipe(
                map(payload => ({ type: 'ADD_BOOKS', payload }))
            )
            .subscribe(action => this.store.dispatch(action), err => console.error(err), () => { console.log('loadBooks(): complete.'); });
    }

    getBook(id: number) {
        return this.http.get<Book>(`${BASE_SINGLE_URL}/${id}`, httpOptions);
    }

    updateBook(book: Book) {
        console.log('updateBook(): ' + `${BASE_UPDATE_URL}`);
        console.log('updateBook(): ' + JSON.stringify(book));
        this.http.put(`${BASE_UPDATE_URL}`, JSON.stringify(book), httpOptions)
            .pipe(
                map(payload => ({ type: 'UPDATE_BOOK', payload }))
            )
            .subscribe(action => this.store.dispatch(action), err => console.error(err), () => { console.log('updateBooks(): completed.'); });
    }

    createBook(authorName: string, book: Book) {
        console.log(`${BASE_CREATE_URL}${authorName}`);

        this.http.post(`${BASE_CREATE_URL}${authorName}`, JSON.stringify(book), httpOptions)
            .pipe(
                map(payload => ({ type: 'CREATE_BOOK', payload }))
            )
            .subscribe(action => this.store.dispatch(action),
                err =>
                    console.error(err),
                () => {
                    console.log('createBook(): complete.');
                }
            );
    }

    deleteBook(book: Book) {
        this.http.delete(`${BASE_SINGLE_URL}/${book.id}`, httpOptions)
            .pipe(
                map(payload => ({ type: 'DELETE_BOOK', payload }))
            )
            .subscribe(action => this.store.dispatch(action));
    }

}
