import { USER_LOGIN, SURE_REQUEST,FETCHING,VAULT, MESSAGE, USER_REGISTER } from '../action/constant';

const initalState = {
    user : {},
    isFetching: false,
    Vault : {},
    VaultHistory : [],
    SureRequest : [],
    Message:""
};

export function RootReducer(state = initalState, action)
{
    if(action.type == USER_LOGIN)
    {
        return Object.assign({}, state, {
            user: state.user.concat(action.payload)
          });
    }
    else if(action.type == USER_REGISTER)
    {
        return Object.assign({}, state, {
            user: state.user.concat(action.payload)
          });
    }
    else if(action.type == SURE_REQUEST)
    {
        return Object.assign({}, state, {
            SureRequest: state.SureRequest.concat(action.payload)
          });
    }
    else if(action.type == FETCHING)
    {
        return Object.assign({}, state, {
            isFetching: !state.isFetching
          });
    }
    else if(action.type == VAULT)
    {
          return Object.assign({}, state, {
            Vault: state.Vault.concat(action.payload)
          });
    }
    else if(action.type == MESSAGE)
    {
        return Object.assign({}, state, {
            Message: state.Message.concat(action.payload)
          });
    }
    return state;
}
