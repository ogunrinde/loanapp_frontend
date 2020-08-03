import React, {useState, useEffect} from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import '../css/css/profile.css';
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faTrash, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import ViewProfile from './viewProfile';
import ViewVault from './ViewVault';
import {useSelector, useDisptach, useDispatch } from 'react-redux';
import { ConnectToLender, GetUserLoanRequest } from '../Components/redux/action/index';
import Loader from 'react-loader-spinner';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';


const SureOffers = (props) => 
{
    const dispatch = useDispatch();

    const [view_profile, setview_profile] = useState(false);
    const [lenderId, setlenderId] = useState(0);
    const [vaultId, setvaultId] = useState(0);
    const [view_vault, setview_vault] = useState(false);
    const IsFetching = useSelector(state => state.root.IsFetching);
    const SureOffers = useSelector(state => state.root.sureOffers);
    const LoanRequestData = useSelector(state => state.root.loanrequest);
    const month = useSelector(state => state.root.month);
    const { handleSubmit, register, errors } = useForm();
    const onSubmit = values => console.log(values);

    const connect = (lenderId, requestId, vaultId) => {
        setview_vault(true);
        setvaultId(vaultId);
        setlenderId(lenderId);
    }

    useEffect(() => {
        dispatch(GetUserLoanRequest());
        //alert(JSON.stringify(LoanRequestData));
    },[]);

    const FormatDate = (date) => {
        let d = date.split('-');
        let day = d[2];
        let mth = month[parseInt(d[1])-1];
        let year = d[0];
        return `${day} ${mth}, ${year}`;
    }

    const ViewlenderProfile = (offer) => {
        setview_profile(true);
        setlenderId(offer.user.id);
        setvaultId(offer.id);
    }

    return(
        <div>
          
            <ReactNotification />
            <section className="breadcrumb-area bg-img bg-overlay jarallax" style={{backgroundImage: `url('../../img/bg-img/13.jpg')`}}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="breadcrumb-content">
                                <h2>List of Sure Offers</h2>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div hidden={!view_profile} style={{position:'fixed',right:0,top:0,width:'60%',height:'100%',overflowY:'scroll',zIndex:4000343005,backgroundColor:'#fff',padding:10}}>
                    <div>
                        <a className="pull-right">
                        <FontAwesomeIcon icon={faTimesCircle} onClick={() => setview_profile(false)} style={{color:'red',fontSize:25}} />
                        </a>
                    </div>
                    <div className="">
                        <div id="user">
                            {
                               LoanRequestData !=null && vaultId > 0 && lenderId > 0 &&
                               <ViewProfile lenderId ={lenderId} vaultId ={vaultId} requestId = {LoanRequestData.id} />
                            } 
                        </div>
                    </div>
            </div>
            <div hidden={!view_vault} style={{position:'fixed',right:0,top:0,width:'50%',height:'100%',overflowY:'scroll',zIndex:4000343005,backgroundColor:'#f1f7f9',padding:10}}>
                    <div>
                        <a className="pull-right">
                        <FontAwesomeIcon icon={faTimesCircle} onClick={() => setview_vault(false)} style={{color:'red',fontSize:25}} />
                        </a>
                    </div>
                    <div className="">
                        <div id="user">
                            {/* <ViewVault vaultId ={vaultId} lenderId = {lenderId} requestId = {LoanRequestData.id} /> */}
                        </div>
                    </div>
            </div>
            <section>
            <div className="profilecontainer"> 
              <div id="contact">
              <ul className="list-group">
                  {
                      SureOffers.length > 0 &&
                      SureOffers.map((offer) => 
                 
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div className="single-latest-news-area d-flex align-items-center">
                            <div className="news-thumbnail">
                                <img src="img/bg-img/7.jpg" alt=""/>
                            </div>
                            <div className="news-content">
                                <p href="#">{offer.user.name}</p>
                                <div className="news-meta">
                                    <a href="#" className="post-author">Min Interest Rate {offer.minInterestperMonth}%</a>
                                    <a href="#" className="post-date">Max Interest Rate {offer.maxInterestperMonth}%</a> 
                                </div>
                               
                            </div>
                        </div>
                    <div className="row">
                        
                        <div className="col-lg-12">
                          <button name="submit" style={{padding:4}} onClick ={() => ViewlenderProfile(offer)} type="submit"   id="" data-submit="...Sending">View Details</button>
                        </div>
                    </div>
                    
                   
                    </li>
                    )
                }
                    <div hidden = {SureOffers.length == 0 && LoanRequestData != null ? false: true}>
                    <li className="list-group-item d-flex justify-content-between align-items-center" >
                        <div className="single-latest-news-area d-flex align-items-center">
                                
                                <div className="news-content">
                                    <p href="#">No Offers meet your requirement</p>
                                    
                                </div>
                        </div>
                    </li>
                    </div>
                    <div hidden = {LoanRequestData == null ? false: true}>
                    <li className="list-group-item d-flex justify-content-between align-items-center" >
                        <div className="single-latest-news-area d-flex align-items-center">
                                
                                <div className="news-content">
                                    <p href="#">You don't have a loan request</p>
                                    
                                </div>
                        </div>
                    </li>
                    </div>
                </ul>
              </div>
            </div>    
               
            </section>
            <Footer />
           
        </div>
        
    );
}

export default SureOffers;