import { combineReducers } from 'redux';
import ProductReducer from './ProductReducer';
import AdsReducer from './AdsReducer';

const reducers = {
    productStore: ProductReducer,
    adsStore    : AdsReducer
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
