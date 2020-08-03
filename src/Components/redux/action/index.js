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
    CONNECTWITHBORROWER

} from './constants';
import { Success, Error } from '../../Message/message';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';

const INSTANCE = axios.create({
    baseURL: 'http://localhost:8000/api/',
    timeout: 20000,
    headers: {
              'Content-Type': 'application/json', 
               'Accept': 'application/json'
            }
});

const AUTHINSTANCE = axios.create({
    baseURL: 'http://localhost:8000/api/',
    timeout: 20000,
    headers: {
              'Content-Type': 'application/json', 
               'Accept': 'application/json',
               'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
});

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


export function user_attempt_login(data,props)
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
                await dispatch({ type: USER_LOGIN, payload: response.data });
                Success('Login Status','Login Successful');
                sessionStorage.setItem("token",response.data.access_token);
                props.history.push('/');
                //console.log(response.data);
            }else{  
                Error("Login Status", "Invalid Email and Password");
            }
        }).catch(err => {
            dispatch({ type: REQUEST_STATUS  });
            if(err.response)
            {
                if(err.response.status == '401') Error("Login Failed","Unauthorized User");
            }
            else if(err.request)
            {
                Error("Login Failed",JSON.stringify(err.request));
            }   
        }); 
    }
}

export function user_attempt_register(data) {
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
                //props.history.push('/');
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
            else if(err.request) Error('Failed Attempt', JSON.stringify(err.request));
            else Error('Failed Attempt',err.message);
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

export function userbasicInfo(data)
{
    return function(dispatch){
        dispatch({ type: REQUEST_STATUS  });
        return AUTHINSTANCE.post(`storeuserdetails`,data)
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
        return AUTHINSTANCE.post(`userHomeAddress`,data)
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
        return AUTHINSTANCE.post(`userOfficeAddress`,data)
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
        return AUTHINSTANCE.post(`userSocialMediaAccounts`,data)
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
        return AUTHINSTANCE.post(`bankinfo`,data)
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

export function SendRequest(data,props)
{
    return function(dispatch){
        dispatch({ type: REQUEST_STATUS  });
        return AUTHINSTANCE.post(`loanrequest`,data)
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            //console.log(response.data);
            if(response.data.status === 'success'){
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
        dispatch({ type: REQUEST_STATUS  });
        return AUTHINSTANCE.post(`supplyloan`,data)
        .then(async (response) => {
            //console.log(response.data);
            dispatch({ type: REQUEST_STATUS  });
            if(response.data.status === 'success'){
                Success('Success','Data Saved Successfully');
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
        return AUTHINSTANCE.post(`connectborrowerToLender`,data)
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
        return AUTHINSTANCE.get(`getprofile/${Id}`)
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
        return AUTHINSTANCE.post(`updateloanapprovalstatus`, data)
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
export function GetLoanToBeDisbursed()
{
    return function(dispatch){
        dispatch({ type: REQUEST_STATUS  });
        return AUTHINSTANCE.get(`getLoanToBeDisbursed`)
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
        return AUTHINSTANCE.get(`getvault/${Id}`)
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
        return AUTHINSTANCE.get(`getuserloanrequest`)
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            if(response.data.status === 'success'){
                dispatch({ type: MAKEREQUEST, payload: response.data });
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

export function UpdateSuredeal(data)
{
    return function(dispatch){
        dispatch({ type: REQUEST_STATUS  });
        return AUTHINSTANCE.post(`updatesuredeal`,data)
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
        return AUTHINSTANCE.get(`getLoansDisbursed`)
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

export function GetBorrowerApprovedLoans()
{
    return function(dispatch){
        dispatch({ type: REQUEST_STATUS  });
        return AUTHINSTANCE.get(`getBorrowerapprovedloan`)
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
        return AUTHINSTANCE.get(`getBorrowerpendingloan`)
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
        return AUTHINSTANCE.get(`useractivitiesanalytics`)
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
        return AUTHINSTANCE.get(`getcompleteuserprofile`)
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
        return AUTHINSTANCE.get(`getvault`)
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
        return AUTHINSTANCE.get(`gettransaction/${Id}`)
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
        return AUTHINSTANCE.post(`peer`,data)
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            //console.log(response.data);
            if(response.data.status === 'success'){
                dispatch({ type: MAKEREQUEST, payload: response.data });
                props.history.push('/sureoffers');
                //alert(JSON.stringify(response.data));
            }else {
                alert('ejfjdg');
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
        return AUTHINSTANCE.get(`getborrowerallloansrequest`)
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
    return function(dispatch){
        dispatch({ type: REQUEST_STATUS  });
        return AUTHINSTANCE.post(`getLendersForBorrower`,data)
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
        return AUTHINSTANCE.get(`repayments_lender`)
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
        return AUTHINSTANCE.get(`surelenderoffers`)
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
        return AUTHINSTANCE.get(`sureborroweroffers`)
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            //console.log(response.data);
            //alert('okay2');
            if(response.data.status === 'success'){
                
                dispatch({ type: ALL_BORROWER_REQUESTS, payload: response.data });
                alert(JSON.stringify(response.data));
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
        return AUTHINSTANCE.post(`connectwithborrower`,data)
        .then(async (response) => {
            dispatch({ type: REQUEST_STATUS  });
            if(response.data.status === 'success'){ 
                dispatch({ type: CONNECTWITHBORROWER, payload: response.data });
                alert(JSON.stringify(response.data));
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
