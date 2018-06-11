// import { BooksListComponent } from '../components/book/list/books-list-component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeScreenComponent } from '../components/home/home-screen.component';
import { BooksComponent } from '../components/books/list/books.component';
import { BookDetailComponent } from '../components/books/detail/book-detail.component';
import { AddBookComponent } from '../components/books/add/add-book.component';
import { AuthorsComponent } from '../components/authors/list/authors.component';
import { AuthorDetailComponent } from '../components/authors/detail/author-detail.component';
import { AddAuthorComponent } from '../components/authors/add/add-author.component';
import { UsersComponent } from '../components/users/list/users.component';
import { UserDetailComponent } from '../components/users/detail/user-detail.component';
import { AddUserComponent } from '../components/users/add/add-user.component';

export const routes = [
    { path: '', component: HomeScreenComponent },
    { path: '*', component: HomeScreenComponent },
    // { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home', component: HomeScreenComponent },
    { path: 'home/books', component: BooksComponent },
    { path: 'home/books/add', component: AddBookComponent },
    { path: 'home/books/detail', component: BookDetailComponent },
    { path: 'home/book/detail/add', component: AddUserComponent },
    { path: 'home/authors', component: AuthorsComponent },
    { path: 'home/authors/add', component: AddAuthorComponent },
    { path: 'home/authors/detail', component: AuthorDetailComponent },
    { path: 'home/authors/detail/add', component: AddAuthorComponent },
    { path: 'home/users', component: UsersComponent },
    { path: 'home/users/detail', component: UserDetailComponent },
    { path: 'home/user/detail/add', component: AddUserComponent },
    { path: 'home/users/add', component: AddUserComponent }
    // { path: '**', component, PageNotFoundComponent }
];

export const appRoutingProviders: any[] = [];
export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);
