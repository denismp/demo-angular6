import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Book } from '../../../common/models/book.model';
import { User } from '../../../common/models/user.model';

import { BooksService } from '../../../common/services/books.service';

import { AppStore } from '../../../common/models/appstore.model';
import { Store } from '@ngrx/store';
import { AuthorsService } from '../../../common/services/authors.service';

@Component({
    selector: 'app-books-list',
    templateUrl: './books-list.component.html'
})
export class BooksListComponent implements OnInit{
    @Input() books: Book[];
    @Output() selected = new EventEmitter();
    @Output() deleted = new EventEmitter();

    originalId: number;
    emptyUser: User = {
        id: null,
        email: '',
        name: '',
        books: null,
        createdBy: '',
        createdDate: null,
        updatedBy: '',
        updatedDate: null
    };
    selectedBook: Book = {
        id: null,
        title: '',
        authors: null,
        user: this.emptyUser,
        publishDate: null,
        createdBy: '',
        createdDate: null,
        updatedBy: '',
        updatedDate: null
    };

    @Input() set book(value: Book) {
        if (value) {
            this.originalId = value.id;
        }
        if ( value.user === undefined || value.user === null ) {
            value.user = this.emptyUser;
        }
        this.selectedBook = Object.assign({}, value);
    }

    observableBooks: Observable<Array<Book>>;
    selectedObservableBook: Observable<Book>;

    constructor(
        private router: Router,
        private store: Store<AppStore>,
        private booksService: BooksService,
        private authorsService: AuthorsService
    ) {
        this.observableBooks = store.select(state => state.books);
        this.selectedObservableBook = store.select(state => state.selectedBook);
        this.observableBooks.subscribe(v => console.log(v));
        this.selectedObservableBook.subscribe(v => console.log(v));
    }

    ngOnInit(): void {
        let load = true;
        this.observableBooks.subscribe(function (books) {
            console.log('BooksListComponent.ngOnInit(): ' + books);
            if (books !== undefined && books !== null && books.length !== 0) {
                load = false;
            }
        });
        if (load === true) {
            this.booksService.loadBooks();
            this.authorsService.loadAuthors();
        }
    }

    routeToBook(book: Book): void {
        this.selectedBook = book;
        console.log('routeToBook(): called...');
        this.store.dispatch({ type: 'SELECT_BOOK', payload: this.selectedBook });
        this.router.navigate(['/home/books/detail']);
    }

    addBook(event: any): void {
        this.router.navigate(['/home/books/add']);
    }

    onRowExpand(event: any): void {
        this.selectedBook = event.data;
        if ( this.selectedBook.user === undefined || this.selectedBook.user === null ) {
            this.selectedBook.user = this.emptyUser;
        }
        console.log('onRowExpand(): called...');
    }
}
