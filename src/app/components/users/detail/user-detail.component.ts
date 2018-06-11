import 'rxjs/add/operator/switchMap';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppStore } from '../../../common/models/appstore.model';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { User } from '../../../common/models/user.model';
import { Book } from '../../../common/models/book.model';
import { UsersService } from '../../../common/services/users.service';
import { ManageUsersBooksPickStore } from '../../../common/models/manage-users-books-pick-store.model';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    providers: [UsersService]
})
export class UserDetailComponent implements OnInit {
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

    selectedObservableUser: Observable<User>;
    userForm: FormGroup;
    selectedTargetBooks: Book[];
    selectedSourceBooks: Book[];

    constructor(
        private usersService: UsersService,
        private store: Store<AppStore>,
        private pickStore: Store<ManageUsersBooksPickStore>,
        private router: Router,
        private activatedRouter: ActivatedRoute,
        private location: Location
    ) {
        this.selectedObservableUser = store.select(state => state.selectedUser);
    }

    ngOnInit(): void {
        this.setUser();
        this.getBooks();
        this.userForm = new FormGroup({
            'id': new FormControl({ value: this.selectedUser.id, disabled: true }, Validators.required),
            'name': new FormControl({ value: this.selectedUser.name, disabled: false }, Validators.required),
            'email': new FormControl({ value: this.selectedUser.email, disabled: false }, Validators.required)
        });
    }

    setUser(): void {
        this.store.select('selectedUser')
            .subscribe(data => { this.selectedUser = data; });
    }

    getBooks(): void {
        this.pickStore.select('targetManageUsersBooks')
            .subscribe(data => {
                this.selectedTargetBooks = data;
            });
        this.pickStore.select('sourceManageUsersBooks').subscribe(data => {
            this.selectedSourceBooks = data;
        });
    }

    getFormData(): void {
        this.selectedUser.name = this.userForm.get('name').value;
        this.selectedUser.email = this.userForm.get('email').value;
        this.selectedUser.id = this.userForm.get('id').value;
    }

    addUser( event: any ): void {
        console.log('addUser(): called...');
        this.store.dispatch({ type: 'SELECT_USER', payload: this.selectedUser });
        this.router.navigate(['/home/user/detail/add']);
    }

    onSubmit(): void {
        this.getFormData();

        this.usersService.updateUser(this.selectedUser);

        this.location.back();
        // this.router.navigate(['/home/books']);
    }

    onCancel(): void {
        this.location.back();
    }
}
