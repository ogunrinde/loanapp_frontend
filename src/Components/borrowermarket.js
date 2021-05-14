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
import { ConnectToLender, GetUserLoanRequest, GetAllBorrowerOffers } from '../Components/redux/action/index';
import Loader from 'react-loader-spinner';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import MarketPlacedetailsForBorrower from './marketplacedetailsforborrower';
import { withRouter } from 'react-router-dom';


const BorrowerMarket = (props) => 
{
    const dispatch = useDispatch();
    const [view_profile, setview_profile] = useState(false);
    const [borrowerId, setborrowerId] = useState(0);
    const [request, setrequest] = useState({});
    const [IsFetching, setIsFetching ] = useState(false);
    const all_borrowers_request = useSelector(state => state.root.all_borrowers_requests);
    const IsLoggedIn = useSelector(state => state.root.IsLoggedIn);
    const route = useSelector(state => state.root.route);

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
        await dispatch(GetAllBorrowerOffers());
        setIsFetching(false);
    }

    const ViewborrowerProfile = (request) => {
        if(IsLoggedIn == false)
        {
            props.history.push('/login');
        }
        setview_profile(true);
        setborrowerId(request.user.id);
        setrequest(request);
    }

    return(
        <div>
          
            <ReactNotification />
            <section className="breadcrumb-area bg-img bg-overlay jarallax" style={{backgroundImage: `url('../../img/bg-img/13.jpg')`}}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="breadcrumb-content">
                                <h2>List of Borrowers</h2>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div hidden={!view_profile} className="sideview2">
                    <div style={{float:'right', padding:10}}>
                        <a className="pull-right">
                        <FontAwesomeIcon icon={faTimesCircle} onClick={() => setview_profile(false)} style={{color:'red',fontSize:25}} />
                        </a>
                    </div>
                    <div className="" style={{width:'100%'}}>
                        <div id="">
                            {
                               Object.keys(request).length > 0 && borrowerId > 0 &&
                               <MarketPlacedetailsForBorrower borrowerId ={borrowerId} request ={request} />
                            } 
                        </div>
                    </div>
            </div>
            <section>
            <div className="profilecontainer"> 
              <div id="contact">
              <div className="list-group">
                  {
                      IsFetching == false &&
                      all_borrowers_request != null &&
                      all_borrowers_request.length > 0 &&
                      all_borrowers_request.map((request) => 
                        <div class="list-group-item list-group-item-action disabled marketlist">
                            <div className="row">
                                <div className="col-lg-3 col-sm-3 col-md-3 col-4" style={{marginRight:10}}>
                                   <div className="news-thumbnail">
                                     <img src="img/bg-img/7.jpg" alt=""/>
                                    </div>
                                </div>    
                                <div className="col-lg-5 col-sm-5 col-md-5 col-8 content">
                                    <div className="news-content">
                                        <p style={{textTransform:'capitalize'}}>{request.user.name}</p>
                                        <p style={{fontSize:14}}>NGN {request.requestAmount.toLocaleString()}</p>
                                        <div className="news-meta">
                                            <a href="#" className="post-author">Min Interest Rate {request.minInterestRate}%</a>
                                        </div>
                                        <div className="news-meta">
                                            <a href="#" className="post-date">  Max Interest Rate {request.maxInterestRate}%</a> 
                                        </div>
                                    
                                    </div>
                                </div>
                                <div className="col-lg-4 col-sm-12 col-md-3">
                                       <div style ={{textAlign:'right'}}>
                                       {
                                            IsLoggedIn == true && route == '' &&    
                                            <button  name="submit" className="viewdetail" onClick ={() => ViewborrowerProfile(request)} type="submit"   id="" data-submit="...Sending">View Details</button>
                                       }
                                       </div>

                                </div>   
                            </div>
                        </div>
                     
                    )
                   }
                    <div hidden = {(all_borrowers_request != null && all_borrowers_request.length == 0 && IsFetching == false) ? false: true}>
                    <li className="list-group-item d-flex justify-content-between align-items-center" >
                        <div className="single-latest-news-area d-flex align-items-center">
                                
                                <div className="news-content">
                                    <p href="#">No Request Found</p>
                                    
                                </div>
                        </div>
                    </li>
                    </div>
                    
                  
                </div>
                <div style={{width:'100%',textAlign:'center'}}>
                <Loader
                        visible={IsFetching}
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
            <Footer />
           
        </div>
        
    );
}

export default withRouter(BorrowerMarket);