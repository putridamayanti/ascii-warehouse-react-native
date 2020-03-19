import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './app/reducers';

const middleware = applyMiddleware(thunk);

export default createStore(rootReducer, middleware);
