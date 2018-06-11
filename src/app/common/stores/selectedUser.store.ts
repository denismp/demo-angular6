// export const selectedUser = (state: any = [], { type, payload }) => {
export function selectedUser(state: any = null, { type, payload }) {
    switch (type) {
        case 'SELECT_USER':
            return payload;
        default:
            return state;
    }
}
