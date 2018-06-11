// export const selectedTargetManageBooksAuthor = (state: any = [], { type, payload }) => {
export function selectedTargetManageBooksAuthor(state: any = null, { type, payload }) {
    switch (type) {
        case 'SELECT_PICK_TRGT_BOOK_AUTHOR':
            return payload;
        default:
            return state;
    }
}
