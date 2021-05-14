import React, {useState, useEffect} from 'react';
import Header from '../Header';
import { Link } from 'react-router-dom';
import '../../css/css/analytics.css'
import Footer from '../Footer';
import Analytics from '../analytics';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faTrash, faTimesCircle, faAngleLeft, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import SureRequest from '../sureRequest';
import Loader from 'react-loader-spinner';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import {useSelector, useDispatch } from 'react-redux';
import Sidebar from './sidebar';
import {  GetBorrowersRepayment, UpdatePayment, GetBorrowerPaymentSchedules } from '../redux/action/index';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Request from './Request';
import { usePaystackPayment, PaystackButton,PaystackConsumer } from 'react-paystack';
import { PAYSTACK_APIKEY } from '../redux/action/constants';

const BorrowerRepaymentOrder = (props) => {

    const dispatch = useDispatch();
    const repayments = useSelector(state => state.root.repayments_borrower);
    const requestID = useSelector(state => state.root.repaymentsonrequestId);
    const [IsFetching, setIsFetching] = useState(false);
    const [view_more, setview_more] = useState(false);
    const [request, setrequest] = useState({});
    const month = useSelector(state => state.root.month);
    let analytics = useSelector(state => state.root.paymentanalytics);
    const [ IsSubmitting, setIsSubmitting] =  useState(false);
    const userdetails = useSelector(state => state.root.userbasicdetails);

    useEffect(() =>{
        getdata();
    },[requestID]);

    const getdata = async () =>
    {
        if(isNaN(requestID)) return false;
        setIsFetching(true);
        await dispatch(GetBorrowerPaymentSchedules(requestID));
        await dispatch(GetBorrowersRepayment(requestID));
        //alert(JSON.stringify(requestID));
        setIsFetching(false);
        //props.nextStep();
    }

    const CreateRepayment = async (response) => {
        setIsSubmitting(true);
        let data = {response: response, reference:response.reference};
        await dispatch(UpdatePayment(data,request.id));
        setIsSubmitting(false);
    }

    const componentProps = {
		reference : (new Date()).getTime(),
		email: userdetails.email,
		amount: 100 * (analytics.todaydue + analytics.overdues),
		publicKey: PAYSTACK_APIKEY,
		text:'Transfer',
		onSuccess: (response) => {
            CreateRepayment(response);
			//UpdateDisbursed(response);
			//setIsDisbursed(true);
			//alert(JSON.stringify(response));
			console.log(response);
		},
		onClose: () => {
			//window.location.href = '/loantobedisbursed';
		}
    };


    const FormatDate = (date) => {
        date = date.split(' ')[0];
        let d = date.split('-');
        let day = d[2];
        let mth = month[parseInt(d[1])-1];
        let year = d[0];
        return `${day} ${mth}, ${year}`;
    }
    return (
    <div>    
    <div> 
    <div>
         <div>
                    You have NGN { analytics.overdues != undefined ? analytics.overdues.toFixed(2) : 0 } Overdue payment and NGN {analytics.todaydue != undefined ? analytics.todaydue.toFixed(2) : 0} for today.
                </div>
         </div>   
     <div className="row">
        
         <div className ="col-xl-1">
             <FontAwesomeIcon icon={faAngleLeft} onClick={() => props.previousStep()} style={{color:'#ff6c00',fontSize:45}} />
         </div>
         <div className ="col-xl-2">
             <p style={{marginTop:10,marginLeft:-30, color:"#ff6c00"}}>Back</p>
         </div>
         <div className ="col-xl-6">
         </div>
         <div className ="col-xl-3">
            {
                analytics != null && (analytics.overdues + analytics.todaydue) > 0 &&
                <div style={{textAlign:'right'}}>
                    
                <div className="" style={{marginBottom:10}}>
                    <PaystackConsumer {...componentProps }>
                        {({initializePayment}) => <button onClick = {() => initializePayment()} style={{padding:5,marginTop:20,color:'#fff',marginLeft:7,background:'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)',borderRadius:3}}>Make Payment Now</button>}
                    </PaystackConsumer>
                </div>   
                </div>  
            
            }
              {/* <button style={{padding:3,marginTop:10,color:'#fff',background:'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)',borderRadius:3}}>Pay Lender Now</button> */}
         </div>
     </div>
    </div>    
    <div hidden = {IsFetching} className="table-responsive ">
    <table className="table">
        <thead>
            <tr className="filter-bar" style={{color:'#fff'}}>
                <th scope="col">S/N</th>
                <th scope="col">Lender Name</th>
                <th scope="col">Amount Paid</th>
                <th scope="col">Date Paid</th>
                {/* <th scope="col">Option</th> */}
            </tr>
        </thead>
        <tbody>
        {
            repayments.map((request,id) =>
            <tr>
                <td>{id+1} </td>
                <td>
                    <div className="media">
                    
                        <div className="media-body" style={{textTransform:'capitalize'}}>
                            {request.lender.name}
                        </div>
                    </div>
                </td>
                <td>
                    {request.amount_paid}
                </td>
                <td>
                    {FormatDate(request.date_paid)}
                </td>
                {/* <td>
                    {request.mode_of_payment}
                </td> */}
                {/* <td>
                    <button onClick={getdata} style={{padding:3,color:'#fff',background:'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)',borderRadius:3}}>Repayments</button>
                    <Loader
                    visible={IsFetching}
                    type="Puff"
                    color="#ffbb38"
                    height={30}
                    width={30}
                    timeout= {0} //3 secs
            
                   />
                </td> */}
            </tr>
            )
        }    
        
            
    
        </tbody>   
       
    </table>
    {
            repayments.length == 0 &&
            <div style={{textAlign:'center', marginTop:20,width:'100%'}}>No Data Found</div>
    }
    </div></div>);
}

export default BorrowerRepaymentOrder;