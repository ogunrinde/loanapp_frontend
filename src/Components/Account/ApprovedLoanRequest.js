import React, {useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import $ from 'jquery';
import '../../css/account/custom.css';
import { GetProfile, UpdateLoanRequestStatus, UpdateSuredeal } from '../redux/action/index';
import Loader from 'react-loader-spinner';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import { useForm } from 'react-hook-form';
import '../../css/css/profile.css';

const ApprovedLoanRequest = (props) => {

	const [IsFetchingUserInformation, setIsFetchingUserInformation] = useState(false);
	const [ IsDisbursing, setIsDisbursing ] = useState(false);
	const { handleSubmit, register, errors } = useForm();
	const dispatch = useDispatch();
	const userprofile = useSelector(state => state.root.viewuserprofile);
	const [IsSubmitting, setIsSubmitting] = useState(false);
	const request = props.request;
	const type = props.type;

	const onSubmit = async data => {
		//alert(JSON.stringify(data));
		setIsDisbursing(true);
		await dispatch(UpdateSuredeal(data));
		setIsDisbursing(false);
	}
    useEffect(() =>{
		getUserInformation();
		//alert(JSON.stringify(request));
    },[]);
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
		//alert(type);
		setIsFetchingUserInformation(true);
		if(type == 'borrower')
		await dispatch(GetProfile(props.request.lender_id));
		if(type == 'lender')
		await dispatch(GetProfile(props.request.borrower_id));
		//alert(JSON.stringify(request));
		setIsFetchingUserInformation(false);
		
	}

	const updatestatus = async (status,connectId) => {
		setIsSubmitting(true);
		await dispatch(UpdateLoanRequestStatus(status,connectId,props.request.borrower_id,request.request.id));
		setIsSubmitting(false);
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
					<h2>{userprofile.userdetails.surname} {userprofile.userdetails.firstname}</h2>
					<p style={{marginBottom:7}}>{userprofile.homeaddress.address}</p>
					{/* <span className="post-label">Admin</span>
					<span className="post-label">Speaker</span>
					<span className="post-label">AMA</span>
					<p>Founder and CEO at <strong>NewSpot</strong><br/>
					<i className="fa fa-map-marker" aria-hidden="true"></i>  Boston, MA, United States
					</p> */}
					{/* {
						type == 'lender' && 
						<p>
							<button hidden={IsSubmitting} onClick = {() => updatestatus('approved', request.id)} style={{padding:5,color:'#fff',background:'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)',borderRadius:3}}>Approved Request</button>
							<button hidden={IsSubmitting} onClick = {() => updatestatus('decline', request.id)} style={{padding:5,color:'#fff',marginLeft:7,background:'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)',borderRadius:3}}>Decline</button>
							<Loader
								visible={IsSubmitting}
								type="Puff"
								color="#ffbb38"
								height={30}
								width={30}
								timeout= {0} //3 secs
						
							/>
					    </p>
					} */}
					

				</div>
				{/* <div className="social-icons">
					<i className="fa fa-facebook"></i>
					<i className="fa fa-twitter"></i>
					<i className="fa fa-linkedin"></i>
					<i className="fa fa-google"></i>
					<i className="fa fa-instagram"></i>
				</div> */}
			</div>
			<div className="tab-panel-main">
				<ul className="tabs">
					<li className="tab-link current" data-tab="officeaddress">Office Address</li>
					<li className="tab-link" data-tab="Edu-detail">Bank Details</li>
					<li className="tab-link" data-tab="request">Request</li>
					<li hidden = {type == 'borrower' ? true : false} className="tab-link" data-tab="disbursed">Disbursed</li>
				</ul>
				<div id="officeaddress" className="tab-content current">
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
							<p>Address</p>
						</div>
						<div className="desc">
							{userprofile.officeaddress.address}
						</div>
					</div>
					<div className="bio-box">
						<div className="heading">
							<p>Office Contact</p>
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
				<div id="request" className="tab-content">
				
					<div className="bio-box">
						<div className="heading">
							<p>Loan Period</p>
						</div>
						<div className="desc">
							{request.request.loanperiod}
						</div>
					</div>
					<div className="bio-box">
						<div className="heading">
							<p>Loan Amount (NGN)</p>
						</div>
						<div className="desc">
							{request.request.requestAmount}
						</div>
					</div>
					<div className="bio-box">
						<div className="heading">
							<p>Max Interest On Loan</p>
						</div>
						<div className="desc">
							{request.request.maxInterestRate}%
						</div>
					</div>
					<div className="bio-box">
						<div className="heading">
							<p>Min Interest on Loan</p>
						</div>
						<div className="desc">
							{request.request.minInterestRate}%
						</div>
					</div>
					<div className="bio-box">
						<div className="heading">
							<p>Replayment Plan</p>
						</div>
						<div className="desc">
							{request.request.repaymentplan}
						</div>
					</div>
					
				</div>
                <div id="disbursed" className="tab-content current">
					<div className="skill-box">
					  <ul>
						<li><strong>Loan ID</strong></li>
						<li>{request.loanID}</li>
					  </ul>		
					</div>
					<div className="bio-box">
						<div className="heading">
							<p>Date Disbursed</p>
						</div>
						<div className="desc">
							{request.date_disbursed}
						</div>
					</div>
					<div className="bio-box">
						<div className="heading">
							<p>Mode of Disbursement</p>
						</div>
						<div className="desc">
							{request.mode_of_disbursement}
						</div>
					</div>
					<div className="bio-box">
						<div className="heading">
							<p>Amount Disbursed</p>
						</div>
						<div className="desc">
							{request.Amount_disbursed}
						</div>
					</div>
					<div className="bio-box">
						<div className="heading">
							<p>Borrower Confirm Payment</p>
						</div>
						<div className="desc">
							{request.Borrower_confirmed_payment}
						</div>
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

export default ApprovedLoanRequest;
