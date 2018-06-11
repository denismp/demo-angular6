import 'rxjs/add/operator/switchMap';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppStore } from '../../../common/models/appstore.model';
import { ManageBooksAuthorsPickStore } from '../../../common/models/manage-books-authors-pick-store.model';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Book } from '../../../common/models/book.model';
import { Author } from '../../../common/models/author.model';
import { BooksService } from '../../../common/services/books.service';

@Component({
    selector: 'app-book-detail',
    templateUrl: './book-detail.component.html',
    providers: [BooksService]
})
export class BookDetailComponent implements OnInit {
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

    selectedObservableBook: Observable<Book>;
    bookForm: FormGroup;
    selectedTargetAuthors: Author[];
    selectedSourceAuthors: Author[];

    constructor(
        private booksService: BooksService,
        private store: Store<AppStore>,
        private pickStore: Store<ManageBooksAuthorsPickStore>,
        private router: Router,
        private activatedRouter: ActivatedRoute,
        private location: Location
    ) {
        this.selectedObservableBook = store.select(state => state.selectedBook);
    }

    ngOnInit(): void {
        this.setBook();
        this.getAuthors();
        this.bookForm = new FormGroup({
            'id': new FormControl({ value: this.selectedBook.id, disabled: true }, Validators.required),
            'title': new FormControl({ value: this.selectedBook.title, disabled: false }, Validators.required),
            'publishDate': new FormControl({ value: this.selectedBook.publishDate, disabled: false }, Validators.required)
        });
    }

    setBook(): void {
        this.store.select('selectedBook')
            .subscribe(data => { this.selectedBook = data; });
    }

    addBook(event: any): void {
        console.log('addBook(): called...');
        this.store.dispatch({ type: 'SELECT_BOOK', payload: this.selectedBook });
        this.router.navigate(['/home/book/detail/add']);
    }

    getAuthors(): void {
        this.pickStore.select('targetManageBooksAuthors')
            .subscribe(data => {
                this.selectedTargetAuthors = data;
            });
        this.pickStore.select('sourceManageBooksAuthors').subscribe(data => {
            this.selectedSourceAuthors = data;
        });
    }

    getFormData(): void {
        this.selectedBook.title = this.bookForm.get('title').value;
        this.selectedBook.publishDate = this.bookForm.get('publishDate').value;
        this.selectedBook.id = this.bookForm.get('id').value;
    }

    onSubmit(): void {
        this.getFormData();

        this.booksService.updateBook(this.selectedBook);

        this.location.back();
        // this.router.navigate(['/home/books']);
    }

    onCancel(): void {
        this.location.back();
    }
}
