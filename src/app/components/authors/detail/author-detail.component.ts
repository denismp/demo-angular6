import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppStore } from '../../../common/models/appstore.model';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Author } from '../../../common/models/author.model';
import { AuthorsService } from '../../../common/services/authors.service';

@Component({
    selector: 'app-author-detail',
    templateUrl: './author-detail.component.html',
    providers: [AuthorsService]
})
export class AuthorDetailComponent implements OnInit {
    selectedAuthor: Author = {
        id: null,
        name: '',
        books: null,
        createdBy: '',
        createdDate: null,
        updatedBy: '',
        updatedDate: null
    };

    selectedObservableAuthor: Observable<Author>;

    constructor(
        private booksService: AuthorsService,
        private store: Store<AppStore>,
        private router: Router,
        private activatedRouter: ActivatedRoute
    ) {
        this.selectedObservableAuthor = store.select(state => state.selectedAuthor);
    }

    ngOnInit(): void {
        this.setAuthor();
    }

    setAuthor(): void {
        this.store.select('selectedAuthor')
            .subscribe(data => { this.selectedAuthor = data; });
    }

    addAuthor( event: any ): void {
        console.log('addAuthor(): called...');
        this.router.navigate(['/home/authors/detail/add']);
    }
}
