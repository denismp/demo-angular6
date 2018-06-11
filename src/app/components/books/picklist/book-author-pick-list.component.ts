import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Author } from '../../../common/models/author.model';
import { User } from '../../../common/models/user.model';
import { Book } from '../../../common/models/book.model';

import { AuthorsService } from '../../../common/services/authors.service';

import { AppStore } from '../../../common/models/appstore.model';
import { ManageBooksAuthorsPickStore } from '../../../common/models/manage-books-authors-pick-store.model';
import { PickManageBooksAuthorsService } from '../../../common/services/pick-manage-books-authors.service';

import { Store } from '@ngrx/store';
import { BooksService } from '../../../common/services/books.service';

@Component({
    selector: 'app-books-author-pick-list',
    templateUrl: './book-author-pick-list.component.html',
    providers: [AuthorsService, PickManageBooksAuthorsService]
})
export class BooksAuthorPickListComponent implements OnInit {
    // selectedObservableAuthor: Observable<Author>;
    selectedObservableBook: Observable<Book>;
    authorsObservable: Observable<Array<Author>>;

    @Output() targetChanged: EventEmitter<Author[]> = new EventEmitter<Author[]>();
    @Output() sourceChanged: EventEmitter<Author[]> = new EventEmitter<Author[]>();

    sourceAuthors: Author[];

    targetAuthors: Author[];

    authors: Author[];

    selectedBook: Book = {
        id: null,
        title: '',
        authors: null,
        user: null,
        publishDate: null,
        createdBy: '',
        createdDate: null,
        updatedBy: '',
        updatedDate: null
    };

    constructor(
        private authorsService: AuthorsService,
        private booksService: BooksService,
        private pickAuthorsService: PickManageBooksAuthorsService,
        private pickStore: Store<ManageBooksAuthorsPickStore>,
        private store: Store<AppStore>,
        private router: Router,
        private activatedRouter: ActivatedRoute
    ) {
        this.selectedObservableBook = store.select(state => state.selectedBook);
        this.selectedObservableBook.subscribe(v => console.log(v));
        // this.selectedObservableAuthor = store.select(state => state.selectedAuthor);
        // this.selectedObservableAuthor.subscribe(v => console.log(v));
        this.authorsObservable = store.select(state => state.authors);
        this.authorsObservable.subscribe(v => console.log(v));
    }

    ngOnInit() {
        // this.targetAuthors = [];
        // let load = true;
        // this.authorsObservable.subscribe(function (x) {
        //     console.log(x);
        //     if (x !== undefined && x !== null) {
        //         load = false;
        //     }
        // });
        // if (load === true) {
        //     this.authorsService.loadAuthors();
        // }

        this.initializeMe();
    }

    initializeMe(): void {
        this.initializeDefaultPickList();
        this.store.select('selectedBook')
            .subscribe(data => {
                this.selectedBook = data;
                if (this.selectedBook !== undefined && this.selectedBook !== null) {
                    // Here we need to add the existing authors to the target side
                    // and remove them from the source side.
                    const existingAuthors: Array<Author> = this.selectedBook.authors;
                    this.removeFromSourceSide(existingAuthors);
                    this.addToTargetSide(existingAuthors);
                }
            });
    }

    initializeDefaultPickList(): void {
        this.targetAuthors = [];
        this.sourceAuthors = this.pickAuthorsService.getSourceAuthors();
        this.targetAuthors = this.pickAuthorsService.getTargetAuthors();
    }

    addToTargetSide(authors: Array<Author>): void {
        this.pickAuthorsService.setTargetAuthors(authors);
        this.targetChanged.emit(this.targetAuthors);
        this.targetAuthors = this.pickAuthorsService.getTargetAuthors();
    }

    removeFromSourceSide(existingAuthors: Array<Author>): void {
        const diffObservations: Array<Author> = [];
        this.store.select('authors')
            .subscribe(data => {
                this.sourceAuthors = data;
                if (this.sourceAuthors !== undefined && this.sourceAuthors !== null) {
                    for (const existingItem of existingAuthors) {
                        console.log('removeFromSourceSide(): existingItem.name=' + existingItem.name);
                        this.sourceAuthors = this.sourceAuthors.filter(item => item.id !== existingItem.id);
                    }
                }
            });
        this.pickAuthorsService.setSourceAuthors(this.sourceAuthors);
        this.sourceChanged.emit(this.sourceAuthors);
        this.sourceAuthors = this.pickAuthorsService.getSourceAuthors();
    }

    setSourceAuthors(): void {
        this.store.select('authors')
            .subscribe(data => {
                if (this.sourceAuthors !== undefined) {
                    // Order the list
                    this.sourceAuthors = this.sourceAuthors.sort(
                        (a: Author, b: Author) => new Date(
                            a.createdDate).getSeconds() > new Date(b.createdDate).getSeconds() ? -1 : 1
                    );
                    this.pickStore.dispatch({ type: 'ADD_PICK_SRC_BOOK_AUTHORS', payload: this.sourceAuthors });
                }
            });
        console.log('setSourceAuthors(): HERE = ' + this.sourceAuthors);
    }

    onMoveToTarget(event: any) {
        console.log('onMoveToTarget(): called...');
        // Order list.
        this.targetAuthors = this.targetAuthors.sort((a: Author, b: Author) => new Date(b.createdDate).getSeconds() ? -1 : 1);
        this.targetChanged.emit(this.targetAuthors);
        this.pickAuthorsService.setTargetAuthors(this.targetAuthors);
        for (const myTargetAuthor of this.targetAuthors) {
            this.pickStore.dispatch({ type: 'DELETE_PICK_SRC_BOOK_AUTHOR', payload: myTargetAuthor });
        }
    }

    onMoveToSource(event: any) {
        console.log('onMoveToSource(): called...');
        // Order list.
        this.sourceAuthors = this.sourceAuthors.sort((a: Author, b: Author) => new Date(b.createdDate).getSeconds() ? -1 : 1);
        this.targetChanged.emit(this.sourceAuthors);
        this.pickAuthorsService.setSourceAuthors(this.sourceAuthors);
        for (const mySourceAuthor of this.sourceAuthors) {
            this.pickStore.dispatch({ type: 'DELETE_PICK_TRGT_BOOK_AUTHOR', payload: mySourceAuthor });
        }
    }

    onMoveAllToTarget(event: any) {
        console.log('onMoveAllToTarget(): called...');
        this.targetChanged.emit(this.targetAuthors);
        this.pickAuthorsService.setTargetAuthors(this.targetAuthors);
        for (const author of this.targetAuthors) {
            this.pickStore.dispatch({ type: 'DELETE_PICK_SRC_BOOK_AUTHOR', payload: author });
        }
    }

    onMoveAllToSource(event: any) {
        console.log('onMoveAllToSource(): called...');
        this.sourceChanged.emit(this.sourceAuthors);
        this.pickAuthorsService.setSourceAuthors(this.sourceAuthors);
        for (const author of this.sourceAuthors) {
            this.pickStore.dispatch({ type: 'DELETE_PICK_TRGT_BOOK_AUTHOR', payload: author });
        }
    }
}
