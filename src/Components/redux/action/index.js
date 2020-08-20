import { 
    USER_LOGIN, 
    USER_REGISTER, 
    REQUEST_STATUS, 
    PLACES, 
    COUNTRIES,
    STATES, 
    USERBASICDETAILS,
    USERHOMEADDRESS,
    USEROFFICEADDRESS,
    USERMEDIAACCOUNT,
    MAKEREQUEST,
    GETPROFILE,
    GETVAULT,
    PENDINGAPPROVALS,
    TOBEDISBURSED,
    UPDATESUREDEAL,
    LOANSDISBURSED,
    MYAPPROVEDLOANS,
    MYPENDINGAPPROVALLOANS,
    ANALYTICS,
    COMPLETEUSERPROFILE,
    NEXTPHASE,
    USERBANKINFORMATION,
    MYVAULT,
    MYVAULTTRANSACTIONS,
    CREATEVAULT_RESET,
    MAIN_RESET,
    PLACES_RESET,
    ALLLOANSREQUEST,
    REPAYMENT_BORROWER,
    REPAYMENT_LENDER,
    VIEWREPAYMENTONREQUESTID,
    ALL_LENDER_OFFERS,
    ALL_BORROWER_REQUESTS,
    CONNECTWITHBORROWER,
    BORROWER_OVERDUES,
    LENDER_OVERDUES,
    LOANSRECEIVED,
    BORROWER_PAYMENT_SCHEDULES,
    LENDER_PAYMENT_SCHEDULES,
    VERIFY_EMAIL,
    PATH,
    VERIFY_PHONE,
    CODES,
    CITIES,
    VAULT_CREATED,
    SURECONNECT,
    PAYMENTANALYTICS

} from './constants';
import { store } from '../store/store';
import { Success, Error } from '../../Message/message';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
//import { store } from 'react-notifications-component';

//const PATH = 'http://surebanker.online/surebanker/api/';
//const PATH = 'http://localhost:8000/api/';
const INSTANCE = axios.create({
    baseURL: `${PATH}`,
    timeout: 200000,
    headers: {
              'Content-Type': 'application/json', 
               'Accept': 'application/json'
            }
});

const AUTHINSTANCE = axios.create({
    baseURL: `${PATH}`,
    timeout: 20000,
    headers: {
              'Content-Type': 'application/json', 
               'Accept': 'application/json',
               'Authorization': `Bearer ${store.getState().root.token}`
            }
});

//alert(JSON.stringify(store.getState().root.token));

const Analytics = (schedules,dispatch) => {
    //alert(JSON.stringify(schedules));
    if(schedules.length > 0)
    {
        let paid = 0;
        let overdues = 0;
        let totalpending = 0;
        let nextpaydate = '';
        let data = {paid : 0, overdues : 0, totalpending : 0, nextpaydate : 0 };
        for (let r = 0; r < schedules.length; r++)
        {
            let paydate = new Date(schedules[r].dueDate).getTime()
            let todaystring = new Date().toISOString().slice(0,10);
            let today = new Date(todaystring).getTime();
            
            //alert(schedules[r].dueDate);
            if(today > paydate && schedules[r].status.toLowerCase() == 'pending')
            {
                overdues += parseFloat(schedules[r].expected_amount_to_paid);
            }
            if(schedules[r].status == 'paid')
            {
                paid += schedules[r].expected_amount_to_paid;
            }
            if(schedules[r].status.toLowerCase() == 'pending')
            {
                totalpending += parseFloat(schedules[r].expected_amount_to_paid);
            }
            if(paydate >= today && nextpaydate == '' && schedules[r].status.toLowerCase() == 'pending')
            {
                //alert(schedules[r].dueDate);
                nextpaydate = schedules[r].dueDate;
            }
        }
      data = {paid : paid, overdues : overdues, totalpending : totalpending, nextpaydate : nextpaydate };
      //alert(JSON.stringify(data));
      dispatch({ type: PAYMENTANALYTICS, payload:data  }); 
    }
}

