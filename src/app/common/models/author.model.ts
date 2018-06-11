import { Book } from './book.model';

export interface Author {
    id: number;
    name: string;
    books: Array<Book>;
    createdBy: string;
    createdDate: Date;
    updatedBy: string;
    updatedDate: Date;
}
