import React,{useEffect, useState} from 'react';
import { GetCompleteUserProfile,logout, requeststatus } from './redux/action/index';

import {
    Link

  } from "react-router-dom";
  import '../css/css/header.css';
  import '../css/css/profile.css';
  import { withRouter} from 'react-router-dom';
import Notify from './notify';
import { useDispatch, useSelector } from 'react-redux';
import SlidingPanel from 'react-sliding-side-panel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faTrash, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import Loader from 'react-loader-spinner';
import {SendCode, VerifyPhone, GetEmailLink} from './redux/action/index';
import { GetpendingApprovals } from './redux/action/loan';






const Header = (props) => {
    const dispatch = useDispatch();
    const [openPanel, setOpenPanel] = useState(false);
    const userdetails = useSelector(state => state.root.userbasicdetails);
    const userhomeaddress = useSelector(state => state.root.userHomeAddress);
    const userofficeaddress = useSelector(state => state.root.userOfficeAddress);
    const usersocialmedia = useSelector(state => state.root.userSocialMediaAccounts);
    const bankdetail = useSelector(state => state.root.userBankInformation);
    const IsLoggedIn = useSelector(state => state.root.IsLoggedIn);
    const user = useSelector(state => state.root.user);
    const IsFetching = useSelector(state =>state.root.IsFetching);
    const [verify_phone, setverify_phone] = useState(false);
    const [isSubmitting, setisSubmitting] = useState(false);
    const { handleSubmit, register, errors } = useForm();
    const LenderpendingApprovals = useSelector(state => state.root.lenderpendingApprovals);
    const loantobedisbursed = useSelector(state => state.root.loantobedisbursed);
    const [isRequestSeen, setisRequestSeen] = useState(false);
    const [isloantobedisbursed, setisloantobedisbursed] = useState(false);
    const route = useSelector(state => state.root.route);
    //const user = useSelector(state => state.root.user);


    useEffect(() =>{
        //alert(IsLoggedIn);
        if(IsFetching == true) dispatch(requeststatus());
        if(IsLoggedIn == true){
            process();
        } 

    },[bankdetail]);

    const showpending = () => {
        setisRequestSeen(true);
        props.history.push('/home/pendingapprovals');
    }

    const showtobedisbursed = () => {
        setisloantobedisbursed(true);
        props.history.push('/home/loantobedisbursed');
    }

    const log = () => {
        dispatch(logout());
        props.history.push('/');
    }

    const process = async () => {
        //await dispatch(GetCompleteUserProfile());
        //await dispatch(GetpendingApprovals());
    }

    const SendAgain = async () => {
        setisSubmitting(true);
        await dispatch(SendCode());
        setisSubmitting(false);
    }

    const onSubmit = async (data) =>
    {
        //alert(JSON.stringify(data.code));
        setisSubmitting(true);
        await dispatch(VerifyPhone(data.code));
        //dispatch(GetCompleteUserProfile());
        setisSubmitting(false);
        setverify_phone(false);
    }

    const PhoneVerify = () => {
        SendAgain();
        setverify_phone(true);

    }

    const SendEmailLink = async () => {
        setisSubmitting(true);
        await dispatch(GetEmailLink(userdetails.email));
        setisSubmitting(false);
    }
    
    return (
        <header className="header-area">
        <div className="top-header-area">
            <div className="container h-100">
                <div className="row h-100 align-items-center">
                    <div className="col-12 d-flex justify-content-between">
                        <div className="logo">
                            <Link to ="/"><img src="../../img/core-img/logo.png" alt=""/></Link>
                        </div>
                        {
                            IsLoggedIn == false && 
                            <div className="top-contact-info d-flex align-items-center">
                                <Link to="/register" data-toggle="tooltip" data-placement="bottom" title="New! Create account"><img src="img/core-img/placeholder.png" alt=""/> <span>Create Account</span></Link>
                                <Link to ="/login" data-toggle="tooltip" data-placement="bottom" title="Login to Participate"><img src="../../img/core-img/message.png" alt=""/> <span>Login</span></Link>
                            </div>
                        }

                        {
                            IsLoggedIn == true && 
                            <div className="top-contact-info d-flex align-items-center">
                                <Link to="/home" data-toggle="tooltip" data-placement="bottom" title="Hi User"><img src="img/core-img/placeholder.png" alt=""/> <span style={{textTransform:'capitalize'}}>Hi, {user != null && user.name}</span></Link>
                                <Link onClick = {log} data-toggle="tooltip" data-placement="bottom" title="log out account"><img src="../../img/core-img/message.png" alt=""/> <span>Logout</span></Link>
                            </div>
                        }
                        
                    </div>
                </div>
            </div>
        </div>

        {
            LenderpendingApprovals != null && LenderpendingApprovals.length > 0 && isRequestSeen == false &&
            <section className="footer-area section-padding-10-0">
                <div className="">
                    <div>
                        <div style={{padding:20,color:'#fff',textAlign:'center'}}>
                            You have {LenderpendingApprovals.length} pending Loan request
                            <button onClick={showpending} style={{backgroundColor:"#ffbb38",marginLeft:7,color:'#fff',padding:5,borderRadius:5}}>View Details</button>
                        </div>
                    </div>
                </div>
    
            </section>
        }

        {
            loantobedisbursed != null && loantobedisbursed.length > 0 && isloantobedisbursed == false &&
            <section className="footer-area section-padding-10-0">
                <div className="">
                    <div>
                        <div style={{padding:20,color:'#fff',textAlign:'center'}}>
                            You have {loantobedisbursed.length} undisbursed Loan(s)
                            <button onClick={showtobedisbursed} style={{backgroundColor:"#ffbb38",marginLeft:7,color:'#fff',padding:5,borderRadius:5}}>View Details</button>
                        </div>
                    </div>
                </div>
    
            </section>
        }


        {
            route != '' && route != '/userprofile/verification' && <Notify />
        }

        {
            route != '' && route == '/userprofile/verification' &&
            <section className="footer-area section-padding-10-0">
                <div className="">
                    <div>
                        <div style={{padding:20,color:'#fff',textAlign:'center'}}>
                            Verify your Account 
                            <Link to={route} style={{backgroundColor:"#ffbb38",marginLeft:7,color:'#fff',padding:5,borderRadius:5}}>Verify Now</Link>
                        </div>
                    </div>
                </div>
    
            </section>
        }


        {
             userdetails != null && userhomeaddress != null && userofficeaddress != null && usersocialmedia != null &&
             bankdetail != null && Object.keys(userdetails).length > 0 && userdetails.Is_email_verified == 0 &&
             userdetails.Is_phone_number_verified == 1 &&
            <section className="footer-area section-padding-10-0">
                <div className="">
                    <div>
                        <div style={{padding:20,color:'#fff',textAlign:'center'}}>
                            A Link was sent to your to email account...Verify your account via to the link
                            <button hidden={isSubmitting} onClick={SendEmailLink} style={{backgroundColor:"#ffbb38",marginLeft:7,color:'#fff',padding:5,borderRadius:5}}>Send Link Again</button>
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
    
            </section>
        }

        {
            verify_phone == true && 
            <div className="sideview2" style={{padding:20,backgroundColor:'#f2f4f6'}}>
                <div>
                    <a className="pull-right">
                    <FontAwesomeIcon icon={faTimesCircle} onClick={() => setverify_phone(false)} style={{color:'red',fontSize:25}} />
                    </a>
                </div>
                <div className="" style={{width:'100%'}}>
                    <div id="" style={{textAlign:'center'}}>
                       <h3>Verify your Phone Number</h3>
                       <form onSubmit={handleSubmit(onSubmit)}>
                        
                        <div className="row" style={{marginTop:15}}>
                            <div style={{width:'80%', marginLeft:'10%',marginTop:30}}>                           
                            <div className="col-lg-12 col-sm-12 col-md-12 col-lg-offset-2">   
                            <fieldset>
                            <input
                                placeholder="Enter Code from Surebanker"
                                type="text"
                                className="form-control"
                                name="code"
                                tabindex="1" 
                                autofocus
                                ref={register({
                                    required: "Required",
                                    minLength:3
                                })}
                                />
                                <small className="text-danger">{errors.mobile?.type == "required" && "Mobile is required"}</small>
                                <small onClick ={SendAgain} className="text-danger">Enter the Code sent to your Phone Number</small>
                            </fieldset>
                            </div>
                            <div className="row">
                            <div className="col-lg-12 col-sm-12 col-md-12 col-lg-offset-2">
                            <button hidden={isSubmitting} style={{backgroundColor:"#ffbb38",marginLeft:7,color:'#fff',padding:5,borderRadius:5,width:200}} name="submit"  type="submit" id="" data-submit="...Sending">Verify</button>
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
               
            </form>
    
                    </div>
                </div>
            </div>
        }
        

        <div class="others">
        <div className="credit-main-menu" id="sticker">
            <div className="classy-nav-container breakpoint-off">
                <div className="container">
                  
                    <nav className="classy-navbar justify-content-between" id="creditNav">

                      
                        <div className="classy-navbar-toggler">
                            <span className="navbarToggler"><span></span><span></span><span></span></span>
                        </div>

                     
                        <div className="classy-menu">

                           
                            <div className="classycloseIcon">
                                <div className="cross-wrap"><span className="top"></span><span className="bottom"></span></div>
                            </div>

                            
                            <div className="classynav">
                                <ul>
                                    <li><Link to="">Home</Link></li>
                                    <li  className="dropdown">
                                        <Link to ='/sureVault'>Sure Vault</Link>
                                    </li>
                                    {
                                        route == '' && user != null && Object.keys(user).length > 0 &&
                                            <li className="dropdown">
                                                <Link to ='/sureoffers'>Sure Offers</Link>
                                            </li>
                                    }
                                    

                                    <li className="dropdown">
                                        <Link>Loan Marketplace</Link>
                                        <div class="dropdown-content">
                                            <Link to = "/borrower_market">Borrower</Link>
                                            <Link to ="/lender_market">Lender</Link>
                                        </div>
                                    </li>
                                   
                                    <li className="dropdown">
                                        <Link to="/makerequest">Sure Request</Link>
                                        
                                    </li>
                                    <li className="dropdown">
                                        <Link>Peer 2 Peer</Link>
                                        <div class="dropdown-content">
                                            <Link to = "/peer_borrower">Lender</Link>
                                            <Link to ="/peer_lender">Borrower</Link>
                                        </div>
                                    </li>
                                    {
                                        route == '' &&
                                        <li><Link to="/home">My Account</Link></li>
                                    }

                                    {
                                        route != '' &&
                                        <li><Link to={route}>My Account</Link></li>
                                    }
                                    
                                    {/* <li><Link to="/profile">My Profile</Link></li> */}
                                </ul>
                            </div>
                          
                        </div>

                       
                        <div className="contact">
                            <a href="#"><img src="../../img/core-img/call2.png" alt=""/> +234 70678484</a>
                        </div>
                    </nav>
                  
                </div>
            </div>
        </div>
        </div>
        <div class ="mobile">
        <nav class="navbar navbar-expand-lg navbar-light" style={{backgroundColor:'#003679',color:"#fff"}}>
                        <a class="navbar-brand" href="#" style={{color:'#fff'}}>Surebanker</a>
                        <button style={{backgroundColor:'#ffbb38'}} class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span style={{color:'#fff'}} class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul class="navbar-nav">
                            <li class="nav-item active">
                                <Link style={{color:'#fff'}} class="nav-link" to="/">Home <span class="sr-only">(current)</span></Link>
                            </li>
                            <li class="nav-item">
                                <Link style={{color:'#fff'}} class="nav-link" to="/sureVault">SureVault</Link>
                            </li>
                            <li class="nav-item">
                                <Link style={{color:'#fff'}} class="nav-link" to="/sureoffers">Sure Offers</Link>
                            </li>
                            <li class="nav-item dropdown">
                                <Link style={{color:'#fff'}} class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Loan Marketplace
                                </Link>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <Link style={{color:'#fff'}} class="dropdown-item" to="/borrower_market">Action</Link>
                                <Link style={{color:'#fff'}} class="dropdown-item" to="/lender_market">Another action</Link>
                                </div>
                            </li>
                            <li class="nav-item">
                                <Link style={{color:'#fff'}} class="nav-link" to="/makerequest">Sure Requests</Link>
                            </li>
                            <li class="nav-item"><Link style={{color:'#fff'}} class="nav-link" to="/peer">Peer 2 Peer</Link></li>
                            <li class="nav-item"><Link style={{color:'#fff'}} class="nav-link" to="/home">My Account</Link></li>
                            <li class="nav-item"><Link style={{color:'#fff'}} class="nav-link" to="/profile">My Profile</Link></li>
                            </ul>
                        </div>
                        </nav>
               
        </div>
        <SlidingPanel
        panelContainerClassName  = "head"
        type={'left'}
        isOpen={openPanel}
        size={30}
      >
         <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Features</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Pricing</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown link
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                </li>
                </ul>
            </div>
            </nav>
                          
      </SlidingPanel>
    </header>
    );
  }
  
  export default withRouter(Header);