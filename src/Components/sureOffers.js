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
    const [vaultdetail, setvaultdetail] = useState({});
    const [view_vault, setview_vault] = useState(false);
    const IsFetching = useSelector(state => state.root.IsFetching);
    let SureOffers = useSelector(state => state.root.sureOffers);
    const LoanRequestData = useSelector(state => state.root.loanrequest);
    const month = useSelector(state => state.root.month);
    const { handleSubmit, register, errors } = useForm();
    const [offers, setoffers] = useState([]);
    const onSubmit = values => console.log(values);

    const connect = (lenderId, requestId, vaultId) => {
        setview_vault(true);
        setvaultId(vaultId);
        setlenderId(lenderId);
    }

    useEffect(() => {
        dispatch(GetUserLoanRequest());
        processRequest();
        //alert(JSON.stringify(LoanRequestData));
    },[]);

    const days = (from,to) => {
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        let fromyear = from.split('-')[0];
        let frommonth = from.split('-')[1];
        let fromday = from.split('-')[2];

        let toyear = to.split('-')[0];
        let tomonth = to.split('-')[1];
        let today = to.split('-')[2];
        const firstDate = new Date(fromyear, frommonth, fromday);
        const secondDate = new Date(toyear, tomonth, today);

        const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
        //alert(diffDays);
        return diffDays;
    }

    const processRequest = () => {
        if(LoanRequestData != null && LoanRequestData.request_type == 'peer to peer')
        {
            //alert(JSON.stringify(LoanRequestData));
            setoffers(SureOffers);
        }
        if(LoanRequestData != null && Object.keys(LoanRequestData).length > 0 && LoanRequestData.request_type == 'open request')
        {
            let offerlist = [];
            if(LoanRequestData.requestAmount > 0)
            {
                //alert(JSON.stringify(offers));
                //alert(event.target.value);
                offerlist = SureOffers.filter(function (offer) {
                   // return parseFloat(LoanRequestData.requestAmount) >= 9000000000
                    return parseFloat(LoanRequestData.requestAmount) >= parseFloat(offer.minRequestAmount) &&
                           parseFloat(LoanRequestData.requestAmount) <= parseFloat(offer.maxRequestAmount)
                });

                //alert(JSON.stringify(offerlist));

            } 
            if(LoanRequestData.maxInterestRate > 0)
            {
                offerlist = offerlist.filter(function (offer) {
                    return parseFloat(offer.minInterestperMonth) <= parseFloat(LoanRequestData.maxInterestRate)
                });
            }
            if(LoanRequestData.loanperiod > 0)
            {
                offerlist = offerlist.filter(function (offer) {
                    let offerdays = days(offer.availablefrom,offer.availableto);
                    let loandays = parseFloat(LoanRequestData.loanperiod) * 30;
                    return offerdays >= loandays
                });
            }
            if(LoanRequestData.lender_country_id != '')
            {
                offerlist = offerlist.filter(function (offer) {
                    return parseFloat(offer.borrower_country_id) == parseFloat(LoanRequestData.lender_country_id)
                });
            }
            if(LoanRequestData.lender_state_id != '')
            {
                offerlist = offerlist.filter(function (offer) {
                    return parseFloat(offer.borrower_state_id) == parseFloat(LoanRequestData.lender_state_id)
                });
            }
            if(LoanRequestData.lender_city_id != '')
            {
                offerlist = offerlist.filter(function (offer) {
                    return parseFloat(offer.borrower_city_id) == parseFloat(LoanRequestData.lender_city_id)
                });
            }
            //alert(JSON.stringify(offerlist));
            setoffers(offerlist);
        }
    }

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
        setvaultdetail(offer);
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
                    <div style={{float:'right'}}>
                        <a className="pull-right">
                        <FontAwesomeIcon icon={faTimesCircle} onClick={() => setview_profile(false)} style={{color:'red',fontSize:25}} />
                        </a>
                    </div>
                    <div className="">
                        <div id="">
                            {
                               LoanRequestData !=null && vaultId > 0 && lenderId > 0 &&
                               <ViewProfile lenderId ={lenderId} vaultdetail = {vaultdetail} vaultId ={vaultId} requestId = {LoanRequestData.id} />
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
              <div className="list-group">
                  {
                      offers != null &&
                      offers.length > 0 &&
                      offers.map((offer) => 
                        <div class="list-group-item list-group-item-action disabled">
                            <div className="row">
                                <div className="col-lg-2 col-sm-2 col-md-2 col-4">
                                   <div className="news-thumbnail">
                                     <img src="img/bg-img/7.jpg" alt=""/>
                                    </div>
                                </div>    
                                <div className="col-lg-7 col-sm-7 col-md-7 col-8 content">
                                    <div className="news-content">
                                        <p style={{textTransform:'capitalize'}}>{offer.user.name}</p>
                                        <p style={{fontSize:14}}>NGN {offer.fundamount.toLocaleString()}</p>
                                        <div className="news-meta">
                                            <a className="post-author">Min Interest Rate {offer.minInterestperMonth}%</a>
                                        </div>
                                        <div className="news-meta">
                                            <a href="#" className="post-date">  Max Interest Rate {offer.maxInterestperMonth}%</a> 
                                        </div>
                                    
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-12 col-md-3">
                                       <div style ={{textAlign:'right'}}>
                                       <button name="submit" className="viewdetail" style={{padding:4}} onClick ={() => ViewlenderProfile(offer)} type="submit"   id="" data-submit="...Sending">View Details</button>
                                    
                                       </div>

                                </div>   
                            </div>
                        </div>
                     
                    )
                   }
                    <div hidden = {(offers != null && offers.length == 0 || LoanRequestData == null) ? false: true}>
                    <li className="list-group-item d-flex justify-content-between align-items-center" >
                        <div className="single-latest-news-area d-flex align-items-center">
                                
                                <div className="news-content">
                                    <p href="#">No Request Found</p>
                                    
                                </div>
                        </div>
                    </li>
                    </div>
                    
                  
                </div>    
             
              </div>
            </div>    
               
            </section>
            <Footer />
           
        </div>
        
    );
}

export default SureOffers;