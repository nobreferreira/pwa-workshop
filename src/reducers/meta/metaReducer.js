import {
    FETCH_PHOTOS_PENDING,
    FETCH_PHOTOS_FULFILLED,
    FETCH_PHOTOS_REJECTED,
    UPLOAD_PHOTO_PENDING,
    UPLOAD_PHOTO_FULFILLED,
    UPLOAD_PHOTO_REJECTED,
    DELETE_PHOTO_PENDING,
    DELETE_PHOTO_FULFILLED,
    DELETE_PHOTO_REJECTED,
    SHOW_FORM,
    HIDE_FORM,
    NETWORK_OFFLINE,
    NETWORK_ONLINE
} from '../../actions/index';

const initialState = {};
const metaReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case SHOW_FORM:
            return {
                ...state,
                showForm: true
            };
        case HIDE_FORM:
            return {
                ...state,
                showForm: false
            };
        case NETWORK_OFFLINE:
            return {
                ...state,
                isOnline: false
            };
        case NETWORK_ONLINE:
            return {
                ...state,
                isOnline: true
            };
        case FETCH_PHOTOS_PENDING:
        case UPLOAD_PHOTO_PENDING:
        case DELETE_PHOTO_PENDING:
            return {
                ...state,
                isLoading: true
            };
        case FETCH_PHOTOS_FULFILLED:
        case FETCH_PHOTOS_REJECTED:
        case UPLOAD_PHOTO_FULFILLED:
        case UPLOAD_PHOTO_REJECTED:
        case DELETE_PHOTO_FULFILLED:
        case DELETE_PHOTO_REJECTED:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
};

export default metaReducer;
