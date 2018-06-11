import { Item } from './item.model';
import { Widget } from './widget.model';
import { Book } from './book.model';
import { HomeScreen } from './home-screen.model';
import { Author } from './author.model';
import { User } from './user.model';

export interface AppStore {
  selectedHome: HomeScreen;
  books: Book[];
  selectedBook: Book;
  authors: Author[];
  selectedAuthor: Author;
  users: User[];
  selectedUser: User;
  items: Item[];
  selectedItem: Item;
  widgets: Widget[];
  selectedWidget: Widget;
}
