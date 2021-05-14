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
import {  GetCompleteVault, WithdrawforVault } from '../redux/action/index';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Error } from '../Message/message';
import { PAYSTACK_APIKEY } from '../redux/action/constants';
import { usePaystackPayment, PaystackButton,PaystackConsumer } from 'react-paystack';
import { useForm } from 'react-hook-form';


const VaultWithdrawal = (props) => 
{
	const dispatch = useDispatch();
    //const IsFetching = useSelector(state => state.root.IsFetching);
    const vault = useSelector(state => state.root.myvault);
    const [IsFetching, setIsFetching] = useState(false);
    const [isSubmitting, setisSubmitting] = useState(false);
    const [view_more, setview_more] = useState(false);
    const [surevault, setsurevault] = useState({});
    const month = useSelector(state => state.root.month);
    const { handleSubmit, register, errors } = useForm();
    const userdetails = useSelector(state => state.root.userbasicdetails);
    const [amount, setamount ] = useState(0);
    const [message, setmessage ] = useState('');
    useEffect(() => {
        process();
    },[]);



    const componentProps = {
		reference : (new Date()).getTime(),
		email: userdetails.email,
		amount:amount * 100,
		publicKey: PAYSTACK_APIKEY,
		text:'Transfer',
		onSuccess: (response) => {
            //UpdateSureVault(response);
			//UpdateDisbursed(response);
			//setIsDisbursed(true);
			//alert(JSON.stringify(response));
			//console.log(response);
		},
		onClose: () => {
			window.location.href = '/vault_withdrawal';
		}
    };

    const UpdateSureVault = async () => {
        setisSubmitting(true);
        await dispatch(WithdrawforVault(surevault.id));
        setisSubmitting(false);
        setamount(0);
        setview_more(false);
    }

    const ConfirmAmountInVault = (event) => {
        setmessage('');
        if(isNaN(event.target.value))
        {
            Error("Request Failed", "Not a Valid Number");
            setamount(0);
            setmessage("Not a Valid Number");
            return false;
        }
        if(parseFloat(surevault.fundamount) < parseFloat(event.target.value))
        {
           Error("Request Failed", "You cannot withdraw more than you have in Vault");
           setmessage("You cannot withdraw more than you have in Vault");
           setamount(0);
           return false;
        }
        let amount = parseFloat(event.target.value);
        setamount(amount);
    }
    

    const onSubmit = async (data) =>
    {
        if(surevault.fundamount < data.amount)
        {
           Error("Request Failed", "You cannot withdraw more than you have in Vault");
           return false;
        }
        setisSubmitting(true);
        //await dispatch(VerifyPhone(data.code));
        //dispatch(GetCompleteUserProfile());
        setisSubmitting(false);
    }

    const process = async  () =>
    {
        setIsFetching(true);
        await dispatch(GetCompleteVault());
        setIsFetching(false);
    }

    const requestInformation = (surevault) => 
    {
        //alert(JSON.stringify(request));
        setsurevault(surevault);
        setview_more(true);
    }

    const FormatDate = (date) => {
        date = date.split('T')[0];
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
                       <h3>Withdraw from Vault</h3>
                       
                       <div>
                        
                        <div className="row" style={{marginTop:15}}>
                            <div style={{width:'80%', marginLeft:'10%',marginTop:30}}>                           
                            <div className="col-lg-12 col-sm-12 col-md-12 col-lg-offset-2">   
                            <fieldset>
                            <input
                                placeholder="Enter amount to withdraw"
                                type="text"
                                className="form-control"
                                name="amount"
                                tabindex="1" 
                                autofocus
                                onChange = {(event) => ConfirmAmountInVault(event)}
                                />
                                <small className="text-danger">{message}</small>
                            </fieldset>
                            </div>
                            <div className="row">
                            <div className="col-lg-12 col-sm-12 col-md-12 col-lg-offset-2">
                            {
                                parseFloat(amount) > 0 && isSubmitting == false &&
                                
                                <button onClick = {UpdateSureVault} style={{padding:5,marginTop:20,color:'#fff',marginLeft:7,background:'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)',borderRadius:3}}>Withdraw Now</button>
                               
                            }
                            <Loader
                                        visible={isSubmitting}
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
                                <th scope="col">Available Fund</th>
                                <th scope="col">Max Request Amount</th>
                                <th scope="col">Min Request Amount</th>
                                <th scope="col">Max Interest Rate</th>
                                <th scope="col">Min Interest Rate</th>
								<th scope="col">Option</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            vault.map((surevault,id) =>
                            <tr>
                                <td>
                                    {id+1}
                                </td>
                                <td>
                                    <div className="media">
                                    
                                        <div className="media-body">
                                            {surevault.fundamount.toLocaleString()}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {surevault.maxRequestAmount.toLocaleString()}
                                </td>
                                <td>
                                    {surevault.minRequestAmount.toLocaleString()}
                                </td>
                                <td>
                                    {surevault.maxInterestperMonth}%
                                </td>
                                <td>
                                    {surevault.minInterestperMonth}%
                                </td>
                                <td>
                                    <button onClick = {() => requestInformation(surevault)} style={{padding:3,color:'#fff',background:'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)',borderRadius:3}}>Withdraw</button>
                                
                                </td>
                            </tr>
                            )
                        }    
                        
                            
					
                        </tbody>   
                       
				    </table>
                    {
                            surevault.length == 0 &&
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

export default VaultWithdrawal;