export function requeststatus()
{
    return {
        type: REQUEST_STATUS
    }
}
export function ViewRepaymentsOnRequestId(payload)
{
    return {
        type: VIEWREPAYMENTONREQUESTID,
        payload
    }
}
export function SetPaymentSchedules()
{
    let data = {schedules : []};
    return {
        type: VIEWREPAYMENTONREQUESTID,
        payload:data
    }
}
export function updateloginstatus(payload)
{
    return {
        type: USER_LOGIN,
        payload
    }
};

export function updateregisterstatus (payload)
{
    return {
        type:USER_REGISTER,
        payload
    }
};


export function user_attempt_login(data,history,from)
{
    return function(dispatch,getState)
    {
        
        dispatch({ type: REQUEST_STATUS  });
        return INSTANCE.post('login',{
                email:data.email,
                password:data.password
        })
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            if(response.data.status === 'success'){
                //console.log(response.data);
                //alert(JSON.stringify(response.data));
                await dispatch({ type: USER_LOGIN, payload: response.data });
                Success('Login Status','Login Successful');
                sessionStorage.setItem("token",response.data.access_token);
                history.replace(from);
                //console.log(response.data);
            }else{  
                Error("Login Status", response.data.message);
            }
        }).catch(err => {
            dispatch({ type: REQUEST_STATUS  });
            if(err.response) Error('Failed Attempt','Error whiling processing data...try again later');
            else if(err.request) Error('Failed Attempt', 'Error whiling processing data...try again later');
            //else Error('Failed Attempt',err.message);   
        }); 
    }
}

export function user_attempt_register(data,props) {
    return function(dispatch){
        dispatch({ type: REQUEST_STATUS  });
        return INSTANCE.post('register',{
            name:data.name, 
            email:data.email,
            password:data.pass, 
            password_confirmation:data.cpass
        })
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            if(response.data.status === 'success'){
                await dispatch({ type: USER_REGISTER, payload: response.data });
                Success('Account Creation','Registration Successful');
                sessionStorage.setItem("token",response.data.access_token);
                //console.log(response.data);
                //props.history.push('/home/profile');
            }else {
                Error('Failed Attempt',response.data.error);
            }
        }).catch(err => {
            //console.log(err);
            dispatch({ type: REQUEST_STATUS  });
            if(err.response) Error('Failed Attempt','Error whiling processing data...try again later');
            else if(err.request) Error('Failed Attempt', 'Error whiling processing data...try again later');

        }); 
    }
};

export function places()
{
   
    return function(dispatch){
        dispatch({ type: REQUEST_STATUS  });
        return INSTANCE.get('countries')
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            if(response.data.status === 'success'){
                console.log(response.data);
                dispatch({ type: COUNTRIES, payload: response.data });
                //alert(JSON.stringify(response.data));
            }else {
                
            }
        }).catch(err => {
            dispatch({ type: REQUEST_STATUS  });
            if(err.response) Error('Failed Attempt','Error whiling processing data...try again later');
            else if(err.request) Error('Failed Attempt', 'Error whiling processing data...try again later');
            //console.log(err);

        }); 
    }
}

export function countrystates(id)
{
    return function(dispatch){
        dispatch({ type: REQUEST_STATUS  });
        return INSTANCE.get(`state/${id}`)
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            if(response.data.status === 'success'){
                dispatch({ type: STATES, payload: response.data });
                //alert(JSON.stringify(response.data));
            }else {
                
            }
        }).catch(err => {
            dispatch({ type: REQUEST_STATUS  });
            if(err.response) Error('Failed Attempt','Error whiling processing data...try again later');
            else if(err.request) Error('Failed Attempt', JSON.stringify(err.request));
            else Error('Failed Attempt',err.message);

        }); 
    }
}

