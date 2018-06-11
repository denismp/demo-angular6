// export const users = (state: any = [], { type, payload }) => {
export function users(state: any = [], { type, payload }) {
    switch (type) {
        case 'ADD_USERS':
            return payload;
        case 'CREATE_USER':
            if ( state === null ) {
                state = [];
            }
            return [...state, payload];
        case 'UPDATE_USER':
            return state.map(item => {
                return item.id === payload.id ? Object.assign({}, item, payload) : item;
            });
        case 'DELETE_USER':
            return state.filter(item => {
                return item.id !== payload.id;
            });
        default:
            return state;
    }
}
