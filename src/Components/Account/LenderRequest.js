import React, {useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import $ from 'jquery';
import '../../css/account/custom.css';
import { GetProfile, UpdateOfferRequestStatus, UpdateSuredeal } from '../redux/action/index';
import Loader from 'react-loader-spinner';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import { useForm } from 'react-hook-form';
import '../../css/css/profile.css';

const LenderRequest = (props) => {

	const [IsFetchingUserInformation, setIsFetchingUserInformation] = useState(false);
	const [ IsDisbursing, setIsDisbursing ] = useState(false);
	const { handleSubmit, register, errors } = useForm();
	const dispatch = useDispatch();
	const userprofile = useSelector(state => state.root.viewuserprofile);
    const [IsSubmitting, setIsSubmitting] = useState(false);
    const month = useSelector(state => state.root.month);
	const request = props.request;
	const type = props.type;

    useEffect(() =>{
		getUserInformation();
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
        //alert(JSON.stringify(props.request));
		setIsFetchingUserInformation(true);
		await dispatch(GetProfile(props.request.lender_id));
		setIsFetchingUserInformation(false);
		
    }
    
    const FormatDate = (date) => {
        let d = date.split('-');
        let day = d[2];
        let mth = month[parseInt(d[1])-1];
        let year = d[0];
        return `${day} ${mth}, ${year}`;
    }

	const updatestatus = async (status,connectId) => {
		setIsSubmitting(true);
		await dispatch(UpdateOfferRequestStatus(status,connectId,props.request.lender_id,request.request.id));
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
					{
						type == 'borrower' && 
						<p>
							<button hidden={IsSubmitting} onClick = {() => updatestatus('approved', request.id)} style={{padding:5,color:'#fff',background:'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)',borderRadius:3}}>Approve Request</button>
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
					}
					

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
                    <li className="tab-link" data-tab="svault">Lender Vault</li>
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
				<div id="svault" className="tab-content">
				
					<div className="bio-box">
						<div className="heading">
							<p>Max Request Amount (NGN)</p>
						</div>
						<div className="desc">
							{request.surevault.maxRequestAmount}
						</div>
					</div>
					<div className="bio-box">
						<div className="heading">
							<p>Available From</p>
						</div>
						<div className="desc">
							{FormatDate(request.surevault.availablefrom)}
						</div>
					</div>
					<div className="bio-box">
						<div className="heading">
							<p>Available To</p>
						</div>
						<div className="desc">
							{FormatDate(request.surevault.availableto)}
						</div>
					</div>
					<div className="bio-box">
						<div className="heading">
							<p>Min Interest on Loan</p>
						</div>
						<div className="desc">
							{request.surevault.minInterestperMonth}%
						</div>
					</div>
					<div className="bio-box">
						<div className="heading">
							<p>Max Interest on Loan</p>
						</div>
						<div className="desc">
							{request.surevault.maxInterestperMonth}%
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

export default LenderRequest;