export function Getcities(id)
{
    return function(dispatch){
        dispatch({ type: REQUEST_STATUS  });
        return INSTANCE.get(`city/${id}`)
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            if(response.data.status === 'success'){
                dispatch({ type: CITIES, payload: response.data });
                //alert(JSON.stringify(response.data));
            }else {
                
            }
        }).catch(err => {
            dispatch({ type: REQUEST_STATUS  });
            if(err.response) Error('Failed Attempt','Error whiling processing data...try again later');
            else if(err.request) Error('Failed Attempt', JSON.stringify(err.request));
            else Error('Failed Attempt',err.message);

        }); 
    }
}

export function userbasicInfo(data)
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
        return AUTH.post(`storeuserdetails`,data)
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            if(response.data.status === 'success'){
                dispatch({ type: USERBASICDETAILS, payload: response.data });
                Success('User Updated','User Information Saved Successfully...');
                //alert(JSON.stringify(response.data));
            }else {
                
            }
        }).catch(err => {
            dispatch({ type: REQUEST_STATUS  });
            if(err.response) Error('Failed Attempt','Error whiling processing data...try again later');
            else if(err.request) Error('Failed Attempt', JSON.stringify(err.request));
            else Error('Failed Attempt',err.message);

        }); 
    }
}

export function UserhomeAddress(data)
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
        return AUTH.post(`userHomeAddress`,data)
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            console.log(response.data);
            if(response.data.status === 'success'){
                dispatch({ type: USERHOMEADDRESS, payload: response.data });
                Success('User Updated','User Information Saved Successfully...');
                //alert(JSON.stringify(response.data));
            }else {
                Error('Failed Attempt',response.data.error);
            }
        }).catch(err => {
            dispatch({ type: REQUEST_STATUS  });
            if(err.response) Error('Failed Attempt','Error whiling processing data...try again later');
            else if(err.request) Error('Failed Attempt', JSON.stringify(err.request));
            else Error('Failed Attempt',err.message);

        }); 
    }
}

export function UserOfficeAddress(data)
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
        return AUTH.post(`userOfficeAddress`,data)
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            console.log(response.data);
            if(response.data.status === 'success'){
                dispatch({ type: USEROFFICEADDRESS, payload: response.data });
                Success('User Updated','User Information Saved Successfully...');
                //alert(JSON.stringify(response.data));
            }else {
                Error('Failed Attempt',response.data.error);
            }
        }).catch(err => {
            dispatch({ type: REQUEST_STATUS  });
            if(err.response) Error('Failed Attempt','Error whiling processing data...try again later');
            else if(err.request) Error('Failed Attempt', JSON.stringify(err.request));
            else Error('Failed Attempt',err.message);

        }); 
    }
}

