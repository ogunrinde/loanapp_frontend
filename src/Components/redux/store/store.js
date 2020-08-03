import { createStore,applyMiddleware, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import { RootReducer } from '../reducer/index';
import { PlacesReducer } from '../reducer/places.js';
import {CreateVaultReducer } from '../reducer/createvault';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';

const reducers = combineReducers({
    root:RootReducer,
    places:PlacesReducer,
    createvault:CreateVaultReducer
});

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

let store = createStore(persistedReducer, applyMiddleware(thunk));
let persistor = persistStore(store);

export {
    store,
    persistor
}


// let store = createStore(persistedReducer, applyMiddleware(thunk));
// export default store;
