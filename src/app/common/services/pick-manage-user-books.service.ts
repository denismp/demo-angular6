import { Injectable, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, ParamMap, Params } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { AppStore } from '../models/appstore.model';
import { ManageUsersBooksPickStore } from '../models/manage-users-books-pick-store.model';

import { Book } from '../models/book.model';

@Injectable()
export class PickManageUsersBooksBooksService {
    targetBooksObservable: Observable<Array<Book>>;
    sourceBooksObservable: Observable<Array<Book>>;
    booksObservable: Observable<Array<Book>>;
    sourceBooks: Book[];
    targetBooks: Book[];

    constructor(
        private store: Store<AppStore>,
        private picksStore: Store<ManageUsersBooksPickStore>
    ) {
        this.booksObservable = store.select(state => state.books);
        this.targetBooksObservable = picksStore.select(state => state.targetManageUsersBooks);
        this.sourceBooksObservable = picksStore.select(state => state.sourceManageUsersBooks);
    }

    setTargetBooks(items: Book[]) {
        this.picksStore.dispatch({ type: 'ADD_PICK_TRGT_USER_BOOKS', payload: items });
        this.picksStore.select('targetManageUsersBooks')
            .subscribe(data => {
                this.targetBooks = data;
            });
    }

    getTargetBooks(): Array<Book> {
        this.picksStore.select('targetManageUsersBooks')
            .subscribe(data => {
                this.targetBooks = data;
            });
        return this.targetBooks;
    }

    resetTargetBooks(): void {
        this.picksStore.dispatch({ type: 'RESET_PICK_TRGT_USER_BOOKS', payload: [] });
    }

    setSourceBooks(items: Book[]) {
        this.picksStore.dispatch({ type: 'ADD_PICK_SRC_USER_BOOKS', payload: items });
        this.picksStore.select('sourceManageUsersBooks')
            .subscribe(data => {
                this.sourceBooks = data;
            });
    }

    getSourceBooks(): Array<Book> {
        this.picksStore.select('sourceManageUsersBooks')
            .subscribe(data => {
                this.sourceBooks = data;
            });
        return this.sourceBooks;
    }

    resetSourceBooks(): void {
        this.picksStore.dispatch({ type: 'RESET_PICK_SRC_USER_BOOKS', payload: [] });
    }
}
