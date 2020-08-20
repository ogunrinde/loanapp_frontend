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
    CONNECTWITHBORROWER,
    LENDER_OVERDUES,
    BORROWER_OVERDUES,
    LOANSRECEIVED,
    BORROWER_PAYMENT_SCHEDULES,
    LENDER_PAYMENT_SCHEDULES,
    VERIFY_EMAIL,
    VERIFY_PHONE,
    CODES,
    CITIES,
    VAULT_CREATED,
    SURECONNECT,
    PAYMENTANALYTICS
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
    borrower_overdues:[],
    lender_overdues:[],
    loansreceived:[],
    borrower_payment_schedules:[],
    lender_payment_schedules:[],
    verify_email:'',
    verify_phone:false,
    codes:[],
    cities:[],
    vaultcreated: false,
    sureconnect:{},
    paymentanalytics:{},
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
    else if(action.type == CITIES)
    {
        return Object.assign({}, state, {
            cities: action.payload.cities
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
            sureOffers: action.payload.offers,
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
            allmyloansrequest:[],
            repayments_lender:[],
            repayments_borrower:[],
            repaymentsonrequestId:'',
            all_lender_offers:[],
            all_borrowers_requests:[],
            borrower_overdues:[],
            lender_overdues:[],
            loansreceived:[],
            borrower_payment_schedules:[],
            lender_payment_schedules:[],
            verify_email:'',
            verify_phone:false,
            codes:[],
            cities:[],
            vaultcreated: false,
            sureconnect:{},
            paymentanalytics:{},
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
    else if(action.type == BORROWER_OVERDUES)
    {
        return Object.assign({}, state, {
            borrower_overdues: action.payload.borrower_overdues
        });
    }
    else if(action.type == LENDER_OVERDUES)
    {
        return Object.assign({}, state, {
            lender_overdues: action.payload.lender_overdues
        });
    }
    else if(action.type == LOANSRECEIVED)
    {
        return Object.assign({}, state, {
            loansreceived: action.payload.request
        });
    }
    else if(action.type == BORROWER_PAYMENT_SCHEDULES)
    {
        //alert(JSON.stringify(action.payload.schedules));
        return Object.assign({}, state, {
            borrower_payment_schedules: action.payload.schedules
        });
    }
    else if(action.type == LENDER_PAYMENT_SCHEDULES)
    {
        return Object.assign({}, state, {
            lender_payment_schedules: action.payload.schedules
        });
    }
    else if(action.type == VERIFY_PHONE)
    {
        return Object.assign({}, state, {
            verify_phone: action.payload.verify_phone
        });
    }
    else if(action.type == CODES)
    {
        return Object.assign({}, state, {
            codes: action.payload
        });
    }
    else if(action.type == VAULT_CREATED)
    {
        return Object.assign({}, state, {
            vaultcreated: !state.vaultcreated
        });
    }
    else if(action.type == SURECONNECT)
    {
        return Object.assign({}, state, {
            sureconnect: action.payload.request
        });
    }
    else if(action.type == PAYMENTANALYTICS)
    {
        return Object.assign({}, state, {
            paymentanalytics: action.payload
        });
    }
    else if(action.type == VERIFY_EMAIL)
    {
        if(action.payload.status == 'success')
        {
            return Object.assign({}, state, {
                verify_email: 'Email is Verified'
            });
        }
        else if(action.payload.status == 'failed')
        {
            return Object.assign({}, state, {
                verify_email: 'Email Verification Failed'
            });
        }
        
    }
    return state;

};

//export default RootReducer;