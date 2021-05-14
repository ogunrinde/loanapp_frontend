import React, {useState, useEffect} from 'react';
import Header from '../Header';
import { Link } from 'react-router-dom';
import '../../css/css/analytics.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faTrash, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Loader from 'react-loader-spinner';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import {useSelector, useDispatch } from 'react-redux';
import {  LenderWithdrawcash, GetRepayment } from '../redux/action/index';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Error } from '../Message/message';
import { PAYSTACK_APIKEY } from '../redux/action/constants';
import { usePaystackPayment, PaystackButton,PaystackConsumer } from 'react-paystack';
import { useForm } from 'react-hook-form';
import { data } from 'jquery';


const RepaymentWithdrawal = (props) => 
{
	const dispatch = useDispatch();
    const repayments = useSelector(state => state.root.withdrawfromrepayments);
    const [IsFetching, setIsFetching] = useState(false);
    const [isSubmitting, setisSubmitting] = useState(false);
    const [IsWithdrawing, setIsWithdrawing] = useState(false);
    const [view_more, setview_more] = useState(false);
    const [repayment, setrepayment] = useState({});
    const month = useSelector(state => state.root.month);
    const { handleSubmit, register, errors } = useForm();
    const userdetails = useSelector(state => state.root.userbasicdetails);
    const [amount, setamount ] = useState(0);
    const [ withdrawall, setwithdrawall] = useState(false);
    const [message, setmessage ] = useState('');
    useEffect(() => {
        process();
    },[]);


    

    const WithdrawNow = async () => {
        setIsWithdrawing(true);
        let data = {};
        if(withdrawall == true){
            data.all = 1;
        } 
        else{
            data.all = 0;
            data.repaymentId = repayment.id;
        } 
        data.amount = amount * 100;
		await dispatch(LenderWithdrawcash(repayment.borrower_request_id, data));
		setIsWithdrawing(false);
    }

    const process = async  () =>
    {
        setIsFetching(true);
        await dispatch(GetRepayment());
        setIsFetching(false);
    }

    const requestInformation = (repayment) => 
    {
        //alert(JSON.stringify(request));
        setrepayment(repayment);
        setwithdrawall(false);
        setamount(repayment.amount_paid);
        setview_more(true);
    }

    const handleChange = (e) => {
        if(repayments == null) return false;
        if(withdrawall == false)
        {
            let total = 0;
            for(let r = 0; r < repayments.length; r++){
                if(repayments[r].borrower_id == repayment.borrower_id)
                {
                    total += repayments[r].amount_paid;
                }
            }
            setamount(total);
        }else {
            setamount(repayment.amount_paid);
        }
        setwithdrawall(!withdrawall);
        
    }

    const FormatDate = (date) => {
        date = date.split(' ')[0];
        let d = date.split('-');
        let day = d[2];
        let mth = month[parseInt(d[1])-1];
        let year = d[0];
        return `${day} ${mth}, ${year}`;
    }


    return(
        <section className="lattest-product-area pb-40 category-list">
            <ReactNotification />
            {
            view_more == true && 
            <div className="sideview2" style={{padding:20,backgroundColor:'#f2f4f6'}}>
                <div>
                    <a className="pull-right">
                    <FontAwesomeIcon icon={faTimesCircle} onClick={() => setview_more(false)} style={{color:'red',fontSize:25}} />
                    </a>
                </div>
                <div className="" style={{width:'100%'}}>
                    <div id="" style={{textAlign:'center'}}>
                       <h3>Withdraw from Repayment</h3>
                       <h2 style={{marginTop:20}}>NGN {amount}</h2>
                       <div>
                        
                        <div className="row" style={{marginTop:15}}>
                            <div style={{width:'80%', marginLeft:'10%',marginTop:30}}>                           
                            <div className="col-lg-12 col-sm-12 col-md-12 col-lg-offset-2">   
                            <fieldset>
                            <input type="checkbox" 
                                    name = "allpayment"
                                    onChange={handleChange}
                                    defaultChecked={withdrawall}
                            />&nbsp;&nbsp;&nbsp; Withdraw All from this Borrower
                                <small className="text-danger">{message}</small>
                            </fieldset>
                            </div>
                            <div className="row">
                            <div className="col-lg-12 col-sm-12 col-md-12 col-lg-offset-2">
                            {
                                parseFloat(amount) > 0 && IsWithdrawing == false &&
                                
                                <button onClick = {WithdrawNow} style={{padding:5,marginTop:20,color:'#fff',marginLeft:7,background:'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)',borderRadius:3}}>Withdraw Now</button>
                               
                            }
                            <Loader
                                        visible={IsWithdrawing}
                                        type="Puff"
                                        color="#ffbb38"
                                        height={30}
                                        width={30}
                                        timeout= {0} //3 secs
                                
                                    />
                            </div>
                        </div> 
                            </div>
                        </div>
               
                    </div>
    
                    </div>
                </div>
            </div>
        }
				<div hidden = {IsFetching} className="table-responsive ">
                    <table className="table">
                        <thead>
                            <tr className="filter-bar" style={{color:'#fff'}}>
                                <th scope="col">S/N</th>
                                <th scope="col">Borrower Name</th>
                                <th scope="col">Amount Paid</th>
                                <th scope="col">Date Paid</th>
								<th scope="col">Option</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            repayments != null &&
                            repayments.map((repayment,id) =>
                            <tr>
                                <td>
                                    {id+1}
                                </td>
                                <td>
                                    <div className="media">
                                    
                                        <div className="media-body">
                                            {repayment.borrower.name}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {repayment.amount_paid}
                                </td>
                                <td>
                                    {FormatDate(repayment.date_paid)}
                                </td>
                                <td>
                                    <button onClick = {() => requestInformation(repayment)} style={{padding:3,color:'#fff',background:'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)',borderRadius:3}}>Withdraw</button>
                                
                                </td>
                            </tr>
                            )
                        }    
                        
                            
					
                        </tbody>   
                       
				    </table>
                    {
                            repayments != null &&
                            repayments.length == 0 &&
                            <div style={{textAlign:'center', marginTop:20,width:'100%'}}>No Data Found</div>
                    }
                </div>
                <div style={{textAlign:'center',marginTop:100}}>
                    <Loader
                        visible={IsFetching}
                        type="Puff"
                        color="#ffbb38"
                        height={30}
                        width={30}
                        timeout= {0} //3 secs
                
                    />
                </div>    
			</section>
        
    );
}

export default RepaymentWithdrawal;