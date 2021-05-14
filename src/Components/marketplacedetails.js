import React, {useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import $ from 'jquery';
import '../css/account/custom.css';
import { GetProfile, UpdateLoanRequestStatus,places, countrystates, Getcities, UpdateSuredeal, ConnectwithLenderviaSearch, GetVault, ConnectwithLender, GetUserLoanRequest } from './redux/action/index';
import Loader from 'react-loader-spinner';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import { useForm } from 'react-hook-form';
import '../css/css/profile.css';
import {Error} from './Message/message';

const MarketPlaceDetails = (props) => {

    const [IsFetchingUserInformation, setIsFetchingUserInformation] = useState(false);
    const userdetails = useSelector(state => state.root.userbasicdetails);
    const userhomeaddress = useSelector(state => state.root.userHomeAddress);
    const userofficeaddress = useSelector(state => state.root.userOfficeAddress);
    const usersocialmedia = useSelector(state => state.root.userSocialMediaAccounts);
    const bankdetail = useSelector(state => state.root.userBankInformation);
    const IsLoggedIn = useSelector(state => state.root.IsLoggedIn);
	const [ IsGettingVault, setIsGettingVault ] = useState(false);
	const countries = useSelector(state => state.places.countries);
	const states = useSelector(state => state.places.states);
	const cities = useSelector(state => state.root.cities);
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
	const [ isLoadingCountries, setisLoadingCountries] = useState(false);
	const [ isLoadingCities, setisLoadingCities ] = useState(false);
	const [ isLoadingState, setisLoadingState ] = useState(false);

	// const onSubmit = data => {
    //     dispatch(UpdateSuredeal(data));
	// }
    useEffect(() =>{
		process();
        //getUserInformation();
		//dispatch(GetUserLoanRequest());
		//alert(JSON.stringify(LoanRequestData));
		//alert(props.lenderId);
    },[props.vault]);
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
        if(props.lenderId == undefined || props.lenderId == 0) return false;
        setIsFetchingUserInformation(true);
        await dispatch(GetProfile(props.lenderId));
        setIsFetchingUserInformation(false);
		
	}

	const updatestatus = async (status,connectId) => {
		setIsSubmitting(true);
		await dispatch(UpdateLoanRequestStatus(status,connectId,props.request.borrower_id,request.request.id));
		setIsSubmitting(false);
    }

    const vault = async () => {
        setIsGettingVault(true);
        //await dispatch(GetVault(props.vaultId));
        setIsGettingVault(false);
	}
	
	const onSubmit = async (data,e) => {
		if(parseFloat(data.requestAmount) > props.vault.maxRequestAmount)
		{
			//alert(event.target.name);
			Error("Invalid",`Request Amount must not be greater than NGN ${props.vault.maxRequestAmount}`);
			return false;
		}
		else if(parseFloat(data.maxInterestRate) < props.vault.minInterestperMonth)
        {
            Error("Invalid",`Minimum Interest per Month can not less than ${props.vault.minInterestperMonth}`);
			return false;
		}
		let offerdays = props.vault.maxloantenor * 30;
		let loandays = parseFloat(data.loanperiod) * 30;
		if(offerdays < loandays)
		{
			Error("Invalid",`Maximum Loan period is ${offerdays} days`);
			return false;
		}

		setIsSubmittingForm(true);
		//data.connection_type = 'marketplace';
		await dispatch(ConnectwithLenderviaSearch(data, props.vault.id, props.lenderId,e));
		setIsSubmittingForm(false);
            
	}

	process = async () => {
        setisLoadingCountries(true);
        await dispatch(places());
        setisLoadingCountries(false);
    }

    const connectLender = async () => {
        setIsConnecting(true);
        await dispatch(ConnectwithLender(props.lenderId,props.vaultId,LoanRequestData.id));
        setIsConnecting(false);
    }

    const FormatDate = (date) => {
        let d = date.split('-');
        let day = d[2];
        let mth = month[parseInt(d[1])-1];
        let year = d[0];
        return `${day} ${mth}, ${year}`;
	}

	const days = (from,to) => {
		const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
		//alert(new Date().getDate() + 1);
        let fromyear = new Date().getFullYear(); //from.split('-')[0];
        let frommonth = new Date().getMonth() + 1;// from.split('-')[1];
        let fromday = new Date().getDate();// from.split('-')[2];

        let toyear = to.split('-')[0];
        let tomonth = to.split('-')[1];
        let today = to.split('-')[2];
        const firstDate = new Date(fromyear, frommonth, fromday);
        const secondDate = new Date(toyear, tomonth, today);

        const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
        //alert(diffDays);
        return diffDays;
	}
	
	const handlePlaceChange = async (event) => {
        setisLoadingState(true);
        await dispatch(countrystates(event.target.value));
		setisLoadingState(false);
		//alert(event.target.value);
        //handleInput(event);
    }

    const handleState = (event) => {
        //alert(event.target.value);
        setisLoadingCities(true);
        dispatch(Getcities(event.target.value));
        setisLoadingCities(false);
        //handleInput(event);
    }

	
	const handleChange = (event) => {
		//alert(event.target.name);
		if(event.target.name == 'requestAmount' && parseFloat(event.target.value) > props.vault.maxRequestAmount)
		{
			//alert(event.target.name);
			Error("Invalid",`Request Amount must not be greater than NGN ${props.vault.maxRequestAmount}`);
			return false;
		}
		else if(event.target.name == 'maxInterestRate' && parseFloat(event.target.value) < props.vault.minInterestperMonth)
        {
            Error("Invalid",`Minimum Interest per Month can not less than ${props.vault.minInterestperMonth}`);
			return false;
		}
		else if(event.target.name == 'loanperiod')
        {
			let offerdays = props.vault.maxloantenor * 30;
			let loandays = parseFloat(event.target.value) * 30;
			//alert(`${offerdays}--${loandays}`);
			if(offerdays < loandays)
			{
				Error("Invalid",`Maximum Loan period is ${offerdays} days`);
			    return false;
			}
            
		}
		return true;
		//alert('yes');
	}
    
    // const onSubmit = data => {
    //     dispatch(UpdateSuredeal(data));
	// }
    return(
		<div>
		{	
		 Object.keys(userprofile).length > 0 &&	
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
                       <h3>Connect with Lender</h3>
                       <h4>Complete the Form Below</h4>
					   <p className="text-danger" style={{fontSize:12}}>Maximum Amount to borrow: NGN {props.vault.maxRequestAmount}</p>
					   <p className="text-danger" style={{fontSize:12}}>Minimum Amount to borrow: NGN {props.vault.minRequestAmount}</p>
                    </div>
                </div>  
                
                <div className="row" style={{marginTop:20}}>
                    <div className="col-lg-6 col-sm-12 col-md-6">
                    <label style={{color:'#777777',fontSize:14,marginBottom:7}}>Request Amount </label>
                    <fieldset>
                       <input
					    onKeyUp = {handleChange}
                        placeholder=""
                        type="number" 
                        min="1"
                        name="requestAmount"
						tabindex="1" 
						style={{padding:7}}
                        autofocus
                        ref={register({
                            required: "Required",
                            min:1,
                            max:999999999999999
                          })}
                        />
                        <small className="text-danger">{errors.requestAmount?.type == "required" && "Request Amount is required"}</small>
                    </fieldset>
                    </div>
                    <div className="col-lg-6 col-sm-12 col-md-6">
					<label style={{color:'#777777',fontSize:14,marginBottom:7}}>Loan Period </label>	
                    <fieldset>
					   <select name="loanperiod" 
					    onChange = {handleChange}
                        style={{color:'#777777',padding:11}}
                        ref={register({
                            required: "Required"
                          })}
                       >
                          <option value=""></option>
                          <option value="1">1 months</option>
                          <option value="3">3 months</option>
                          <option value ="6">6 months</option>
                          <option value="12">1 year</option>
                          <option value="24">2 years</option>
                          <option value="36">3 years</option>
                      </select> 
                      <small className="text-danger">{errors.loanperiod?.type == "required" && "Loan Period is required"}</small>
                    </fieldset>
                    </div>
            
                </div>

              
               
                <div className="row">
                    <div className="col-lg-6 col-sm-12 col-md-6">
					<label style={{color:'#777777',fontSize:14,marginBottom:7}}>Max Interest Rate </label>	
                     
                    <fieldset>
                       <input
                        onKeyUp = {handleChange}
                        type="number" 
						min="1"
						style={{padding:7}}
                        name="maxInterestRate"
                        tabindex="1" 
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
                    <div className="col-lg-6 col-sm-12 col-md-6">
					<label style={{color:'#777777',fontSize:14,marginBottom:7}}>Repayment Plan </label>	
                    <fieldset>
                     <select name="repaymentplan" 
                            style={{color:'#777777',padding:11}}
                            placeholder=""
                            ref={register({
                                required: "Required"
                              })}
                    >
                          <option value=""></option>
                          <option value="Daily">Daily</option>
                          <option value="Weekly">Weekly</option>
                          <option value= "Monthly">Monthly</option>
                          <option value="At the End">At the End</option>
                      </select> 
                        <small className="text-danger">{errors.repaymentplan?.type == "required" && "Repayment Plan is required"}</small>
                    </fieldset>
                    </div>
                </div>
               

                <div className="row">
                   
                    <div className="col-lg-6 col-sm-12 col-md-6">
					    <label style={{color:'#777777',fontSize:14,marginBottom:7}}>Credit Bereau </label>
                        <fieldset>
                        <select 
                            name="requiredcreditBereau" 
                            style={{color:'#777777',padding:11}}
                            placeholder=""
                            ref={register({
                                required: "Required"
                              })}
                        >
                            <option value=""></option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select> 
                            <small className="text-danger">{errors.requiredcreditBereau?.type == "required" && "Credit Bereau field is required"}</small>
                        </fieldset>
                    </div>
					<div className="col-lg-6 col-sm-12 col-md-6">
					    <label style={{color:'#777777',fontSize:14,marginBottom:7}}>Borrower Country </label>
                        <fieldset>
                        <select 
                                    name="borrower_country_id"
                                    style={{color:'#777777'}}
                                    onChange = {(text) => handlePlaceChange(text)}
                                    ref={register({
                                        required: "Required",
                                    })}
                                >
                                <option value ="">Select Your Country</option>
                                    {
                                        countries.map((country) =>
                                        <option value ={country.id}>{ country.name }</option>
                                    )}
                            </select> 
                            <small className="text-danger">{errors.borrower_country_id?.type == "required" && "Country is required"}</small>
                            { isLoadingCountries == true && <small className="text-danger">Loading Countries....</small>}
                        </fieldset>
                    </div>
                    
               
                </div>
				<div className="row">
                   
                    
					<div className="col-lg-6 col-sm-12 col-md-6">
					    <label style={{color:'#777777',fontSize:14,marginBottom:7}}>Borrower State </label>
                        <fieldset>
						<select 
                                    name="borrower_state_id"
                                    onChange = {(text) => handleState(text)}
                                    style={{color:'#777777'}}    
                                    ref={register({
                                        required: "Required",
                                    })}
                                >
                                <option value ="">Select Your State</option>
                                    {
                                        states.map((state) =>
                                        <option value ={state.id}>{ state.name }</option>
                                    )}
                            </select> 
                            <small className="text-danger">{errors.borrower_state_id?.type == "required" && "State is required"}</small>
                            { isLoadingState == true && <small className="text-danger">Loading States....</small>}
                        </fieldset>
                    </div>
					<div className="col-lg-6 col-sm-12 col-md-6">
					    <label style={{color:'#777777',fontSize:14,marginBottom:7}}>Borrower City </label>
                        <fieldset>
						<select 
                                    name="borrower_city_id"
                                    style={{color:'#777777'}}    
                                    ref={register({
                                        required: "Required",
                                    })}
                                >
                                <option value ="">Select Your City</option>
                                    {
                                        cities.map((city) =>
                                        <option value ={city.id}>{ city.name }</option>
                                    )}
                            </select> 
                            <small className="text-danger">{errors.borrower_city_id?.type == "required" && "City is required"}</small>
                            { isLoadingCities == true && <small className="text-danger">Loading Cities....</small>}
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
				{/* <ul className="tabs">
                    <li className="tab-link current" data-tab="userdetails">Basic Information</li>
					<li className="tab-link" data-tab="officeaddress">Office Address</li>
					<li className="tab-link" data-tab="Edu-detail">Bank Details</li>
                    <li className="tab-link" data-tab="vault" onClick = {vault}>Lender Vault</li>
				</ul> */}
                {/* <div id="userdetails" className="tab-content current">
					<div className="bio-box">
						<div className="heading">
							<p>Surname</p>
						</div>
						<div className="desc">
							{userprofile.userdetails.surname}
						</div>
					</div>
					<div className="bio-box">
						<div className="heading">
							<p>Firstname</p>
						</div>
						<div className="desc">
							{userprofile.userdetails.firstname}
						</div>
					</div>
					<div className="bio-box">
						<div className="heading">
							<p>Middlename</p>
						</div>
						<div className="desc">
							{userprofile.userdetails.middlename}
						</div>
					</div>
					<div className="bio-box">
						<div className="heading">
							<p>Email</p>
						</div>
						<div className="desc">
							{userprofile.userdetails.email}
						</div>
					</div>
                    <div className="bio-box">
						<div className="heading">
							<p>Gender</p>
						</div>
						<div className="desc">
							{userprofile.userdetails.gender}
						</div>
					</div>
                    <div className="bio-box">
						<div className="heading">
							<p>Mobile Number 1</p>
						</div>
						<div className="desc">
							{userprofile.userdetails.mobile1}
						</div>
					</div>
                    <div className="bio-box">
						<div className="heading">
							<p>Mobile Number 2</p>
						</div>
						<div className="desc">
							{userprofile.userdetails.mobile2}
						</div>
					</div>
					
				</div>
				
				<div id="officeaddress" className="tab-content">
				
                    <div className="bio-box">
						<div className="heading">
							<p>Employment Status</p>
						</div>
						<div className="desc">
							{userprofile.officeaddress.employmentstatus}
						</div>
					</div>
					<div className="bio-box">
						<div className="heading">
							<p>Company Name</p>
						</div>
						<div className="desc">
							{userprofile.officeaddress.company_name}
						</div>
					</div>
					<div className="bio-box">
						<div className="heading">
							<p>Contact Number</p>
						</div>
						<div className="desc">
							{userprofile.officeaddress.contact_number}
						</div>
					</div>
					<div className="bio-box">
						<div className="heading">
							<p>Office Contact Website</p>
						</div>
						<div className="desc">
							{userprofile.officeaddress.contact_website}
						</div>
					</div>
					
				</div>
				
				<div id="Edu-detail" className="tab-content">
                    <div className="bio-box">
						<div className="heading">
							<p>BVN</p>
						</div>
						<div className="desc">
							{userprofile.bankdetails.bvn}
						</div>
					</div>
                    <div className="bio-box">
						<div className="heading">
							<p>Bank Name</p>
						</div>
						<div className="desc">
							{userprofile.bankdetails.bankname}
						</div>
					</div>
					<div className="bio-box">
						<div className="heading">
							<p>Account Number</p>
						</div>
						<div className="desc">
							{userprofile.bankdetails.accountnumber}
						</div>
					</div>
               
                </div>

                <div id="vault" className="tab-content">
                    <div className="bio-box">
						<div className="heading">
							<p>Maximum Request Amount (NGN)</p>
						</div>
						<div className="desc">
                           {props.vault.maxRequestAmount.toLocaleString()}
						</div>
					</div>
                    <div className="bio-box">
						<div className="heading">
							<p>Minimum Request Amount (NGN)</p>
						</div>
						<div className="desc">
                             {props.vault.minRequestAmount.toLocaleString()}
						</div>
					</div>
					<div className="bio-box">
						<div className="heading">
							<p>Minimum Interest Per Month</p>
						</div>
						<div className="desc">
                           {props.vault.minInterestperMonth}%
						</div>
					</div>
                    <div className="bio-box">
						<div className="heading">
							<p>Maximum Interest Per Month</p>
						</div>
						<div className="desc">
                           {props.vault.minInterestperMonth}%
						</div>
					</div>
                    <div className="bio-box">
						<div className="heading">
							<p>Fund Available From Date</p>
						</div>
						<div className="desc">
                          {FormatDate(props.vault.availablefrom)}
						</div>
					</div>

                    <div className="bio-box">
						<div className="heading">
							<p>Fund Available To Date</p>
						</div>
						<div className="desc">
                           {FormatDate(props.vault.availableto)}
						</div>
					</div>
               
                    <div style={{textAlign:'center',marginTop:'25%'}}>
                        <Loader
                            visible={IsGettingVault}
                            type="Puff"
                            color="#ffbb38"
                            height={30}
                            width={30}
                            timeout= {0} //3 secs
                    
                        />
                    </div>
                </div>
				 */}
			</div>
		</div>
	    
		</div>
		}
		<div style={{textAlign:'center',marginTop:'35%'}}>
			<Loader
				visible={IsFetchingUserInformation}
				type="Puff"
				color="#ffbb38"
				height={30}
				width={30}
				timeout= {0} //3 secs
		
			/>
		</div>
		
		</div>
    );
}

export default MarketPlaceDetails;
