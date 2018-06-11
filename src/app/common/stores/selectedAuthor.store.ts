// export const selectedAuthor = (state: any = [], { type, payload }) => {
export function selectedAuthor(state: any = null, { type, payload }) {
    switch (type) {
        case 'SELECT_AUTHOR':
            return payload;
        default:
            return state;
    }
}
