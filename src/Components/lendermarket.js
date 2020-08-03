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
import {useSelector, useDispatch } from 'react-redux';
import { ConnectToLender, GetUserLoanRequest, GetAllLenderOffers } from '../Components/redux/action/index';
import Loader from 'react-loader-spinner';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import MarketPlacedetails from './marketplacedetails';
import { withRouter } from 'react-router-dom';


const LenderMarket = (props) => 
{
    const dispatch = useDispatch();
    const [view_profile, setview_profile] = useState(false);
    const [lenderId, setlenderId] = useState(0);
    const [vault, setvault] = useState({});
    const [IsFetching, setIsFetching ] = useState(false);
    const all_lender_offers = useSelector(state => state.root.all_lender_offers);
    const IsLoggedIn = useSelector(state => state.root.IsLoggedIn);

    // const connect = (lenderId, requestId, vaultId) => {
    //     setview_vault(true);
    //     setvaultId(vaultId);
    //     setlenderId(lenderId);
    // }

    useEffect(() => {
        getdata();
    },[]);

    const getdata = async () => {
        setIsFetching(true);
        await dispatch(GetAllLenderOffers());
        setIsFetching(false);
    }

    const ViewlenderProfile = (offer) => {
        alert(IsLoggedIn);
        if(IsLoggedIn == false)
        {
            props.history.push('/login');
        }
        setview_profile(true);
        setlenderId(offer.user.id);
        setvault(offer);
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
            <div hidden={!view_profile} className="sideview">
                    <div>
                        <a className="pull-right">
                        <FontAwesomeIcon icon={faTimesCircle} onClick={() => setview_profile(false)} style={{color:'red',fontSize:25}} />
                        </a>
                    </div>
                    <div className="">
                        <div id="user">
                            {
                               Object.keys(vault).length > 0 && lenderId > 0 &&
                               <MarketPlacedetails lenderId ={lenderId} vault ={vault} />
                            } 
                        </div>
                    </div>
            </div>
            <section>
            <div className="profilecontainer"> 
              <div id="contact">
              <ul className="list-group">
                  {
                      all_lender_offers.length > 0 &&
                      all_lender_offers.map((offer) => 
                 
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div className="single-latest-news-area d-flex align-items-center">
                            <div className="news-thumbnail">
                                <img src="img/bg-img/7.jpg" alt=""/>
                            </div>
                            <div className="news-content">
                                <p href="#">{offer.user.name}</p>
                                <p style={{fontSize:14,}}><span style={{fontSize:12}}>Available Fund</span>: NGN {offer.fundamount.toLocaleString()}</p>
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
                    <div hidden = {all_lender_offers.length == 0 && IsFetching == false ? false: true}>
                    <li className="list-group-item d-flex justify-content-between align-items-center" >
                        <div className="single-latest-news-area d-flex align-items-center">
                                
                                <div className="news-content">
                                    <p href="#">No Offers Found</p>
                                    
                                </div>
                        </div>
                    </li>
                    </div>
                    <Loader
                        visible={IsFetching}
                        type="Puff"
                        color="#ffbb38"
                        height={30}
                        width={30}
                        timeout= {0} //3 secs
                
                    />
                  
                </ul>
              </div>
            </div>    
               
            </section>
            <Footer />
           
        </div>
        
    );
}

export default withRouter(LenderMarket);