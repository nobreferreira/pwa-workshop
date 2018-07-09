import { combineReducers } from 'redux';
import photosReducer from './photos/photosReducer';
import metaReducer from './meta/metaReducer';

const rootReducer = combineReducers({
    photos: photosReducer,
    meta: metaReducer
});

export default rootReducer;
