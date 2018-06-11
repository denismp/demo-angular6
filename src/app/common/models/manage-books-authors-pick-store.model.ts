import { Author } from './author.model';

export interface ManageBooksAuthorsPickStore {
    targetManageBooksAuthors: Author[];
    sourceManageBooksAuthors: Author[];
    selectedTargetManageBooksAuthor: Author;
    selectedSourceMangageBooksAuthor: Author;
}
