import React, { useEffect, useState } from 'react';
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
import { store } from 'react-notifications-component';
import {useSelector, useDispatch } from 'react-redux';
import PendingLoanApprovals from './Account/pending_loan_approvals';
import {withRouter} from 'react-router-dom';
import Scroll from '../Components/scroll';
import '../css/css/profile.css';
//import SidebarContainer from "./Sidebar";

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useParams,
	useRouteMatch
  } from "react-router-dom";
import BasicInfo from './basicInfo';
import HomeAddress from './HomeAddress';
import OfficeInfo from './officeInfo';
import SocialMedia from './socialMedia';
import BankDetails from './bankdetails';
import Verification from './Verification';


function ProcessRequest()
{
	let { routerequest } = useParams();
	const route = useSelector(state => state.root.route);
	if(routerequest == 'basicinformation') return (<BasicInfo />);
	else if(routerequest == 'homeaddress') return (<HomeAddress />);
	else if(routerequest == 'officeaddress') return (<OfficeInfo />);
    else if(routerequest == 'socialmedia') return (<SocialMedia />);
	else if(routerequest == 'bankinformation') return (<BankDetails />);
	else if(routerequest == 'verification') return (<Verification />);
	else if(routerequest == 'myaccount')
	{
		if(route != '') 
		{
			Error('Access Denied', 'Kindly Complete your Profile');
			window.location.href = `${route}`;
		}else {
			window.location.href = '/home';
		}
	}
	
}  


const UserProfile = (props) => 
{
	let { path, url } = useRouteMatch();
	const dispatch = useDispatch();
	const IsFetching = useSelector(state => state.root.IsFetching);
	const userdetails = useSelector(state => state.root.userbasicdetails);
    const userhomeaddress = useSelector(state => state.root.userHomeAddress);
    const userofficeaddress = useSelector(state => state.root.userOfficeAddress);
    const usersocialmedia = useSelector(state => state.root.userSocialMediaAccounts);
    const bankdetail = useSelector(state => state.root.userBankInformation);
	const [sidebarOpen, setsidebarOpen] = useState(false);
	

	const setdata = () => {
		setsidebarOpen(true);
	}
	
    return(
		<Router>
        <div>	
		<Scroll />			
		<div className="container analytic_container">
		
		    {/* <Analytics /> */}
		</div>
		
        <div className="container contain">
		<div style={{marginTop:30}}>
		<div className="row">
			<div className="col-xl-3 col-lg-4 col-md-5 others">
				<div className="sidebar-categories">
					<div className="head">Browse Activities</div>
					<ul className="main-categories">
						
					   <li className="main-nav-list"><a data-toggle="collapse" href="#account" aria-expanded="false" aria-controls="account"><span
								 className="lnr lnr-arrow-right"></span>My Account</a>
							<ul className="collapse" id="account" data-toggle="collapse" aria-expanded="false" aria-controls="account">
								<li className="main-nav-list child"><Link to={`${url}/myaccount`}>Account</Link></li>
							</ul>
						</li>
                        <li className="main-nav-list"><a data-toggle="collapse" href="#basic" aria-expanded="false" aria-controls="basic"><span
								 className="lnr lnr-arrow-right"></span>Basic Information</a>
							<ul className="collapse" id="basic" data-toggle="collapse" aria-expanded="false" aria-controls="basic">
								<li className="main-nav-list child"><Link to={`${url}`}>Basic Information</Link></li>
							</ul>
						</li>
                        <li className="main-nav-list"><a data-toggle="collapse" href="#home" aria-expanded="false" aria-controls="home"><span
								 className="lnr lnr-arrow-right"></span>Home Address</a>
							<ul className="collapse" id="home" data-toggle="collapse" aria-expanded="false" aria-controls="home">
								<li className="main-nav-list child"><Link to={`${url}/homeaddress`}>Home Address</Link></li>
							</ul>
						</li>
                        <li className="main-nav-list"><a data-toggle="collapse" href="#office" aria-expanded="false" aria-controls="office"><span
								 className="lnr lnr-arrow-right"></span>Office Address</a>
							<ul className="collapse" id="office" data-toggle="collapse" aria-expanded="false" aria-controls="office">
								<li className="main-nav-list child"><Link to={`${url}/officeaddress`}>Office Address</Link></li>
							</ul>
						</li>
                        <li className="main-nav-list"><a data-toggle="collapse" href="#social" aria-expanded="false" aria-controls="social"><span
								 className="lnr lnr-arrow-right"></span>Social Media</a>
							<ul className="collapse" id="social" data-toggle="collapse" aria-expanded="false" aria-controls="social">
								<li className="main-nav-list child"><Link to={`${url}/socialmedia`}>Social Media</Link></li>
							</ul>
						</li>
                        <li className="main-nav-list"><a data-toggle="collapse" href="#bank" aria-expanded="false" aria-controls="bank"><span
								 className="lnr lnr-arrow-right"></span>Bank Information</a>
							<ul className="collapse" id="bank" data-toggle="collapse" aria-expanded="false" aria-controls="bank">
								<li className="main-nav-list child"><Link to={`${url}/bankinformation`}>Bank Information</Link></li>
							</ul>
						</li>
						<li className="main-nav-list"><a data-toggle="collapse" href="#verify" aria-expanded="false" aria-controls="verify"><span
								 className="lnr lnr-arrow-right"></span>User Details Verification</a>
							<ul className="collapse" id="verify" data-toggle="collapse" aria-expanded="false" aria-controls="verify">
								<li className="main-nav-list child"><Link to={`${url}/verification`}>Verification</Link></li>
							</ul>
						</li>
                        

						
					</ul>
				
				</div>
			
			</div>
			<div className="col-xl-9 col-sm-12 col-lg-12 col-md-12">
			
			<Switch>
  				<Route exact path={path}>
				    <BasicInfo />
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

export default withRouter(UserProfile);