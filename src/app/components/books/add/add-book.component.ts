import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppStore } from '../../../common/models/appstore.model';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Book } from '../../../common/models/book.model';
import { BooksService } from '../../../common/services/books.service';
import { AuthorsService } from '../../../common/services/authors.service';
import { Author } from '../../../common/models/author.model';

@Component({
    selector: 'app-add-book',
    templateUrl: './add-book.component.html',
    providers: [BooksService, AuthorsService]
})
export class AddBookComponent implements OnInit {
    selectedTargetAuthors: Author[];
    selectedSourceAuthors: Author[];
    authorName: string;
    bookForm: FormGroup;
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
    emptySelectedBook: Book = {
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
    selectedObservableBook: Observable<Book>;

    constructor(
        private booksService: BooksService,
        private store: Store<AppStore>,
        private router: Router,
        private activatedRouter: ActivatedRoute,
        private location: Location
    ) {
        this.selectedObservableBook = store.select(state => state.selectedBook);
    }

    ngOnInit(): void {
        this.bookForm = new FormGroup({
            'title': new FormControl(this.selectedBook.title, Validators.required),
            'authorName': new FormControl(this.authorName, Validators.required),
            'publishDate': new FormControl(this.selectedBook.publishDate, Validators.required)
        });
    }

    onSubmit(): void {
        console.log('onSubmit(): called...');

        this.getFormData();
        this.booksService.createBook(this.authorName, this.selectedBook);
        // this.store.dispatch({type: 'CREATE_AUTHOR', payload: this.selectedAuthor});
        this.location.back();
    }

    onCancel(): void {
        console.log('onCancel(): called...');
        // clean up stuff here
        this.router.navigate(['/home/books']);
    }

    getFormData(): void {
        this.selectedBook.title = this.bookForm.get('title').value;
        this.authorName = this.bookForm.get('authorName').value;
        this.selectedBook.publishDate = this.bookForm.get('publishDate').value;
        this.store.dispatch({ type: 'SELECT_BOOK', payload: this.selectedBook });
        this.getBook();
    }

    getBook(): void {
        let temp: Book;
        this.store.select('selectedBook')
            .subscribe(data => {
                temp = data;
                if (temp !== undefined && temp !== null) {
                    this.selectedBook = data;
                }
            });
    }
}
