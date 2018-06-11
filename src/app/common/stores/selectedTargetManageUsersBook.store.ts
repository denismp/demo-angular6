// export const selectedTargetManageUsersBook = (state: any = [], { type, payload }) => {
export function selectedTargetManageUsersBook(state: any = null, { type, payload }) {
    switch (type) {
        case 'SELECT_PICK_TRGT_USER_BOOK':
            return payload;
        default:
            return state;
    }
}
