import {
    USER_LOGIN, 
    USER_REGISTER,
    SURE_REQUEST,
    FETCHING,
    VAULT,
    MESSAGE,
    INSTANCE,
    REQUEST_STATUS,
    COUNTRIES,
    USERBASICDETAILS,
    USERHOMEADDRESS,
    USEROFFICEADDRESS,
    USERMEDIAACCOUNT,
    MAKEREQUEST,
    GETPROFILE,
    GETVAULT,
    PENDINGAPPROVALS,
    APPROVEDLOANS,
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
    MAIN_RESET,
    ALLLOANSREQUEST,
    REPAYMENT_BORROWER,
    REPAYMENT_LENDER,
    VIEWREPAYMENTONREQUESTID,
    ALL_LENDER_OFFERS,
    ALL_BORROWER_REQUESTS,
    CONNECTWITHBORROWER
} from '../action/constants';

const initialState = {
    user:{},
    userId:0,
    token:'',
    IsLoggedIn:false,
    IsAccountCreated:false,
    IsFetching:false,
    countries:[],
    userbasicdetails:{},
    userHomeAddress:{},
    userOfficeAddress:{},
    userSocialMediaAccounts:{},
    userBankInformation:{},
    nextphase:-1,
    sureOffers:[],
    loanrequest:{},
    viewuserprofile:{},
    lendervault:{},
    lenderpendingApprovals:[],
    LenderApprovedLoans: [],
    loantobedisbursed:[],
    updatedSuredeal:false,
    loansdisbursed:[],
    myapprovedloans:[],
    mypendingapprovalloans:[],
    analytics:{},
    myvault:[],
    transactions:[],
    allmyloansrequest:[],
    repayments_lender:[],
    repayments_borrower:[],
    repaymentsonrequestId:'',
    all_lender_offers:[],
    all_borrowers_requests:[],
    month: ['January','February','March','April','May','June','July','August','September','October','November','December']

};

