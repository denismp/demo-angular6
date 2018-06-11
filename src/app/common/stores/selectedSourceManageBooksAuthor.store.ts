// export const selectedSourceManageBooksAuthor = (state: any = [], { type, payload }) => {
export function selectedSourceManageBooksAuthor(state: any = null, { type, payload }) {
    switch (type) {
        case 'SELECT_PICK_SRC_BOOK_AUTHOR':
            return payload;
        default:
            return state;
    }
}
