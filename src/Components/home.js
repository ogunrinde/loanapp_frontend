import React, { useEffect } from 'react';
import Header from './Header';
import '../css/css/analytics.css'
import Footer from './Footer';
import Analytics from './analytics';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faTrash, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import SureRequest from './sureRequest';
import Loader from 'react-loader-spinner';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import {useSelector, useDispatch } from 'react-redux';
import PendingLoanApprovals from './Account/pending_loan_approvals';
import PendingLoanToBeDisbursed from './Account/loan_to_be_disbursed';
import DisbursedLoans from './Account/Loan_disbursed';
import VaultHistory from './Account/VaultHistory';
import ApprovedLoans from './Account/approvedloans';
import Loantodisbursed from './Account/loan_to_be_disbursed';
import Loandisbursed from './Account/Loan_disbursed';
import BorrowerApprovedRequest from './Account/borrowerapprovedloans';
import BorrowerPendingRequest from './Account/borrowerpendingloans';
import Vault from './Account/vault';
import MyProfile from './Account/myprofile';
import AllLoanRequest from './Account/allloanrequest';
import {withRouter} from 'react-router-dom';
import Verification from './Account/Verification';
import OpenRepaymentforLender from './Account/openrepayment';
import ClosedRepaymentforLender from './Account/closedrepayment';


import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useParams,
	useRouteMatch
  } from "react-router-dom";


function ProcessRequest()
{
	let { routerequest } = useParams();
	if(routerequest == 'approvedloans') return (<ApprovedLoans />);
	else if(routerequest == 'loantobedisbursed') return (<Loantodisbursed />);
	else if(routerequest == 'loan_disbursed') return (<Loandisbursed />);
	else if(routerequest == 'pendingapprovals') return (<PendingLoanApprovals />);
	else if(routerequest == 'borrowerapprovedrequest') return (<BorrowerApprovedRequest />);
	else if(routerequest == 'borrowerpendingrequest') return (<BorrowerPendingRequest />);
	else if(routerequest == 'vault') return (<Vault />);
	else if(routerequest == 'myprofile') return (<MyProfile />);
	else if(routerequest == 'myloanrequest') return (<AllLoanRequest />);
	else if(routerequest == 'verify') return (<Verification />);
	else if(routerequest == 'open_repayment_lender') return (<OpenRepaymentforLender />);
	else if(routerequest == 'closed_repayment_lender') return (<ClosedRepaymentforLender />);
	// else if(routerequest == 'overdues_lender') return (<OverduesforLender />);
	// else if(routerequest == 'open_repayment_borrower') return (<OpenRepaymentforBorrower />);
	// else if(routerequest == 'closed_repayment_borrower') return (<ClosedRepaymentforBorrower />);
	// else if(routerequest == 'overdues_borrower') return (<OverduesforBorrower />);
	
}  

