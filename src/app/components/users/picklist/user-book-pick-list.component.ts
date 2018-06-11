import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Author } from '../../../common/models/author.model';
import { User } from '../../../common/models/user.model';
import { Book } from '../../../common/models/book.model';

import { AuthorsService } from '../../../common/services/authors.service';

import { AppStore } from '../../../common/models/appstore.model';
import { ManageUsersBooksPickStore } from '../../../common/models/manage-users-books-pick-store.model';
import { PickManageUsersBooksBooksService } from '../../../common/services/pick-manage-user-books.service';

import { Store } from '@ngrx/store';
import { BooksService } from '../../../common/services/books.service';

@Component({
    selector: 'app-user-books-pick-list',
    templateUrl: './user-book-pick-list.component.html',
    providers: [BooksService, AuthorsService, PickManageUsersBooksBooksService]
})
export class UserBooksPickListComponent implements OnInit {
    selectedObservableUser: Observable<User>;
    booksObservable: Observable<Array<Book>>;

    @Output() targetChanged: EventEmitter<Book[]> = new EventEmitter<Book[]>();
    @Output() sourceChanged: EventEmitter<Book[]> = new EventEmitter<Book[]>();

    sourceBooks: Book[];

    targetBooks: Book[];

    books: Book[];

    selectedUser: User = {
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
        private authorsService: AuthorsService,
        private booksService: BooksService,
        private pickBooksService: PickManageUsersBooksBooksService,
        private pickStore: Store<ManageUsersBooksPickStore>,
        private store: Store<AppStore>,
        private router: Router,
        private activatedRouter: ActivatedRoute
    ) {
        this.selectedObservableUser = store.select(state => state.selectedUser);
        this.selectedObservableUser.subscribe(v => console.log(v));
        // this.selectedObservableAuthor = store.select(state => state.selectedAuthor);
        // this.selectedObservableAuthor.subscribe(v => console.log(v));
        this.booksObservable = store.select(state => state.books);
        this.booksObservable.subscribe(v => console.log(v));
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
        this.store.select('selectedUser')
            .subscribe(data => {
                this.selectedUser = data;
                if (this.selectedUser !== undefined && this.selectedUser !== null) {
                    // Here we need to add the existing books to the target side
                    // and remove them from the source side.
                    const existingBooks: Array<Book> = this.selectedUser.books;
                    this.removeFromSourceSide(existingBooks);
                    this.addToTargetSide(existingBooks);
                }
            });
    }

    initializeDefaultPickList(): void {
        this.targetBooks = [];
        this.sourceBooks = this.pickBooksService.getSourceBooks();
        this.targetBooks = this.pickBooksService.getTargetBooks();
    }

    addToTargetSide(books: Array<Book>): void {
        this.pickBooksService.setTargetBooks(books);
        this.targetChanged.emit(this.targetBooks);
        this.targetBooks = this.pickBooksService.getTargetBooks();
    }

    removeFromSourceSide(existingBooks: Array<Book>): void {
        const diffObservations: Array<Book> = [];
        this.store.select('books')
            .subscribe(data => {
                this.sourceBooks = data;
                if (this.sourceBooks !== undefined && this.sourceBooks !== null) {
                    for (const existingItem of existingBooks) {
                        console.log('removeFromSourceSide(): existingItem.title=' + existingItem.title);
                        this.sourceBooks = this.sourceBooks.filter(item => item.id !== existingItem.id);
                    }
                }
            });
        this.pickBooksService.setSourceBooks(this.sourceBooks);
        this.sourceChanged.emit(this.sourceBooks);
        this.sourceBooks = this.pickBooksService.getSourceBooks();
    }

    setSourceBooks(): void {
        this.store.select('books')
            .subscribe(data => {
                if (this.sourceBooks !== undefined) {
                    // Order the list
                    this.sourceBooks = this.sourceBooks.sort(
                        (a: Book, b: Book) => new Date(
                            a.createdDate).getSeconds() > new Date(b.createdDate).getSeconds() ? -1 : 1
                    );
                    this.pickStore.dispatch({ type: 'ADD_PICK_SRC_USER_BOOKS', payload: this.sourceBooks });
                }
            });
        console.log('setSourceBooks(): HERE = ' + this.sourceBooks);
    }

    onMoveToTarget(event: any) {
        console.log('onMoveToTarget(): called...');
        // Order list.
        this.targetBooks = this.targetBooks.sort((a: Book, b: Book) => new Date(b.createdDate).getSeconds() ? -1 : 1);
        this.targetChanged.emit(this.targetBooks);
        this.pickBooksService.setTargetBooks(this.targetBooks);
        for (const myTargetBook of this.targetBooks) {
            this.pickStore.dispatch({ type: 'DELETE_PICK_SRC_USER_BOOK', payload: myTargetBook });
        }
    }

    onMoveToSource(event: any) {
        console.log('onMoveToSource(): called...');
        // Order list.
        this.sourceBooks = this.sourceBooks.sort((a: Book, b: Book) => new Date(b.createdDate).getSeconds() ? -1 : 1);
        this.targetChanged.emit(this.sourceBooks);
        this.pickBooksService.setSourceBooks(this.sourceBooks);
        for (const mySourceBook of this.sourceBooks) {
            this.pickStore.dispatch({ type: 'DELETE_PICK_TRGT_USER_BOOK', payload: mySourceBook });
        }
    }

    onMoveAllToTarget(event: any) {
        console.log('onMoveAllToTarget(): called...');
        this.targetChanged.emit(this.targetBooks);
        this.pickBooksService.setTargetBooks(this.targetBooks);
        for (const book of this.targetBooks) {
            this.pickStore.dispatch({ type: 'DELETE_PICK_SRC_USER_BOOK', payload: book });
        }
    }

    onMoveAllToSource(event: any) {
        console.log('onMoveAllToSource(): called...');
        this.sourceChanged.emit(this.sourceBooks);
        this.pickBooksService.setSourceBooks(this.sourceBooks);
        for (const book of this.sourceBooks) {
            this.pickStore.dispatch({ type: 'DELETE_PICK_TRGT_USER_BOOK', payload: book });
        }
    }
}
