import { Injectable, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, ParamMap, Params } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { AppStore } from '../models/appstore.model';
import { ManageBooksAuthorsPickStore } from '../models/manage-books-authors-pick-store.model';

import { Author } from '../models/author.model';

@Injectable()
export class PickManageBooksAuthorsService {
    targetAuthorsObservable: Observable<Array<Author>>;
    sourceAuthorsObservable: Observable<Array<Author>>;
    authorsObservable: Observable<Array<Author>>;
    sourceAuthors: Author[];
    targetAuthors: Author[];

    constructor(
        private store: Store<AppStore>,
        private picksStore: Store<ManageBooksAuthorsPickStore>
    ) {
        this.authorsObservable = store.select(state => state.authors);
        this.targetAuthorsObservable = picksStore.select(state => state.targetManageBooksAuthors);
        this.sourceAuthorsObservable = picksStore.select(state => state.sourceManageBooksAuthors);
    }

    setTargetAuthors(authors: Author[]) {
        this.picksStore.dispatch({ type: 'ADD_PICK_TRGT_BOOK_AUTHORS', payload: authors });
        this.picksStore.select('targetManageBooksAuthors')
            .subscribe(data => {
                this.targetAuthors = data;
            });
    }

    getTargetAuthors(): Array<Author> {
        this.picksStore.select('targetManageBooksAuthors')
            .subscribe(data => {
                this.targetAuthors = data;
            });
        return this.targetAuthors;
    }

    resetTargetAuthors(): void {
        this.picksStore.dispatch({ type: 'RESET_PICK_TRGT_BOOK_AUTHORS', payload: [] });
    }

    setSourceAuthors(authors: Author[]) {
        this.picksStore.dispatch({ type: 'ADD_PICK_SRC_BOOK_AUTHORS', payload: authors });
        this.picksStore.select('sourceManageBooksAuthors')
            .subscribe(data => {
                this.sourceAuthors = data;
            });
    }

    getSourceAuthors(): Array<Author> {
        this.picksStore.select('sourceManageBooksAuthors')
            .subscribe(data => {
                this.sourceAuthors = data;
            });
        return this.sourceAuthors;
    }

    resetSourceAuthors(): void {
        this.picksStore.dispatch({ type: 'RESET_PICK_SRC_BOOK_AUTHORS', payload: [] });
    }
}