export function SocialMediaAccounts(data)
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
        return AUTH.post(`userSocialMediaAccounts`,data)
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            console.log(response.data);
            if(response.data.status === 'success'){
                dispatch({ type: USERMEDIAACCOUNT, payload: response.data });
                Success('User Updated','User Information Saved Successfully...');
                //alert(JSON.stringify(response.data));
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

export function BankInformation(data)
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
        return AUTH.post(`bankinfo`,data)
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            console.log(response.data);
            if(response.data.status === 'success'){
                dispatch({ type: USERBANKINFORMATION, payload: response.data });
                Success('Congratulations','You have completed your registration');
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

export function SendRequest(data,props,offers)
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
        return AUTH.post(`loanrequest`,data)
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            //console.log(response.data);
            if(response.data.status === 'success'){
                response.data.offers = offers;
                dispatch({ type: MAKEREQUEST, payload: response.data });
                
                Success('User Updated','User Information Saved Successfully...');
                props.history.push('/sureoffers');
                //alert(JSON.stringify(response.data));
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

export function MakeAvailable()
{
    return function(dispatch, getState){
        let data = getState().createvault;
        //alert(JSON.stringify(data));
        //console.log(data);
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
        return AUTH.post(`supplyloan`,data)
        .then(async (response) => {
            //console.log(response.data);
            dispatch({ type: REQUEST_STATUS  });
            if(response.data.status === 'success'){
                Success('Success','Data Saved Successfully');
                dispatch({ type: VAULT_CREATED  });
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
export function ConnectwithLender(lenderId, vaultId, requestId)
{
    let data = {lender_id:lenderId, sure_vault_id:vaultId, borrower_request_id: requestId};
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
        return AUTH.post(`connectborrowerToLender`,data)
        .then(async (response) => {
            console.log(response.data);
            dispatch({ type: REQUEST_STATUS  });
            if(response.data.status === 'success'){
                Success('Success','Lender has been Notified');
                
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

export function GetProfile(Id)
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
        return AUTH.get(`getprofile/${Id}`)
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            if(response.data.status === 'success'){
                dispatch({ type: GETPROFILE, payload: response.data });
                console.log(response.data);
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

export function UpdateLoanRequestStatus(status,connectId,borrowerId, requestId)
{
    let data = {status: status, connectId:connectId, borrowerId:borrowerId, requestId:requestId};
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
        return AUTH.post(`updateloanapprovalstatus`, data)
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            if(response.data.status === 'success'){
                Success('Loan Request',"Borrower's Request Accepted Successfully");
                dispatch({ type: PENDINGAPPROVALS, payload: response.data})
                console.log(response.data);
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

export function UpdateOfferRequestStatus(status,connectId,lenderId, requestId)
{
    let data = {status: status, connectId:connectId, lenderId:lenderId, requestId:requestId};
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
        return AUTH.post(`updateofferrequeststatus`, data)
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            if(response.data.status === 'success'){
                Success('Loan Offer',"Lender's Offer Accepted Successfully");
                //dispatch({ type: PENDINGAPPROVALS, payload: response.data})
                //console.log(response.data);
            }else {
                Error('Failed Attempt',response.data.error);
            }
        }).catch(err => {
            //console.log(err);
            dispatch({ type: REQUEST_STATUS  });
            if(err.response) Error('Failed Attempt','Error whiling processing data...try again later');
            else if(err.request) Error('Failed Attempt', JSON.stringify(err.request));
            else Error('Failed Attempt',err.message);

        }); 
    }
}
export function GetLoanToBeDisbursed()
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
        return AUTH.get(`getLoanToBeDisbursed`)
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            if(response.data.status === 'success'){
                //Success('Loan Request',"Borrower's Request Accepted Successfully");
                dispatch({ type: TOBEDISBURSED, payload: response.data})
                console.log(response.data);
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

export function GetVault(Id)
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
        return AUTH.get(`getvault/${Id}`)
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            if(response.data.status === 'success'){
                dispatch({ type: GETVAULT, payload: response.data });
                console.log(response.data);
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
export function GetUserLoanRequest(Id)
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
        return AUTH.get(`getuserloanrequest`)
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            if(response.data.status === 'success'){
                dispatch({ type: MAKEREQUEST, payload: response.data });
                console.log(response.data);
            }else {
                Error('Failed Attempt',response.data.error);
            }
        }).catch(err => {
            //console.log(err);
            dispatch({ type: REQUEST_STATUS  });
            //if(err.response) Error('Failed Attempt','Error whiling processing data...try again later');
            //else if(err.request) Error('Failed Attempt', JSON.stringify(err.request));
            //else Error('Failed Attempt',err.message);

        }); 
    }
}

export function UpdateSuredeal(data)
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
        return AUTH.post(`updatesuredeal`,data)
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            if(response.data.status === 'success'){
                dispatch({ type: UPDATESUREDEAL, payload: response.data });
                dispatch({ type: TOBEDISBURSED, payload: response.data})
                Success('Sure Deal',"Disbursement Information Saved Successfully");
                //console.log(response.data);
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

export function GetLoansDisbursed()
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
        return AUTH.get(`getLoansDisbursed`)
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            if(response.data.status === 'success'){
                dispatch({ type: LOANSDISBURSED, payload: response.data})
                console.log(response.data);
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

export function GetborrowersLoansDisbursed()
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
        return AUTH.get(`getborrowersLoansReceived`)
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            if(response.data.status === 'success'){
                dispatch({ type: LOANSRECEIVED, payload: response.data});
                //alert(JSON.stringify(response.data));
                //console.log(response.data);
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

export function GetBorrowerApprovedLoans()
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
        return AUTH.get(`getBorrowerapprovedloan`)
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            if(response.data.status === 'success'){
                dispatch({ type: MYAPPROVEDLOANS, payload: response.data})
                console.log(response.data);
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

export function GetBorrowerpendingapprovals()
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
        return AUTH.get(`getBorrowerpendingloan`)
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            if(response.data.status === 'success'){
                dispatch({ type: MYPENDINGAPPROVALLOANS, payload: response.data})
                console.log(response.data);
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

export function UserActivitiesAnalytics()
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
        //alert(store.getState().root.token);
        return AUTH.get(`useractivitiesanalytics`)
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            if(response.data.status === 'success'){
                dispatch({ type: ANALYTICS, payload: response.data})
                console.log(response.data);
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

export function GetCompleteUserProfile()
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
        return AUTH.get(`getcompleteuserprofile`)
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            //console.log(response.data);
            if(response.data.status === 'success'){
                dispatch({ type: COMPLETEUSERPROFILE, payload: response.data});
                //console.log(response.data.userdetails);
                if(response.data.userdetails == null) dispatch({ type: NEXTPHASE, payload: 0});
                else if(response.data.homeaddress == null) dispatch({ type: NEXTPHASE, payload: 1});
                else if(response.data.officeaddress == null) dispatch({ type: NEXTPHASE, payload: 2});
                else if(response.data.socialmedia == null) dispatch({ type: NEXTPHASE, payload: 3});
                else if(response.data.bankdetails == null) dispatch({ type: NEXTPHASE, payload: 4});
                else dispatch({ type: NEXTPHASE, payload: 4});
                
            }else {
                Error('Failed Attempt',response.data.error);
            }
        }).catch(err => {
            //console.log(err);
            dispatch({ type: REQUEST_STATUS  });
            if(err.response) Error('Failed Attempt','Error whiling processing data...try again later');
            else if(err.request) Error('Failed Attempt', JSON.stringify(err.request));
            else Error('Failed Attempt',err.message);

        }); 
    }
}

export function GetCompleteVault()
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
        return AUTH.get(`getvault`)
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            //console.log(response.data);
            if(response.data.status === 'success'){
                dispatch({ type: MYVAULT, payload: response.data});
                
            }else {
                Error('Failed Attempt',response.data.error);
            }
        }).catch(err => {
            //console.log(err);
            dispatch({ type: REQUEST_STATUS  });
            if(err.response) Error('Failed Attempt','Error whiling processing data...try again later');
            else if(err.request) Error('Failed Attempt', JSON.stringify(err.request));
            else Error('Failed Attempt',err.message);

        }); 
    }
}

export function GetTransactions(Id)
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
        return AUTH.get(`gettransaction/${Id}`)
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            //console.log(response.data);
            if(response.data.status === 'success'){
                dispatch({ type: MYVAULTTRANSACTIONS, payload: response.data});
                
            }else {
                Error('Failed Attempt',response.data.error);
            }
        }).catch(err => {
            //console.log(err);
            dispatch({ type: REQUEST_STATUS  });
            if(err.response) Error('Failed Attempt','Error whiling processing data...try again later');
            else if(err.request) Error('Failed Attempt', JSON.stringify(err.request));
            else Error('Failed Attempt',err.message);

        }); 
    }
}

export function logout()
{
    return function(dispatch){
        dispatch({ type: CREATEVAULT_RESET  });
        dispatch({ type: MAIN_RESET  });
        dispatch({ type: PLACES_RESET  });
        
    }
}

export function PeerToPeer(data,props)
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
        return AUTH.post(`peer`,data)
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            //console.log(response.data);
            if(response.data.status === 'success'){
                dispatch({ type: MAKEREQUEST, payload: response.data });
                props.history.push('/sureoffers');
                //alert(JSON.stringify(response.data));
            }else {
                //alert('ejfjdg');
                Error('Failed Attempt',response.data.error);
            }
        }).catch(err => {
            
            dispatch({ type: REQUEST_STATUS  });
            if(err.response) Error('Failed Attempt','Error whiling processing data...try again later');
            else if(err.request) Error('Failed Attempt', JSON.stringify(err.request));
            else Error('Failed Attempt',err.message);

        }); 
    }
}

