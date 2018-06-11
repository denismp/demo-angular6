import { Component } from '@angular/core';
import { BreadcrumbService } from './components/breadcrumb/breadcrumb.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app-root';
  constructor(private breadcrumbService: BreadcrumbService) {
    breadcrumbService.addFriendlyNameForRoute('/home', 'Home');
    breadcrumbService.addFriendlyNameForRoute('/home/books', 'Books');
    breadcrumbService.addFriendlyNameForRoute('/home/books/add', 'Add Book');
    breadcrumbService.addFriendlyNameForRoute('/home/books/detail', 'Book');
    breadcrumbService.addFriendlyNameForRoute('/home/book/detail/add', 'Add Book');
    breadcrumbService.addFriendlyNameForRoute('/home/authors', 'Authors');
    breadcrumbService.addFriendlyNameForRoute('/home/authors/add', 'Add Author');
    breadcrumbService.addFriendlyNameForRoute('/home/authors/detail', 'Author');
    breadcrumbService.addFriendlyNameForRoute('/home/authors/detail/add', 'Add Author');
    breadcrumbService.addFriendlyNameForRoute('/home/users', 'Users');
    breadcrumbService.addFriendlyNameForRoute('/home/users/detail', 'User');
    breadcrumbService.addFriendlyNameForRoute('/home/user/detail/add', 'Add User');
    breadcrumbService.addFriendlyNameForRoute('/home/users/add', 'Add User');

    // breadcrumbService.hideRouteRegex('^/home/books/detail/\\d+$');
    // breadcrumbService.hideRouteRegex('^/home/dir1/dir2/dir3$');
  }
}
