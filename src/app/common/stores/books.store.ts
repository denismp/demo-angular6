// export const books = (state: any = [], { type, payload }) => {
export function books(state: any = [], { type, payload }) {
    switch (type) {
        case 'ADD_BOOKS':
            return payload;
        case 'CREATE_BOOK':
            if ( state === null ) {
                state = [];
            }
            return [...state, payload];
        case 'UPDATE_BOOK':
            return state.map(item => {
                return item.id === payload.id ? Object.assign({}, item, payload) : item;
            });
        case 'DELETE_BOOK':
            return state.filter(item => {
                return item.id !== payload.id;
            });
        default:
            return state;
    }
}
