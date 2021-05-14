import React, {useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import $ from 'jquery';
import '../css/account/custom.css';
import { GetProfile, UpdateLoanRequestStatus, UpdateSuredeal, GetVault, ConnectwithBorrower, GetUserLoanRequest } from './redux/action/index';
import Loader from 'react-loader-spinner';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import { useForm } from 'react-hook-form';
import '../css/css/profile.css';

const MarketPlacedetailsForBorrower = (props) => {

    const [IsFetchingUserInformation, setIsFetchingUserInformation] = useState(false);
    const userdetails = useSelector(state => state.root.userbasicdetails);
    const userhomeaddress = useSelector(state => state.root.userHomeAddress);
    const userofficeaddress = useSelector(state => state.root.userOfficeAddress);
    const usersocialmedia = useSelector(state => state.root.userSocialMediaAccounts);
    const bankdetail = useSelector(state => state.root.userBankInformation);
    const IsLoggedIn = useSelector(state => state.root.IsLoggedIn);
    const [ IsGettingVault, setIsGettingVault ] = useState(false);
    //const lenderVault = [];//useSelector(state => state.root.lendervault);
	const { handleSubmit, register, errors } = useForm();
	const dispatch = useDispatch();
	const userprofile = useSelector(state => state.root.viewuserprofile);
    const [IsSubmitting, setIsSubmitting] = useState(false);
    const [IsConnecting, setIsConnecting] = useState(false);
    const request = props.request;
    const month = useSelector(state => state.root.month);
	const LoanRequestData = useSelector(state => state.root.loanrequest);
	const [IsSubmittingForm, setIsSubmittingForm] = useState(false);

	// const onSubmit = data => {
    //     dispatch(UpdateSuredeal(data));
	// }
    useEffect(() =>{
        //getUserInformation();
        //dispatch(GetUserLoanRequest());
    },[props.request]);
    if(Object.keys(userprofile).length > 0)
    {
		//console.log(request);
        $('ul.tabs li').click(function(){
			var tab_id = $(this).attr('data-tab');
			$('ul.tabs li').removeClass('current');
			$('.tab-content').removeClass('current');

			$(this).addClass('current');
			$("#"+tab_id).addClass('current');
		});
	}
	const getUserInformation = async () => {
        if(props.borrowerId == undefined || props.borrowerId == 0) return false;
		setIsFetchingUserInformation(true);
		//alert(props.borrowerId);
        await dispatch(GetProfile(props.borrowerId));
        setIsFetchingUserInformation(false);
		
	}

	const updatestatus = async (status,connectId) => {
		setIsSubmitting(true);
		await dispatch(UpdateLoanRequestStatus(status,connectId,props.request.borrower_id,request.request.id));
		setIsSubmitting(false);
    }

    const vault = async () => {
        //setIsGettingVault(true);
        //await dispatch(GetVault(props.vaultId));
        //setIsGettingVault(false);
    }

    const connectBorrower = async () => {
        setIsConnecting(true);
		let data = {borrower_request_id : props.request.id, borrower_id:props.request.user.id};
        await dispatch(ConnectwithBorrower(data));
        setIsConnecting(false);
    }

	
	const handleChange = (event) => {
		if(event.target.name == 'fundAmount' && parseFloat(event.target.value) < props.request.requestAmount)
		{
			//alert(event.target.name);
			Error("Invalid",`You need to fund your wallet with NGN ${props.request.requestAmount}`);
			return false;
		}
	}
    
    const onSubmit = async (request) => {
		//dispatch(UpdateSuredeal(data));
		setIsSubmittingForm(true);
		let data = {borrower_request_id : props.request.id, borrower_id:props.request.user.id, connection_type : 'lender connect'};
		//alert(JSON.stringify(data));
        await dispatch(ConnectwithBorrower(data));
        setIsSubmittingForm(false);
	}
    return(
		<div>
        <div hidden = {IsFetchingUserInformation} className="profile-main">
		<ReactNotification />	
		<div className="profile-header">
			
			<div className="">
			<section>
            <div className="profilecontainer"> 
              <div id="contact"> 
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className ="col-lg-12 col-sm-12 col-md-12">
                       <h3>Connect with Borrower</h3>
                       <h4>Complete the Form Below</h4>
					   <p className="text-danger" style={{fontSize:12}}>Amount Borrower Needs : NGN {props.request.requestAmount}</p>
                    </div>
                </div>  
                
                <div className="row" style={{marginTop:20}}>
                    <div className="col-lg-12 col-sm-12 col-md-12">
                    <label style={{color:'#777777',fontSize:14,marginBottom:7}}>Amount </label>
                    <fieldset>
                       <input
					    onKeyUp = {handleChange}
                        placeholder=""
                        type="number" 
                        min="1"
						name="fundAmount"
						readOnly="true"
						tabindex="1" 
						defaultValue = {props.request.requestAmount}
						style={{padding:7}}
                        autofocus
                        ref={register({
                            required: "Required",
                            min:1,
                            max:999999999999999
                          })}
                        />
                        <small className="text-danger">{errors.fundAmount?.type == "required" && "Amount is required"}</small>
                    </fieldset>
                    </div>
                </div>

              
               
                <div className="row">
                    <div className="col-lg-12 col-sm-12 col-md-6">
					<label style={{color:'#777777',fontSize:14,marginBottom:7}}>Max Interest Rate per Month</label>	
                     
                    <fieldset>
                       <input
                        onKeyUp = {handleChange}
                        type="number" 
						min="1"
						style={{padding:7}}
                        name="maxInterestperMonth"
						tabindex="1" 
						readOnly="true"
						defaultValue ={props.request.maxInterestRate}
                        autofocus
                        ref={register({
                            required: "Required",
                            min:1,
                            max:999999999999999
                          })}
                        />
                        <small className="text-danger">{(errors.maxInterestRate?.type == "min" || errors.maxInterestRate?.type =="max") && "Invalid Input"}</small>
                        <small className="text-danger">{errors.maxInterestRate?.type == "required" && "Maximum Interest Rate is required"}</small>
                    </fieldset>
                    </div>
                    <div className="col-lg-12 col-sm-12 col-md-12">
					<label style={{color:'#777777',fontSize:14,marginBottom:7}}>Max Loan Tenor (in Months)</label>	
					<fieldset>
                       <input
                        type="number" 
						min="1"
						style={{padding:7}}
                        name="maxloantenor"
						tabindex="1" 
						readOnly="true"
						defaultValue ={props.request.loanperiod}
                        autofocus
                        ref={register({
                            required: "Required",
                            min:1,
                            max:999999999999999
                          })}
                        />
                        <small className="text-danger">{(errors.maxloantenor?.type == "min" || errors.maxloantenor?.type =="max") && "Invalid Input"}</small>
                        <small className="text-danger">{errors.maxloantenor?.type == "required" && "Maximum Loan Tenor Rate is required"}</small>
                    </fieldset>
                    </div>
                </div>
               
                    <fieldset>
                    <div className="row" style={{marginTop:30}}>
                        <div className="col-lg-3">
    
                        </div>
                        <div className="col-lg-3">
                          
                        </div>
                        <div className="col-lg-6">
                            
                                
                                <button name="submit" hidden = {IsSubmittingForm}  type="submit" id="" data-submit="...Sending">Submit Request</button>
                              
                            <div style={{width:'100%',textAlign:'center'}}>
                            <Loader
								visible={IsSubmittingForm}
								type="Puff"
								color="#ffbb38"
								height={30}
								width={30}
								timeout= {0} //3 secs
						
							/>
                        </div>    
                        </div>
                    </div>    
                    
                    </fieldset>
            </form>
    
                 
              </div>
            </div>    
               
            </section>	
				
			</div>
		</div>
	    
		</div>
		
		
		</div>
    );
}

export default MarketPlacedetailsForBorrower;
