import { Book } from './book.model';

export interface ManageUsersBooksPickStore {
    targetManageUsersBooks: Book[];
    sourceManageUsersBooks: Book[];
    selectedTargetManageUsersBook: Book;
    selectedSourceMangageUsersBook: Book;
}
