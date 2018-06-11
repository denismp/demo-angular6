import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreLogMonitorModule, useLogMonitor } from '@ngrx/store-log-monitor';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { RouterModule } from '@angular/router';

import { routes } from './routes/routes';

import { DataTableModule, SharedModule, ButtonModule, TabViewModule, PickListModule } from 'primeng/primeng';
import { routingModule, appRoutingProviders } from './routes/routes';

import { Ng5BreadcrumbModule } from './components/breadcrumb/breadcrumb.module';
import { HomeScreenComponent } from './components/home/home-screen.component';

import { books } from './common/stores/books.store';
import { selectedBook } from './common/stores/selectedBook.store';
import { selectedHome } from './common/stores/selectedHome.store';
import { authors } from './common/stores/authors.store';
import { selectedAuthor } from './common/stores/selectedAuthor.store';
import { users } from './common/stores/users.store';
import { selectedUser } from './common/stores/selectedUser.store';
import { sourceManageBooksAuthors } from './common/stores/source-pick-manage-books-authors.store';
import { selectedSourceManageBooksAuthor } from './common/stores/selectedSourceManageBooksAuthor.store';
import { targetManageBooksAuthors } from './common/stores/target-pick-manage-book-authors.store';
import { selectedTargetManageBooksAuthor } from './common/stores/selectedTargetManageBooksAuthor.store';
import { targetManageUsersBooks } from './common/stores/target-pick-manage-user-books.store';
import { sourceManageUsersBooks } from './common/stores/source-pick-manage-user-books.store';
import { selectedSourceManageUsersBook } from './common/stores/selectedSourceManageUsersBook.store';
import { selectedTargetManageUsersBook } from './common/stores/selectedTargetManageUsersBook.store';

import { BooksComponent } from './components/books/list/books.component';
import { BooksListComponent } from './components/books/list/books-list.component';
import { BookDetailComponent } from './components/books/detail/book-detail.component';
import { AddBookComponent } from './components/books/add/add-book.component';
import { AuthorsListComponent } from './components/authors/list/authors-list.component';
import { AuthorsComponent } from './components/authors/list/authors.component';
import { AuthorDetailComponent } from './components/authors/detail/author-detail.component';
import { AddAuthorComponent } from './components/authors/add/add-author.component';
import { UsersComponent } from './components/users/list/users.component';
import { UsersListComponent } from './components/users/list/users-list.component';
import { UserDetailComponent } from './components/users/detail/user-detail.component';
import { AddUserComponent } from './components/users/add/add-user.component';

import { BooksAuthorPickListComponent } from './components/books/picklist/book-author-pick-list.component';
import { UserBooksPickListComponent } from './components/users/picklist/user-book-pick-list.component';

import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HomeScreenComponent,
    BooksComponent,
    BooksListComponent,
    BookDetailComponent,
    AuthorsListComponent,
    AuthorsComponent,
    AuthorDetailComponent,
    UsersComponent,
    UsersListComponent,
    UserDetailComponent,
    AddUserComponent,
    AddAuthorComponent,
    AddBookComponent,
    BooksAuthorPickListComponent,
    UserBooksPickListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    DataTableModule,
    TabViewModule,
    PickListModule,
    SharedModule,
    ButtonModule,
    Ng5BreadcrumbModule.forRoot(),
    RouterModule.forRoot(routes, { enableTracing: true }),
    StoreModule.forRoot({
      selectedHome,
      books,
      selectedBook,
      authors,
      selectedAuthor,
      users,
      selectedUser,
      sourceManageBooksAuthors,
      selectedSourceManageBooksAuthor,
      targetManageBooksAuthors,
      selectedTargetManageBooksAuthor,
      targetManageUsersBooks,
      sourceManageUsersBooks,
      selectedTargetManageUsersBook,
      selectedSourceManageUsersBook
    }),
    StoreLogMonitorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
