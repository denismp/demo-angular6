// export const authors = (state: any = [], { type, payload }) => {
export function authors(state: any = [], { type, payload }) {
    switch (type) {
        case 'ADD_AUTHORS':
            return payload;
        case 'CREATE_AUTHOR':
            if ( state === null ) {
                state = [];
            }
            return [...state, payload];
        case 'UPDATE_AUTHOR':
            return state.map(item => {
                return item.id === payload.id ? Object.assign({}, item, payload) : item;
            });
        case 'DELETE_AUTHOR':
            return state.filter(item => {
                return item.id !== payload.id;
            });
        default:
            return state;
    }
}
