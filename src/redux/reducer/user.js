const initialState = {};
const user = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            const { payload } = action;
            return {
                ...payload
            };
        case 'REMOVE_USER': 
            return {};
        default:
            return state;
    }
}

export default user;