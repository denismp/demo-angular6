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
import { UsersService } from '../../../common/services/users.service';
import { User } from '../../../common/models/user.model';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    providers: [UsersService, BooksService]
})
export class AddUserComponent implements OnInit {
    selectedTargetUsers: User[];
    selectedSourceUsers: User[];
    userForm: FormGroup;
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
    emptySelectedUser: User = {
        id: null,
        email: '',
        name: '',
        books: null,
        createdBy: '',
        createdDate: null,
        updatedBy: '',
        updatedDate: null
    };
    selectedObservableUser: Observable<User>;

    constructor(
        private usersService: UsersService,
        private store: Store<AppStore>,
        private router: Router,
        private activatedRouter: ActivatedRoute,
        private location: Location
    ) {
        this.selectedObservableUser = store.select(state => state.selectedUser);
    }

    ngOnInit(): void {
        this.userForm = new FormGroup({
            'name': new FormControl(this.selectedUser.name, Validators.required),
            'email': new FormControl(this.selectedUser.email, Validators.required)
        });
    }

    onSubmit(): void {
        console.log('onSubmit(): called...');

        this.getFormData();
        this.usersService.createUser(this.selectedUser);
        // this.store.dispatch({type: 'CREATE_AUTHOR', payload: this.selectedAuthor});
        this.location.back();
    }

    onCancel(): void {
        console.log('onCancel(): called...');
        // clean up stuff here
        this.router.navigate(['/home/users']);
    }

    getFormData(): void {
        this.selectedUser.name = this.userForm.get('name').value;
        this.selectedUser.email = this.userForm.get('email').value;
        this.store.dispatch({ type: 'SELECT_USER', payload: this.selectedUser });
        this.getUser();
    }

    getUser(): void {
        let temp: User;
        this.store.select('selectedUser')
            .subscribe(data => {
                temp = data;
                if (temp !== undefined && temp !== null ) {
                    this.selectedUser = data;
                }
            });
    }
}
