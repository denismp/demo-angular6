// export const sourceManageUsersBooks = (state: any = [], { type, payload }) => {
export function sourceManageUsersBooks(state: any = [], { type, payload }) {
    switch (type) {
        case 'ADD_PICK_SRC_USER_BOOKS':
            return payload;
        case 'CREATE_PICK_SRC_USER_BOOK':
            if (state === null) {
                state = [];
            }
            return [...state, payload];
        case 'UPDATE_APICK_SRC_USER_BOOK':
            return state.map(item => {
                return item.id === payload.id ? Object.assign({}, item, payload) : item;
            });
        case 'DELETE_PICK_SRC_USER_BOOK':
            return state.filter(item => {
                return item.id !== payload.id;
            });
        case 'RESET_PICK_SRC_USER_BOOK':
            state = [];
            return state;
        default:
            return state;
    }
}