export function GetBorrowerAllLoansRequest()
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
        return AUTH.get(`getborrowerallloansrequest`)
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            if(response.data.status === 'success'){
                dispatch({ type: ALLLOANSREQUEST, payload: response.data});
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

export function ResearchforLender(data,props)
{
    //alert(JSON.stringify(data));
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
        return AUTH.post(`getLendersForBorrower`,data)
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            //console.log(response.data);
            if(response.data.status === 'success'){
                dispatch({ type: MAKEREQUEST, payload: response.data });
                //Success('User Updated','User Information Saved Successfully...');
                //props.history.push('/sureoffers');
                //alert(JSON.stringify(response.data));
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

export function GetBorrowersRepayment()
{
    //alert('dhjhdf');
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
        return AUTH.get(`repayments_borrower`)
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            //console.log(response.data);
            if(response.data.status === 'success'){
                dispatch({ type: REPAYMENT_BORROWER, payload: response.data });
                //alert(JSON.stringify(response.data));
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

export function GetLenderRepaymentfromBorrower()
{
    //alert('dhjhdf');
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
        return AUTH.get(`repayments_lender`)
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            //console.log(response.data);
            if(response.data.status === 'success'){
                dispatch({ type: REPAYMENT_LENDER, payload: response.data });
                //alert(JSON.stringify(response.data));
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

export function GetAllLenderOffers()
{
    return function(dispatch){
        dispatch({ type: REQUEST_STATUS  });
        return INSTANCE.get(`surelenderoffers`)
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            //console.log(response.data);
            //alert('okay2');
            if(response.data.status === 'success'){
                
                dispatch({ type: ALL_LENDER_OFFERS, payload: response.data });
                //alert(JSON.stringify(response.data));
            }else {
                Error('Failed Attempt',response.data.error);
            }
        }).catch(err => {
            console.log(err);
            //alert('dhfhf');
            dispatch({ type: REQUEST_STATUS  });
            if(err.response) Error('Failed Attempt','Error whiling processing data...try again later');
            else if(err.request) Error('Failed Attempt', JSON.stringify(err.request));
            else Error('Failed Attempt',err.message);

        }); 
    }
}

export function GetAllBorrowerOffers()
{
    return function(dispatch){
        dispatch({ type: REQUEST_STATUS  });
        return INSTANCE.get(`sureborroweroffers`)
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            //console.log(response.data);
            //alert('okay2');
            if(response.data.status === 'success'){
                
                dispatch({ type: ALL_BORROWER_REQUESTS, payload: response.data });
                //alert(JSON.stringify(response.data));
            }else {
                Error('Failed Attempt',response.data.error);
            }
        }).catch(err => {
            console.log(err);
            //alert('dhfhf');
            dispatch({ type: REQUEST_STATUS  });
            if(err.response) Error('Failed Attempt','Error whiling processing data...try again later');
            else if(err.request) Error('Failed Attempt', JSON.stringify(err.request));
            else Error('Failed Attempt',err.message);

        }); 
    }
}
export function ConnectwithBorrower(data)
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
        return AUTH.post(`connectwithborrower`,data)
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            if(response.data.status === 'success'){ 
                dispatch({ type: CONNECTWITHBORROWER, payload: response.data });
                //alert(JSON.stringify(response.data));
                Success('Connection Status',"Successful");
            }else {
                Error('Failed Attempt',response.data.error);
                //alert('ufifoof');
            }
        }).catch(err => {
            console.log(err);
            //alert('dhfhf');
            dispatch({ type: REQUEST_STATUS  });
            if(err.response) Error('Failed Attempt','Error whiling processing data...try again later');
            else if(err.request) Error('Failed Attempt', JSON.stringify(err.request));
            else Error('Failed Attempt',err.message);

        }); 
    }
}

