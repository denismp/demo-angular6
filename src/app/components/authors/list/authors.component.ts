import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppStore } from '../../../common/models/appstore.model';
import { Author } from '../../../common/models/author.model';
import { AuthorsService } from '../../../common/services/authors.service';

@Component({
    selector: 'app-authors',
    template: `
    <div class='app-authors'>
        <app-authors-list [authors]="authorsObservable | async"
        (selected)="selectAuthor($event)" (deleted)="deleteAuthor($event)">
        </app-authors-list>
    </div>
    `,
    providers: [AuthorsService]
})
export class AuthorsComponent implements OnInit {
    title = 'Demo';
    authorsObservable: Observable<Array<Author>>;
    constructor(
        private store: Store<AppStore>,
        private authorsService: AuthorsService
    ) {
        this.authorsObservable = store.select(state => state.authors);
        this.authorsObservable.subscribe(v => console.log(v));

    }
    ngOnInit(): void {
        let load = true;
        this.authorsObservable.subscribe(function (authors) {
            console.log(authors);
            if (authors !== undefined && authors !== null && authors.length !== 0) {
                load = false;
            }
        });
        if (load === true) {
            this.authorsService.loadAuthors();
        }
        // this.authorsService.loadAuthors();
    }

    resetAuthor() {
        const emptyItem: Author = {
            id: null,
            name: '',
            books: null,
            createdBy: '',
            createdDate: null,
            updatedBy: '',
            updatedDate: null
        };

        this.store.dispatch({ type: 'SELECT_AUTHOR', payload: emptyItem });
    }

    selectAuthor( item: Author ) {
        this.store.dispatch({ type: 'SELECT_AUTHOR', payload: item });
    }

    saveAuthor(item: Author) {
        // this.authorService.saveAuthor(item);
        this.resetAuthor();
    }

    deleteAuthor(item: Author ) {
        // this.authorService.deleteAuthor(item);
        this.resetAuthor();
    }
}
