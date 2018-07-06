const initialState = {};
const testReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case 'TEST':
            return {
                ...state,
                test: true
            };
        default:
            return state;
    }
};

export default testReducer;
