import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Author } from '../../../common/models/author.model';

import { AuthorsService } from '../../../common/services/authors.service';

import { AppStore } from '../../../common/models/appstore.model';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-authors-list',
    templateUrl: './authors-list.component.html'
})
export class AuthorsListComponent implements OnInit {
    @Input() authors: Author[];
    // @Input() addedAuthor: Author;
    @Output() selected = new EventEmitter();
    @Output() deleted = new EventEmitter();

    originalId: number;
    selectedAuthor: Author = {
        id: null,
        name: '',
        books: null,
        createdBy: '',
        createdDate: null,
        updatedBy: '',
        updatedDate: null
    };

    @Input() set author(value: Author) {
        if (value) {
            this.originalId = value.id;
        }
        this.selectedAuthor = Object.assign({}, value);
    }

    observableAuthors: Observable<Array<Author>>;
    selectedObservableAuthor: Observable<Author>;

    constructor(
        private router: Router,
        private store: Store<AppStore>,
    ) {
        this.observableAuthors = store.select(state => state.authors);
        this.selectedObservableAuthor = store.select(state => state.selectedAuthor);
        this.observableAuthors.subscribe(v => console.log(v));
        this.selectedObservableAuthor.subscribe(v => console.log(v));
    }

    ngOnInit(): void {

    }

    routeToAuthor(author: Author): void {
        this.selectedAuthor = author;
        console.log('routeToObservation(): called...');
        this.store.dispatch({ type: 'SELECT_AUTHOR', payload: this.selectedAuthor });
        this.router.navigate(['/home/authors/detail']);
    }

    addAuthor(event: any): void {
        this.router.navigate(['/home/authors/add']);
    }
}