export function RootReducer(state = initialState, action)
{
    if(action.type === USER_LOGIN){
        return Object.assign({}, state, {
            user: action.payload.user,
            IsLoggedIn:true,
            token:action.payload.access_token

        });
    }
    else if(action.type === USER_REGISTER){
        return Object.assign({}, state, {
            user: action.payload.user,
            IsAccountCreated:true,
            token: action.payload.token
        });
    }
    else if(action.type === REQUEST_STATUS){
        return Object.assign({}, state, {
            IsFetching: !state.IsFetching
        });
    }
    else if(action.type == COUNTRIES)
    {
        return Object.assign({}, state, {
            countries: action.payload.data
        });
    }
    else if(action.type == USERBASICDETAILS)
    {
        return Object.assign({}, state, {
            userbasicdetails: action.payload.userdetails,
            nextphase:1
        });
    }
    else if(action.type == USERHOMEADDRESS)
    {
        return Object.assign({}, state, {
            userHomeAddress: action.payload.userHomeAddress,
            nextphase:2
        });
    }
    else if(action.type == USEROFFICEADDRESS)
    {
        return Object.assign({}, state, {
            userOfficeAddress: action.payload.userOfficeAddress,
            nextphase:3
        });
    }
    else if(action.type == USERMEDIAACCOUNT)
    {
        return Object.assign({}, state, {
            userSocialMediaAccounts: action.payload.UserSocialMediaAccounts,
            nextphase:4
        });
    }
    else if(action.type == USERBANKINFORMATION)
    {
        return Object.assign({}, state, {
            userBankInformation: action.payload.bankdetails,
            nextphase:5
        });
    }
    else if(action.type == MAKEREQUEST)
    {
        return Object.assign({}, state, {
            sureOffers: action.payload.matchingoffers,
            loanrequest: action.payload.loanrequest
        });
    }
    else if(action.type == GETPROFILE)
    {
        return Object.assign({}, state, {
            viewuserprofile: action.payload.userprofile
        });
    }
    else if(action.type == GETVAULT)
    {
        return Object.assign({}, state, {
            lendervault: action.payload.vault
        });
    }
    else if(action.type == PENDINGAPPROVALS)
    {
        return Object.assign({}, state, {
            lenderpendingApprovals: action.payload.request
        });
    }
    else if(action.type == APPROVEDLOANS)
    {
        return Object.assign({}, state, {
            LenderApprovedLoans: action.payload.request
        });
    }
    else if(action.type == TOBEDISBURSED)
    {
        return Object.assign({}, state, {
            loantobedisbursed: action.payload.request
        });
    }
    else if(action.type == UPDATESUREDEAL)
    {
        return Object.assign({}, state, {
            updatedSuredeal: action.payload.status
        });
    }
    else if(action.type == LOANSDISBURSED)
    {
        return Object.assign({}, state, {
            loansdisbursed: action.payload.request
        });
    }
    else if(action.type == MYAPPROVEDLOANS)
    {
        return Object.assign({}, state, {
            myapprovedloans: action.payload.request
        });
    }
    else if(action.type == MYPENDINGAPPROVALLOANS)
    {
        return Object.assign({}, state, {
            mypendingapprovalloans: action.payload.request
        });
    }
    else if(action.type == ANALYTICS)
    {
        return Object.assign({}, state, {
            analytics: action.payload.analytics
        });
    }
    else if(action.type == COMPLETEUSERPROFILE)
    {
        return Object.assign({}, state, {
            userbasicdetails: action.payload.userdetails,
            userHomeAddress: action.payload.homeaddress,
            userOfficeAddress:action.payload.officeaddress,
            userSocialMediaAccounts:action.payload.socialmedia
        });
    }
    else if(action.type == NEXTPHASE)
    {
        return Object.assign({}, state, {
            nextphase: action.payload
        });
    }
    else if(action.type == MYVAULT)
    {
        return Object.assign({}, state, {
            myvault: action.payload.vaults
        });
    }
    else if(action.type == MYVAULTTRANSACTIONS)
    {
        return Object.assign({}, state, {
            transactions: action.payload.transactions
        });
    }
    else if(action.type == ALLLOANSREQUEST)
    {
        return Object.assign({}, state, {
            allmyloansrequest: action.payload.requests
        });
    }
    else if(action.type == REPAYMENT_LENDER)
    {
        return Object.assign({}, state, {
            repayments_lender: action.payload.repayments
        });
    }
    else if(action.type == REPAYMENT_BORROWER)
    {
        return Object.assign({}, state, {
            repayments_borrower: action.payload.repayments
        });
    }
    else if(action.type == VIEWREPAYMENTONREQUESTID)
    {
        return Object.assign({}, state, {
            repaymentsonrequestId: action.payload
        });
    }
    else if (action.type == MAIN_RESET)
    {
        return Object.assign({}, state, {
            user:{},
            userId:0,
            token:'',
            IsLoggedIn:false,
            IsAccountCreated:false,
            IsFetching:false,
            countries:[],
            userbasicdetails:{},
            userHomeAddress:{},
            userOfficeAddress:{},
            userSocialMediaAccounts:{},
            userBankInformation:{},
            nextphase:-1,
            sureOffers:[],
            loanrequest:{},
            viewuserprofile:{},
            lendervault:{},
            lenderpendingApprovals:[],
            LenderApprovedLoans: [],
            loantobedisbursed:[],
            updatedSuredeal:false,
            loansdisbursed:[],
            myapprovedloans:[],
            mypendingapprovalloans:[],
            analytics:{},
            myvault:[],
            transactions:[],
        });
    }
    else if(action.type == ALL_LENDER_OFFERS)
    {
        return Object.assign({}, state, {
            all_lender_offers: action.payload.offers
        });
    }
    else if(action.type == ALL_BORROWER_REQUESTS)
    {
        return Object.assign({}, state, {
            all_borrowers_requests: action.payload.requests
        });
    }
    else if(action.type == CONNECTWITHBORROWER)
    {
        return Object.assign({}, state, {
            //: action.payload.requests
        });
    }
    return state;

};

//export default RootReducer;