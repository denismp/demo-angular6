// export const selectedSourceManageUsersBook = (state: any = [], { type, payload }) => {
export function selectedSourceManageUsersBook(state: any = null, { type, payload }) {
    switch (type) {
        case 'SELECT_PICK_SRC_USER_BOOK':
            return payload;
        default:
            return state;
    }
}
