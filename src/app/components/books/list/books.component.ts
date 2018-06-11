import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppStore } from '../../../common/models/appstore.model';
import { Book } from '../../../common/models/book.model';
import { User } from '../../../common/models/user.model';
import { BooksService } from '../../../common/services/books.service';
import { AuthorsService } from '../../../common/services/authors.service';


@Component({
    selector: 'app-books',
    template: `
    <div class='app-books'>
        <app-books-list [books]="booksObservable | async"
        (selected)="selectBook($event)" (deleted)="deleteBook($event)">
        </app-books-list>
    </div>
    `,
    providers: [BooksService, AuthorsService]
})
export class BooksComponent implements OnInit {
    title = 'Demo';
    booksObservable: Observable<Array<Book>>;

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

    constructor(
        private store: Store<AppStore>,
        private booksService: BooksService
    ) {
        this.booksObservable = store.select(state => state.books);
        this.booksObservable.subscribe(v => console.log(v));

    }
    ngOnInit(): void {
        // let load = true;
        // this.booksObservable.subscribe(function (books) {
        //     console.log(books);
        //     if (books !== undefined && books !== null && books.length !== 0) {
        //         load = false;
        //     }
        // });
        // if (load === true) {
        //     this.booksService.loadBooks();
        // }
    }

    resetBook() {
        const emptyItem: Book = {
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

        this.store.dispatch({ type: 'SELECT_BOOK', payload: emptyItem });
    }

    selectBook( item: Book ) {
        if ( item.user === undefined || item.user === null ) {
            item.user = this.emptyUser;
        }
        this.store.dispatch({ type: 'SELECT_BOOK', payload: item });
    }

    saveBook(item: Book) {
        // this.bookService.saveBook(item);
        this.resetBook();
    }

    deleteBook(item: Book ) {
        // this.bookService.deleteBook(item);
        this.resetBook();
    }
}
