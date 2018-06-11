import { Author } from './author.model';
import { User } from './user.model';

export interface Book {
    id: number;
    title: string;
    authors: Array<Author>;
    user: User;
    publishDate: Date;
    createdBy: string;
    createdDate: Date;
    updatedBy: string;
    updatedDate: Date;
}
