import {
    AVAILABLEFUND,
    REQUESTAMOUNT,
    INTEREST,
    LOANTENOR,
    BORROWER,
    OTHERS,
    CREATEVAULT_RESET
} from '../action/constants';
import storage from 'redux-persist/lib/storage';

const initialState = {
    fundamount:'',
    availablefrom:'',
    availableto:'',
    maxRequestAmount:'',
    minRequestAmount:'',
    minInterestperMonth:'',
    maxInterestperMonth:'',
    borrower_country_id:'',
    borrower_state_id:'',
    borrower_city_id:'',
    email_must_be_verified:'',
    phonenumber_must_be_verified:'',
    bvn_must_be_verified:'',
    minloantenor:'',
    maxloantenor:''
};

export function CreateVaultReducer(state = initialState, action)
{
    if(action.type == AVAILABLEFUND)
    {
        return Object.assign({}, state, {
            fundamount: action.data.fundamount,
            availablefrom:action.data.availablefrom,
            availableto:action.data.availableto
        });
    }
    if(action.type == REQUESTAMOUNT)
    {
        return Object.assign({}, state, {
            maxRequestAmount: action.data.maxRequestAmount,
            minRequestAmount:action.data.minRequestAmount
        });
    }
    if(action.type == INTEREST)
    {
        return Object.assign({}, state, {
            minInterestperMonth: action.data.minInterestperMonth,
            maxInterestperMonth:action.data.maxInterestperMonth
        });
    }
    if(action.type == LOANTENOR)
    {
        return Object.assign({}, state, {
            maxloantenor: action.data.maxloantenor,
            minloantenor:action.data.minloantenor
        });
    }
    if(action.type == BORROWER)
    {
        return Object.assign({}, state, {
            borrower_country_id: action.data.borrower_country_id,
            borrower_state_id:action.data.borrower_state_id,
            borrower_city_id: action.data.borrower_city_id
        });
    }
    if(action.type == OTHERS)
    {
        return Object.assign({}, state, {
            email_must_be_verified: action.data.email_must_be_verified,
            phonenumber_must_be_verified:action.data.phonenumber_must_be_verified,
            bvn_must_be_verified:action.data.bvn_must_be_verified
        });
    }
    if(action.type == CREATEVAULT_RESET)
    {
        storage.removeItem('persist:root');
        return Object.assign({}, state, {
            fundamount:'',
            availablefrom:'',
            availableto:'',
            maxRequestAmount:'',
            minRequestAmount:'',
            minInterestperMonth:'',
            maxInterestperMonth:'',
            borrower_country_id:'',
            borrower_state_id:'',
            borrower_city_id:'',
            email_must_be_verified:'',
            phonenumber_must_be_verified:'',
            bvn_must_be_verified:'',
            minloantenor:'',
            maxloantenor:''
        });
    }
    return state;

};


//export default RootReducer;