export function PeerLenderToBorrower(data,props)
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
        return AUTH.post(`peerlendertoborrower`,data)
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            if(response.data.status === 'success'){ 
                dispatch({ type: SURECONNECT, payload: response.data });
                props.history.push('/sureconnect');
                //sSuccess('Success', 'Request has been sent to Borrower');
            }else {
                console.log(response.data);
                Error('Failed Attempt',response.data.error);
            }
        }).catch(err => {
            console.log(err);
            //alert('dhfhf');
            dispatch({ type: REQUEST_STATUS  });
            if(err.response) Error('Failed Attempt','Error whiling processing data...try again later');
            else if(err.request) Error('Failed Attempt', JSON.stringify(err.request));
            else Error('Failed Attempt',err.message);

        }); 
    }
}
export function PeerBorrowerToLender(data,props)
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
        return AUTH.post(`peer`,data)
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            if(response.data.status === 'success'){ 
                dispatch({ type: MAKEREQUEST, payload: response.data });
                props.history.push('/sureOffers');
                //sSuccess('Success', 'Request has been sent to Borrower');
            }else {
                Error('Failed Attempt',response.data.error);
            }
        }).catch(err => {
            console.log(err);
            //alert('dhfhf');
            dispatch({ type: REQUEST_STATUS  });
            if(err.response) Error('Failed Attempt','Error whiling processing data...try again later');
            else if(err.request) Error('Failed Attempt', JSON.stringify(err.request));
            else Error('Failed Attempt',err.message);

        }); 
    }
}

