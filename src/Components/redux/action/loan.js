import {  
    REQUEST_STATUS,
    PENDINGAPPROVALS,
    REJECTLOANREQUEST,
    LOANTOBEDISBURSED,
    APPROVEDLOANS,
    DISBURSEDLOANS,
    PATH

} from './constants';
import { Success, Error } from '../../Message/message';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
//import { store } from 'react-notifications-component';
import { store } from '../store/store';

//const PATH = 'http://localhost:8000/api/';
//const PATH = 'http://surebanker.online/surebanker/api/';
const AUTHINSTANCE = axios.create({
    baseURL: `${PATH}`,
    timeout: 20000,
    headers: {
              'Content-Type': 'application/json', 
               'Accept': 'application/json',
               'Authorization': `Bearer ${store.getState().root.token}`
            }
});
// const AUTHINSTANCE = axios.create({
//     baseURL: 'http://localhost:8000/api/',
//     timeout: 20000,
//     headers: {
//               'Content-Type': 'application/json', 
//                'Accept': 'application/json',
//                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
//             }
// });

export function GetpendingApprovals()
{
    return function(dispatch){
        dispatch({ type: REQUEST_STATUS  });
        const AUTH = axios.create({
            baseURL: `${PATH}`,
            timeout: 20000,
            headers: {
                      'Content-Type': 'application/json', 
                       'Accept': 'application/json',
                       'Authorization': `Bearer ${store.getState().root.token}`
                    }
        });
        return AUTH.get(`getLenderpendingloanapprovals`)
        .then(async (response) => {
            console.log(response.data);
            dispatch({ type: REQUEST_STATUS  });
            if(response.data.status === 'success'){
                dispatch({ type: PENDINGAPPROVALS, payload: response.data})
            }else {
                Error('Failed Attempt',response.data.error);
            }
        }).catch(err => {
            console.log(err);
            dispatch({ type: REQUEST_STATUS  });
            alert(JSON.stringify(err.response));
            if(err.response) Error('Failed Attempt','Error whiling processing data...try again later');
            //else if(err.request) Error('Failed Attempt', JSON.stringify(err.request));
            //else Error('Failed Attempt',err.message);

        }); 
    }
}
export function GetDisbursedLoans()
{
    return function(dispatch){
        dispatch({ type: REQUEST_STATUS  });
        const AUTH = axios.create({
            baseURL: `${PATH}`,
            timeout: 20000,
            headers: {
                      'Content-Type': 'application/json', 
                       'Accept': 'application/json',
                       'Authorization': `Bearer ${store.getState().root.token}`
                    }
        });
        return AUTH.get(`getdisbursedloans`)
        .then(async (response) => {
            console.log(response.data);
            dispatch({ type: REQUEST_STATUS  });
            if(response.data.status === 'success'){
                dispatch({ type: DISBURSEDLOANS, payload: response.data})
            }else {
                Error('Failed Attempt',response.data.error);
            }
        }).catch(err => {
            console.log(err);
            dispatch({ type: REQUEST_STATUS  });
            if(err.response) Error('Failed Attempt','Error whiling processing data...try again later');
            else if(err.request) Error('Failed Attempt', JSON.stringify(err.request));
            else Error('Failed Attempt',err.message);

        }); 
    }
}

export function GetRejectedLoanRequest()
{
    return function(dispatch){
        dispatch({ type: REQUEST_STATUS  });
        const AUTH = axios.create({
            baseURL: `${PATH}`,
            timeout: 20000,
            headers: {
                      'Content-Type': 'application/json', 
                       'Accept': 'application/json',
                       'Authorization': `Bearer ${store.getState().root.token}`
                    }
        });
        return AUTH.get(`getrejectedloanreject`)
        .then(async (response) => {
            console.log(response.data);
            dispatch({ type: REQUEST_STATUS  });
            if(response.data.status === 'success'){
                dispatch({ type: REJECTLOANREQUEST, payload: response.data})
            }else {
                Error('Failed Attempt',response.data.error);
            }
        }).catch(err => {
            console.log(err);
            dispatch({ type: REQUEST_STATUS  });
            if(err.response) Error('Failed Attempt','Error whiling processing data...try again later');
            else if(err.request) Error('Failed Attempt', JSON.stringify(err.request));
            else Error('Failed Attempt',err.message);

        }); 
    }
}

export function GetApprovedLoans()
{
    return function(dispatch){
        dispatch({ type: REQUEST_STATUS  });
        const AUTH = axios.create({
            baseURL: `${PATH}`,
            timeout: 20000,
            headers: {
                      'Content-Type': 'application/json', 
                       'Accept': 'application/json',
                       'Authorization': `Bearer ${store.getState().root.token}`
                    }
        });
        return AUTH.get(`getLenderapprovedLoan`)
        .then(async (response) => {
            console.log(response.data);
            dispatch({ type: REQUEST_STATUS  });
            if(response.data.status === 'success'){
                dispatch({ type: APPROVEDLOANS, payload: response.data})
            }else {
                Error('Failed Attempt',response.data.error);
            }
        }).catch(err => {
            console.log(err);
            dispatch({ type: REQUEST_STATUS  });
            if(err.response) Error('Failed Attempt','Error whiling processing data...try again later');
            else if(err.request) Error('Failed Attempt', JSON.stringify(err.request));
            else Error('Failed Attempt',err.message);

        }); 
    }
}