import React,{useEffect, useState} from 'react';
import { GetCompleteUserProfile,logout, requeststatus } from './redux/action/index';

import {
    Link
  } from "react-router-dom";
  import '../css/css/header.css';
  import { withRouter} from 'react-router-dom';
import Notify from './notify';
import { useDispatch, useSelector } from 'react-redux';
import SlidingPanel from 'react-sliding-side-panel';






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
    useEffect(() =>{
        if(IsFetching == true) dispatch(requeststatus());
        if(IsLoggedIn == true) dispatch(GetCompleteUserProfile());
    },[props]);

    const log = () => {
        dispatch(logout());
        props.history.push('/');
    }
    return (
        <header className="header-area">
        <div className="top-header-area">
            <div className="container h-100">
                <div className="row h-100 align-items-center">
                    <div className="col-12 d-flex justify-content-between">
                        <div className="logo">
                            <a href="index.html"><img src="../../img/core-img/logo.png" alt=""/></a>
                        </div>
                        {
                            IsLoggedIn == false && 
                            <div className="top-contact-info d-flex align-items-center">
                                <Link to="/register" data-toggle="tooltip" data-placement="bottom" title="25 th Street Avenue, Los Angeles, CA"><img src="img/core-img/placeholder.png" alt=""/> <span>Create Account</span></Link>
                                <Link to ="/login" data-toggle="tooltip" data-placement="bottom" title="office@yourfirm.com"><img src="../../img/core-img/message.png" alt=""/> <span>Login</span></Link>
                            </div>
                        }

                        {
                            IsLoggedIn == true && 
                            <div className="top-contact-info d-flex align-items-center">
                                <Link to="/home" data-toggle="tooltip" data-placement="bottom" title="25 th Street Avenue, Los Angeles, CA"><img src="img/core-img/placeholder.png" alt=""/> <span style={{textTransform:'capitalize'}}>Hi, {user.name}</span></Link>
                                <Link onClick = {log} data-toggle="tooltip" data-placement="bottom" title="office@yourfirm.com"><img src="../../img/core-img/message.png" alt=""/> <span>Logout</span></Link>
                            </div>
                        }
                        
                    </div>
                </div>
            </div>
        </div>
        {
            (userdetails == null ||
            userhomeaddress == null ||
            userofficeaddress == null ||
            usersocialmedia == null ||
            bankdetail == null) && <Notify />
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
                                    <li className="dropdown">
                                        <Link to ='/sureoffers'>Sure Offers</Link>
                                    </li>

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
                                    <li><Link to="/peer">Peer 2 Peer</Link></li>
                                    <li><Link to="/home">My Account</Link></li>
                                    <li><Link to="/profile">My Profile</Link></li>
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
                        <a class="navbar-brand" href="#" style={{color:'#fff'}}>Navbar</a>
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