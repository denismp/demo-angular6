// export const selectedHome = (state: any = [], { type, payload }) => {
export function selectedHome(state: any = null, { type, payload }) {
    switch (type) {
        case 'SELECT_HOME':
            return payload;
        default:
            return state;
    }
}
