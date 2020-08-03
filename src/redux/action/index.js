import { USER_LOGIN, FETCHING, MESSAGE, USER_REGISTER,INSTANCE } from '../action/constant';
import { axios } from 'axios';


export function userlogin(values) 
{
    return function(dispatch) {
      dispatch({type: FETCHING});  
      return INSTANCE.post('login',{email:values.email,password:values.password})
        .then(async (response) => {
            if(response.data.status == 'success'){
                dispatch({type:USER_LOGIN,payload:response.data.user});
            }else{
                dispatch({type:MESSAGE, payload:response.data.message});
            }
        }).catch(err => {
              dispatch({type:MESSAGE, payload:err.message});
        });
    };
}

export function userRegister(values) 
{
    return function(dispatch) {
      dispatch({type: FETCHING});  
      return INSTANCE.post('register',
        {
            username:values.username, 
            email:values.email,
            password:values.password, 
            cpassword: values.cpassword
        })
        .then(async (response) => {
            if(response.data.status == 'success'){
                dispatch({type:USER_REGISTER,payload:response.data.user});
            }else{
                dispatch({type:MESSAGE, payload:response.data.message});
            }
        }).catch(err => {
              dispatch({type:MESSAGE, payload:err.message});
        });
    };
}