const Home = (props) => 
{
	let { path, url } = useRouteMatch();
	const dispatch = useDispatch();
	const IsFetching = useSelector(state => state.root.IsFetching);

	
    return(
		<Router>
        <div>
		<div className="container">
		    <Analytics />
		</div>
		<div hidden ={true} style={{position:'fixed',right:0,top:0,width:'50%',height:'100%',overflowY:'scroll',zIndex:4000343005,backgroundColor:'#f1f7f9',padding:10}}>
				<div>
					<a className="pull-right">
					<FontAwesomeIcon icon={faTimesCircle} style={{color:'red',fontSize:25}} />
					</a>
				</div>
				<div className="">
					<div id="user">
						<SureRequest level = {true} />
					</div>
				</div>
		</div>       
        <div className="container" style={{marginBottom:30}}>
		<div className="row" style={{marginBottom:25}}>
			<div className="col-xl-12">
			<div className="filter-bar d-flex flex-wrap">
					<div className="sorting">
						<select className="form-control">
							<option value="1">Default sorting</option>
							<option value="1">Default sorting</option>
							<option value="1">Default sorting</option>
						</select>
					</div>
					<div className="sorting mr-auto">
						<select className="form-control">
							<option value="1">Show 12</option>
							<option value="1">Show 12</option>
							<option value="1">Show 12</option>
						</select>
					</div>
					
				</div>
			</div>
		</div>
		<div>
		<div className="row">
			<div className="col-xl-3 col-lg-4 col-md-5">
				<div className="sidebar-categories">
					<div className="head">Browse Categories</div>
					<ul className="main-categories">
						<li className="main-nav-list"><a data-toggle="collapse" href="#fruitsVegetable" aria-expanded="false" aria-controls="fruitsVegetable"><span
								 className="lnr lnr-arrow-right"></span>Home<span className="number">(53)</span></a>
							
						</li>

						<li className="main-nav-list"><a data-toggle="collapse" href="#loan" aria-expanded="false" aria-controls="loan"><span
								 className="lnr lnr-arrow-right"></span>My Vault Loan</a>
							<ul className="collapse" id="loan" data-toggle="collapse" aria-expanded="false" aria-controls="loan">
								<li className="main-nav-list child"><Link to={`${url}/pendingapprovals`}>Loan Approval</Link></li>
								<li className="main-nav-list child"><Link to={`${url}/approvedloans`}>Approved Loans</Link></li>
								<li className="main-nav-list child"><Link to={`${url}/loantobedisbursed`}>To be Disbursed<span className="number">(09)</span></Link></li>
								<li className="main-nav-list child"><Link to={`${url}/loan_disbursed`}>Loan Disbursed<span className="number">(17)</span></Link></li>
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
								 className="lnr lnr-arrow-right"></span>Vault</a>
							<ul className="collapse" id="vault" data-toggle="collapse" aria-expanded="false" aria-controls="vault">
								<li className="main-nav-list child"><Link to={`${url}/vault`} href="#">My Vault</Link></li>
							</ul>
						</li>

						<li className="main-nav-list"><a data-toggle="collapse" href="#repayment_borrower" aria-expanded="false" aria-controls="repayment_borrower"><span
								 className="lnr lnr-arrow-right"></span>My Repayment</a>
							<ul className="collapse" id="repayment_borrower" data-toggle="collapse" aria-expanded="false" aria-controls="repayment_borrower">
								<li className="main-nav-list child"><Link to={`${url}/open_repayment_borrower`} href="#">Open</Link></li>
								<li className="main-nav-list child"><Link to={`${url}/closed_repayment_borrower`} href="#">Closed</Link></li>
								<li className="main-nav-list child"><Link to={`${url}/overdues_borrower`} href="#">Overdues</Link></li>
							</ul>
						</li>

						<li className="main-nav-list"><a data-toggle="collapse" href="#repayment_lender" aria-expanded="false" aria-controls="repayment_lender"><span
								 className="lnr lnr-arrow-right"></span>Borrower Repayment</a>
							<ul className="collapse" id="repayment_lender" data-toggle="collapse" aria-expanded="false" aria-controls="repayment_lender">
								<li className="main-nav-list child"><Link to={`${url}/open_repayment_lender`} href="#">Open</Link></li>
								<li className="main-nav-list child"><Link to={`${url}/closed_repayment_lender`} href="#">Closed</Link></li>
								<li className="main-nav-list child"><Link to={`${url}/overdues_lender`} href="#">Overdues</Link></li>
							</ul>
						</li>

						<li className="main-nav-list"><a data-toggle="collapse" href="#profile" aria-expanded="false" aria-controls="profile"><span
								 className="lnr lnr-arrow-right"></span>Profile</a>
							<ul className="collapse" id="profile" data-toggle="collapse" aria-expanded="false" aria-controls="profile">
								<li className="main-nav-list child"><Link to={`${url}/myprofile`} href="#">My Profile</Link></li>
								<li className="main-nav-list child"><Link to={`${url}/verify`} href="#">Verification</Link></li>
							</ul>
						</li>


						
					</ul>
				</div>
			
			</div>
			<div className="col-xl-9 col-lg-8 col-md-7">
			<Switch>
  				<Route exact path={path}>
				    <PendingLoanApprovals />
				</Route>
				<Route path={`${path}/:routerequest`}>
					<ProcessRequest />
				</Route>
			</Switch>
		    </div>
		</div>
		</div>
	    </div>
        <Footer />
           
        </div>
		</Router>
        
    );
}

export default withRouter(Home);