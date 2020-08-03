import React, {useState, useEffect} from 'react';
import Header from '../Header';
import { Link } from 'react-router-dom';
import '../../css/css/analytics.css'
import Footer from '../Footer';
import Analytics from '../analytics';
import { Stepper } from 'react-form-stepper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faTrash, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import SureRequest from '../sureRequest';
import Loader from 'react-loader-spinner';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import {useSelector, useDispatch } from 'react-redux';
import Sidebar from './sidebar';
import {  GetLoansDisbursed } from '../redux/action/index';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Request from './Request';
import StepWizard from 'react-step-wizard';
import DisbursedFundRepayment from '../Account/DisbursedLoansRepayment';
import RepaymentOrder from './RepaymentOrder';



const OpenRepaymentforLender = (props) => 
{
	const dispatch = useDispatch();
    //const repayments = useSelector(state => state.root.repayments_lender);
    const loansdisbursed = useSelector(state => state.root.loansdisbursed);
    const [IsFetching, setIsFetching] = useState(false);
    const [view_more, setview_more] = useState(false);
    const [request, setrequest] = useState({});
    const month = useSelector(state => state.root.month);
    
    useEffect(() => {
        process();
    },[]);

    const process = async  () =>
    {
        setIsFetching(true);
        //await dispatch(GetBorrowersRepayment());
        await dispatch(GetLoansDisbursed());
        setIsFetching(false);
    }

    const requestInformation = (request) => 
    {
        setrequest(request);
        setview_more(true);
    }
    

    return(
        <section className="lattest-product-area pb-40 category-list">
        <ReactNotification />
            <div hidden={!view_more} className="sideview">
                <div>
                    <a className="pull-right">
                    <FontAwesomeIcon icon={faTimesCircle} onClick={() => setview_more(false)} style={{color:'red',fontSize:25}} />
                    </a>
                </div>
                <div className="">
                    <div id="">
                    { Object.keys(request).length > 0 && <Request request = {request} />   }
                    
                    </div>
                </div>
            </div>
            <StepWizard>
                <DisbursedFundRepayment loansdisbursed ={loansdisbursed} />
                <RepaymentOrder />
            </StepWizard>
            <div style={{textAlign:'center',marginTop:100}}>
               
            </div>    
        </section>
    );
}

export default OpenRepaymentforLender;