export function GetBorrowerOverdues()
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
        return AUTH.get(`overdueforborrower`)
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            if(response.data.status === 'success'){ 
                dispatch({ type: BORROWER_OVERDUES, payload: response.data });
                //Success('Success', 'Request has been sent to Borrower');
            }else {
                Error('Failed Attempt',response.data.error);
            }
        }).catch(err => {
            console.log(err);
            //alert('dhfhf');
            dispatch({ type: REQUEST_STATUS  });
            if(err.response) Error('Failed Attempt','Error whiling processing data...try again later');
            else if(err.request) Error('Failed Attempt', JSON.stringify(err.request));
            else Error('Failed Attempt',err.message);

        }); 
    }
}

export function GetLenderOverdues()
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
        return AUTH.get(`overdueforlender`)
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            if(response.data.status === 'success'){ 
                dispatch({ type: LENDER_OVERDUES, payload: response.data });
                //Success('Success', 'Request has been sent to Borrower');
            }else {
                Error('Failed Attempt',response.data.error);
            }
        }).catch(err => {
            console.log(err);
            //alert('dhfhf');
            dispatch({ type: REQUEST_STATUS  });
            if(err.response) Error('Failed Attempt','Error whiling processing data...try again later');
            else if(err.request) Error('Failed Attempt', JSON.stringify(err.request));
            else Error('Failed Attempt',err.message);

        }); 
    }
}

