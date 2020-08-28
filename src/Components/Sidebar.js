import React, {useEffect,useState } from 'react';
import Header from './Header';
import '../css/css/analytics.css'
import Footer from './Footer';
import Analytics from './analytics';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faTrash, faTimesCircle, faBars } from '@fortawesome/free-solid-svg-icons';
import SureRequest from './sureRequest';
import Loader from 'react-loader-spinner';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useParams,
	useRouteMatch
  } from "react-router-dom";

const SidebarContainer = () => {


    const [sidebarOpen, setsidebarOpen] = useState(false);
	let { path, url } = useRouteMatch();

	const setdata = () => {
	}
    return (
        <div className="sidebar-categories">
					<div className="head">Browse Activities</div>
					<ul className="main-categories">
						

						<li className="main-nav-list"><a data-toggle="collapse" href="#loan" aria-expanded="false" aria-controls="loan"><span
								 className="lnr lnr-arrow-right"></span>My Sure Offers</a>
							<ul className="collapse" id="loan" data-toggle="collapse" aria-expanded="false" aria-controls="loan">
								<li className="main-nav-list child"><Link to={`${url}/pendingapprovals`}>Pending Loans</Link></li>
								<li className="main-nav-list child"><Link to={`${url}/approvedloans`}>Approved Loans</Link></li>
								<li className="main-nav-list child"><Link to={`${url}/loantobedisbursed`}>To be Disbursed<span className="number"></span></Link></li>
								<li className="main-nav-list child"><Link to={`${url}/loan_disbursed`}>Loan Disbursed<span className="number"></span></Link></li>
							</ul>
						</li>

						<li className="main-nav-list"><a data-toggle="collapse" href="#loan_request" aria-expanded="false" aria-controls="loan_request"><span
								 className="lnr lnr-arrow-right"></span>My Loan Request</a>
							<ul className="collapse" id="loan_request" data-toggle="collapse" aria-expanded="false" aria-controls="loan_request">
								<li className="main-nav-list child"><Link to={`${url}/borrowerapprovedrequest`}>Approved Request</Link></li>
								<li className="main-nav-list child"><Link to={`${url}/borrowerpendingrequest`}>Pending Request</Link></li>
								<li className="main-nav-list child"><Link to={`${url}/myloanrequest`}>My Request</Link></li>
							</ul>
						</li>

						<li className="main-nav-list"><a data-toggle="collapse" href="#vault" aria-expanded="false" aria-controls="vault"><span
								 className="lnr lnr-arrow-right"></span>Sure Vault</a>
							<ul className="collapse" id="vault" data-toggle="collapse" aria-expanded="false" aria-controls="vault">
								<li className="main-nav-list child"><Link to={`${url}/vault`}>My Vault</Link></li>
							</ul>
						</li>

						<li className="main-nav-list"><a data-toggle="collapse" href="#repayment_borrower" aria-expanded="false" aria-controls="repayment_borrower"><span
								 className="lnr lnr-arrow-right"></span>My Repayment</a>
							<ul className="collapse" id="repayment_borrower" data-toggle="collapse" aria-expanded="false" aria-controls="repayment_borrower">
							    <li className="main-nav-list child"><Link to={`${url}/paymentschedules`}>Payment Schedule</Link></li>
								<li className="main-nav-list child"><Link to={`${url}/repayment_borrower`}>Repayment</Link></li>
								{/* <li className="main-nav-list child"><Link to={`${url}/overdues_borrower`}>Overdues</Link></li> */}
							</ul>
						</li>

						<li className="main-nav-list"><a data-toggle="collapse" href="#repayment_lender" aria-expanded="false" aria-controls="repayment_lender"><span
								 className="lnr lnr-arrow-right"></span>Borrower Repayment</a>
							<ul className="collapse" id="repayment_lender" data-toggle="collapse" aria-expanded="false" aria-controls="repayment_lender">
								<li className="main-nav-list child"><Link to={`${url}/paymentschedules_lender`}>Payment Schedule</Link></li>
								<li className="main-nav-list child"><Link to={`${url}/open_repayment_lender`}>Repayment</Link></li>
								{/* <li className="main-nav-list child"><Link to={`${url}/overdues_lender`}>Overdues</Link></li> */}
							</ul>
						</li>

						<li className="main-nav-list"><a data-toggle="collapse" href="#profile" aria-expanded="false" aria-controls="profile"><span
								 className="lnr lnr-arrow-right"></span>Profile</a>
							<ul className="collapse" id="profile" data-toggle="collapse" aria-expanded="false" aria-controls="profile">
							    <li className="main-nav-list child"><Link to={`${url}/profile`} href="#">Complete your Profile</Link></li>
								<li className="main-nav-list child"><Link to={`${url}/myprofile`} href="#">My Profile</Link></li>
								<li className="main-nav-list child"><Link to={`${url}/verify`} href="#">Verification</Link></li>
							</ul>
						</li>


						
					</ul>
				
				</div>	
   
   );
}

export default SidebarContainer;