import { createStore, compose, applyMiddleware } from 'redux';
import { RootReducer } from '../reducer/index';
import thunk from 'redux-thunk';

const middlewareEnhancers = applyMiddleware(thunk);
const composedEnhancers = compose(middlewareEnhancers)

const store = createStore(RootReducer,composedEnhancers);

export default store;