export function GetBorrowerPaymentSchedules(id)
{
    
    return function(dispatch){
        dispatch({ type: REQUEST_STATUS  });
        let data = {schedules :[]};
        dispatch({ type: BORROWER_PAYMENT_SCHEDULES, payload: data });
        const AUTH = axios.create({
            baseURL: `${PATH}`,
            timeout: 20000,
            headers: {
                      'Content-Type': 'application/json', 
                       'Accept': 'application/json',
                       'Authorization': `Bearer ${store.getState().root.token}`
                    }
        });
        return AUTH.get(`borrower_payment_schedules/${id}`)
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            //console.log(response.data);
            if(response.data.status === 'success'){
                dispatch({ type: BORROWER_PAYMENT_SCHEDULES, payload: response.data });
                Analytics(response.data.schedules,dispatch);
                //alert(JSON.stringify(response.data));
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

export function GetLenderPaymentSchedules(id)
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
        return AUTH.get(`lender_payment_schedules/${id}`)
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            //console.log(response.data);
            if(response.data.status === 'success'){
                dispatch({ type: LENDER_PAYMENT_SCHEDULES, payload: response.data });
                Analytics(response.data.schedules,dispatch);
                //alert(JSON.stringify(response.data));
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

export function VerifyEmailNow(email)
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
        return AUTH.put(`verify_email/${email}`)
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            if(response.data.status === 'success'){
                
                dispatch({ type: VERIFY_EMAIL, payload: response.data });
            }else {
                Error('Failed Attempt',response.data.error);
                dispatch({ type: VERIFY_EMAIL, payload: response.data });
            }
        }).catch(err => {
            console.log(err);
            dispatch({ type: REQUEST_STATUS  });

            Error('Failed Attempting','Error whiling processing data...try again later');

        }); 
    }
}

export function VerifyPhone(code)
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
        return AUTH.post(`verify_phone/${code}`,{})
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            if(response.data.status === 'success'){
                Success('Verification Status', response.data.message);
            }else {
                Error('Failed Attempt',response.data.error);
            }
        }).catch(err => {
            console.log(err);
            dispatch({ type: REQUEST_STATUS  });

            Error('Failed Attempting','Error whiling processing data...try again later');

        }); 
    }
}

export function SendCode()
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
        return AUTH.get(`sms`)
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            if(response.data.status === 'success'){
                Success('Code Status', 'Code sent to your Phone Number');
            }else {
                Error('Failed Attempt',response.data.error);
            }
        }).catch(err => {
            console.log(err);
            dispatch({ type: REQUEST_STATUS  });

            Error('Failed Attempting','Error whiling processing data...try again later');

        }); 
    }
}

export function GetEmailLink(email)
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
        return AUTH.get(`email_link/${email}`)
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            if(response.data.status === 'success'){
                Success('Status',response.data.message);
                //dispatch({ type: VERIFY_EMAIL, payload: response.data });
            }else {
                Error('Failed Attempt',response.data.error);
                //dispatch({ type: VERIFY_EMAIL, payload: response.data });
            }
        }).catch(err => {
            console.log(err);
            dispatch({ type: REQUEST_STATUS  });

            Error('Failed Attempting','Error whiling processing data...try again later');

        }); 
    }
}

export function countrycodes()
{
    
    return function(dispatch){
        dispatch({ type: REQUEST_STATUS  });
        const INSTANCE = axios.create({
            baseURL: `${PATH}`,
            timeout: 20000,
            headers: {
                      'Content-Type': 'application/json', 
                       'Accept': 'application/json'
                    }
        });
        return INSTANCE.get(`countrycodes`)
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            //console.log(response.data.codes.);
            if(response.data.status === 'success'){
                let alldata = [];
                for (var key in response.data.codes) {
                    if (response.data.codes.hasOwnProperty(key)) {
                      let data = {name:key,code:response.data.codes[key]};
                      alldata.push(data);
                    }
                }
                dispatch({ type: CODES, payload: alldata });
            }else {
                //Error('Failed Attempt',response.data.error);
                //dispatch({ type: VERIFY_EMAIL, payload: response.data });
            }
        }).catch(err => {
            console.log(err);
            dispatch({ type: REQUEST_STATUS  });

            Error('Failed Attempting','Error whiling processing data...try again later');

        }); 
    }
}