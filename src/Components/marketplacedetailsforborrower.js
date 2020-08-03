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

	// const onSubmit = data => {
    //     dispatch(UpdateSuredeal(data));
	// }
    useEffect(() =>{
        getUserInformation();
        dispatch(GetUserLoanRequest());
    },[props.borrowerId]);
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

    const FormatDate = (date) => {
        let d = date.split('-');
        let day = d[2];
        let mth = month[parseInt(d[1])-1];
        let year = d[0];
        return `${day} ${mth}, ${year}`;
    }
    
    const onSubmit = data => {
        dispatch(UpdateSuredeal(data));
	}
    return(
		<div>
		{	
		 Object.keys(userprofile).length > 0 &&	
        <div hidden = {IsFetchingUserInformation} className="profile-main">
		<ReactNotification />	
		<div className="profile-header">
			<div className="user-detail">
				<div className="user-image">
					<img src="http://nicesnippets.com/demo/up-profile.jpg"/>
				</div>
				<div className="user-data">
                    <h2>{userdetails.surname}</h2>
					<span className="post-label">Admin</span>
					<span className="post-label">Speaker</span>
					<span className="post-label">AMA</span>
					<p>Founder and CEO at okay cdhhfin this is dhgppod  
					
					</p>
                    <p>
                    <Loader
                            visible={IsConnecting}
                            type="Puff"
                            color="#ffbb38"
                            height={30}
                            width={30}
                            timeout= {0} //3 secs
                    
                        />    
                    <button hidden={IsConnecting} onClick = {connectBorrower} style={{padding:5,color:'#fff',background:'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)',borderRadius:3}}>Connect with Borrower Now</button>
					</p>
				</div>
				
			</div>
			<div className="tab-panel-main">
				<ul className="tabs">
                    <li className="tab-link current" data-tab="userdetails">Basic Information</li>
					<li className="tab-link" data-tab="officeaddress">Office Address</li>
					<li className="tab-link" data-tab="Edu-detail">Bank Details</li>
                    <li className="tab-link" data-tab="vault" onClick = {vault}>Borrower Request </li>
				</ul>
                <div id="userdetails" className="tab-content current">
					<div className="bio-box">
						<div className="heading">
							<p>Surname</p>
						</div>
						<div className="desc">
							{userdetails.surname}
						</div>
					</div>
					<div className="bio-box">
						<div className="heading">
							<p>Firstname</p>
						</div>
						<div className="desc">
							{userdetails.firstname}
						</div>
					</div>
					<div className="bio-box">
						<div className="heading">
							<p>Middlename</p>
						</div>
						<div className="desc">
							{userdetails.middlename}
						</div>
					</div>
					<div className="bio-box">
						<div className="heading">
							<p>Email</p>
						</div>
						<div className="desc">
							{userdetails.email}
						</div>
					</div>
                    <div className="bio-box">
						<div className="heading">
							<p>Gender</p>
						</div>
						<div className="desc">
							{userdetails.gender}
						</div>
					</div>
                    <div className="bio-box">
						<div className="heading">
							<p>Mobile Number 1</p>
						</div>
						<div className="desc">
							{userdetails.mobile1}
						</div>
					</div>
                    <div className="bio-box">
						<div className="heading">
							<p>Mobile Number 2</p>
						</div>
						<div className="desc">
							{userdetails.mobile2}
						</div>
					</div>
					
				</div>
				
				<div id="officeaddress" className="tab-content">
				
                    <div className="bio-box">
						<div className="heading">
							<p>Employment Status</p>
						</div>
						<div className="desc">
							{userofficeaddress.employmentstatus}
						</div>
					</div>
					<div className="bio-box">
						<div className="heading">
							<p>Company Name</p>
						</div>
						<div className="desc">
							{userofficeaddress.company_name}
						</div>
					</div>
					<div className="bio-box">
						<div className="heading">
							<p>Contact Number</p>
						</div>
						<div className="desc">
							{userofficeaddress.contact_number}
						</div>
					</div>
					<div className="bio-box">
						<div className="heading">
							<p>Office Contact Website</p>
						</div>
						<div className="desc">
							{userofficeaddress.contact_website}
						</div>
					</div>
					
				</div>
				
				<div id="Edu-detail" className="tab-content">
                    <div className="bio-box">
						<div className="heading">
							<p>BVN</p>
						</div>
						<div className="desc">
							{bankdetail.bvn}
						</div>
					</div>
                    <div className="bio-box">
						<div className="heading">
							<p>Bank Name</p>
						</div>
						<div className="desc">
							{bankdetail.bankname}
						</div>
					</div>
					<div className="bio-box">
						<div className="heading">
							<p>Account Number</p>
						</div>
						<div className="desc">
							{bankdetail.accountnumber}
						</div>
					</div>
               
                </div>

                <div id="vault" className="tab-content">
                    <div className="bio-box">
						<div className="heading">
							<p>Request Amount (NGN)</p>
						</div>
						<div className="desc">
                           {props.request.requestAmount.toLocaleString()}
						</div>
					</div>
                  
					<div className="bio-box">
						<div className="heading">
							<p>Minimum Interest</p>
						</div>
						<div className="desc">
                           {props.request.minInterestRate}%
						</div>
					</div>
                    <div className="bio-box">
						<div className="heading">
							<p>Maximum Interest</p>
						</div>
						<div className="desc">
                           {props.request.minInterestRate}%
						</div>
					</div>
                    <div className="bio-box">
						<div className="heading">
							<p>Repayment Plan</p>
						</div>
						<div className="desc">
                          {props.request.repaymentplan}
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

export default MarketPlacedetailsForBorrower;
