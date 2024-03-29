import {
    COUNTRIES,
    STATES,
    PLACES_RESET
} from '../action/constants';
import storage from 'redux-persist/lib/storage';

const initialState = {
    countries:[],
    states:[],
    addressess:[]
};

export function PlacesReducer(state = initialState, action)
{
    if(action.type === COUNTRIES)
    {
        return Object.assign({}, state, {
            countries: action.payload.countries
        });
    }
    if(action.type === STATES)
    {
        return Object.assign({}, state, {
            states: action.payload.states
        });
    }
    if(action.type === PLACES_RESET)
    {
        storage.removeItem('persist:root');
        return Object.assign({}, state, {
            countries:[],
            states:[],
            addressess:[]
        });
    }
    return state;

};

//export default RootReducer;