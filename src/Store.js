import {compose, createStore, applyMiddleware} from 'redux';
import reducers from './reducers/Reducers';
import thunk from 'redux-thunk';
import {persistStore, autoRehydrate} from 'redux-persist';

const middleware = applyMiddleware(thunk);

export default createStore(reducers, undefined, compose(middleware, autoRehydrate()));
