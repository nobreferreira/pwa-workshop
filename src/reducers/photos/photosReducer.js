import { orderBy } from 'lodash';

import { FETCH_PHOTOS_FULFILLED } from '../../actions/index';

const initialState = {};
const photosReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case FETCH_PHOTOS_FULFILLED:
            return {
                ...state,
                photosList: orderBy(action.payload.data, 'updateTime', 'desc')
            };
        default:
            return state;
    }
};

export default photosReducer;
