// export const targetBooksAuthors = (state: any = [], { type, payload }) => {
export function targetManageBooksAuthors(state: any = [], { type, payload }) {
    switch (type) {
        case 'ADD_PICK_TRGT_BOOK_AUTHORS':
            return payload;
        case 'CREATE_PICK_TRGT_BOOK_AUTHOR':
            if (state === null) {
                state = [];
            }
            return [...state, payload];
        case 'UPDATE_APICK_TRGT_BOOK_AUTHOR':
            return state.map(item => {
                return item.id === payload.id ? Object.assign({}, item, payload) : item;
            });
        case 'DELETE_PICK_TRGT_BOOK_AUTHOR':
            return state.filter(item => {
                return item.id !== payload.id;
            });
        case 'RESET_PICK_TRGT_BOOK_AUTHORS':
            state = [];
            return state;
        default:
            return state;
    }
}
