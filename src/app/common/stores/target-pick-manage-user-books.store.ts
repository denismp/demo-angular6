// export const targetManageUsersBooks = (state: any = [], { type, payload }) => {
export function targetManageUsersBooks(state: any = [], { type, payload }) {
    switch (type) {
        case 'ADD_PICK_TRGT_USER_BOOKS':
            return payload;
        case 'CREATE_PICK_TRGT_USER_BOOK':
            if (state === null) {
                state = [];
            }
            return [...state, payload];
        case 'UPDATE_APICK_TRGT_USER_BOOK':
            return state.map(item => {
                return item.id === payload.id ? Object.assign({}, item, payload) : item;
            });
        case 'DELETE_PICK_TRGT_USER_BOOK':
            return state.filter(item => {
                return item.id !== payload.id;
            });
        case 'RESET_PICK_TRGT_USER_BOOKS':
            state = [];
            return state;
        default:
            return state;
    }
}
