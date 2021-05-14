import React, {useState, useEffect} from 'react';
import Header from '../Header';
import { Link } from 'react-router-dom';
import '../../css/css/analytics.css'
import Footer from '../Footer';
import Analytics from '../analytics';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faTrash, faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import SureRequest from '../sureRequest';
import Loader from 'react-loader-spinner';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import {useSelector, useDispatch } from 'react-redux';
import Sidebar from './sidebar';
import {  GetpendingApprovals } from '../redux/action/loan';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Request from './Request';
import { requeststatus } from '../redux/action';

const Verification = (props) => 
{
	const dispatch = useDispatch();
    const IsFetching = useSelector(state => state.root.IsFetching);

    const userdetails = useSelector(state => state.root.userbasicdetails);
    const userhomeaddress = useSelector(state => state.root.userHomeAddress);
    const userofficeaddress = useSelector(state => state.root.userOfficeAddress);
    const usersocialmedia = useSelector(state => state.root.userSocialMediaAccounts);
    const bankdetail = useSelector(state => state.root.userBankInformation);
    const IsLoggedIn = useSelector(state => state.root.IsLoggedIn);

    const [view_more, setview_more] = useState(false);
    const [request, setrequest] = useState({});
    const month = useSelector(state => state.root.month);
    
    useEffect(() => {
        process();
        //alert(JSON.stringify(userdetails));
    },[]);

    const process = async  () =>
    {

    }

    const requestInformation = (request) => 
    {
        //alert(JSON.stringify(request));
        setrequest(request);
        setview_more(true);
    }

    return(
        <section className="lattest-product-area pb-40 category-list">
            <ReactNotification />
                <div hidden={!view_more} style={{position:'fixed',right:0,top:0,width:'70%',height:'100%',overflowY:'scroll',zIndex:4000343005,backgroundColor:'#f1f7f9',padding:10}}>
                    <div>
                        <a className="pull-right">
                        <FontAwesomeIcon icon={faTimesCircle} onClick={() => setview_more(false)} style={{color:'red',fontSize:25}} />
                        </a>
                    </div>
                   
                </div>
                {
                 userdetails != null && Object.keys(userdetails).length > 0 &&   
				<div className="table-responsive ">
                    <table className="table">
                        <thead>
                            <tr className="filter-bar" style={{color:'#fff'}}>
                                <th scope="col">S/N</th>
                                <th scope="col">Account</th>
                                <th scope="col">Is Verified</th>
                                <th scope="col">Date Verified</th>
								<th scope="col">Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userdetails != null && 
                                <tr>
                                <td>1</td>
                                <td>
                                    <div className="media">
                                    
                                        <div className="media-body">
                                            {userdetails != null && Object.keys(userdetails).length > 0 && userdetails.mobile1}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {userdetails != null && Object.keys(userdetails).length > 0 && userdetails.Is_phone_number_verified == 0 ? <FontAwesomeIcon style={{color:'#ff6c00',fontSize:18}} icon={faTimesCircle}/> : <FontAwesomeIcon style={{color:'#ffba00',fontSize:18}} icon={faTimesCircle} />}
                                </td>
                                <td>
                                  {userdetails != null && Object.keys(userdetails).length > 0 && userdetails.date_phone_number_verified == null ? 'Not Verified Yet' : userdetails.date_phone_number_verified }
                                </td>
                               
                                <td>
                                    {
                                        userdetails != null && Object.keys(userdetails).length > 0 && userdetails.Is_phone_number_verified == 0 ? (
                                            <button style={{fontSize:13,padding:3,color:'#fff',background:'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)',borderRadius:2}}>Verify Now</button>
                                        ) : (
                                            'Verified'
                                        )
                                    }
                                    
                                
                                </td>
                                </tr>
                          }
                          {
                              userdetails != null &&
                                <tr>
                                    <td>2</td>
                                        <td>
                                            <div className="media">
                                            
                                                <div className="media-body">
                                                    {userdetails != null && Object.keys(userdetails).length > 0 && userdetails.email}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {userdetails != null && Object.keys(userdetails).length > 0 && userdetails.Is_email_verified == 0 ? <FontAwesomeIcon style={{color:'#ff6c00',fontSize:18}} icon={faTimesCircle}/> : <FontAwesomeIcon style={{color:'#ffba00',fontSize:18}} icon={faTimesCircle} />}
                                        </td>
                                        <td>
                                        {userdetails != null && Object.keys(userdetails).length > 0 &&  userdetails.date_email_verified == null ? 'Not Verified Yet' : userdetails.date_email_verified }
                                        </td>
                                    
                                        <td>
                                            {
                                            userdetails != null && Object.keys(userdetails).length > 0 &&  userdetails.Is_email_verified == 0 ? (
                                                    <button style={{fontSize:13,padding:3,color:'#fff',background:'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)',borderRadius:2}}>Verify Now</button>
                                                ) : (
                                                    'Verified'
                                                )
                                            }
                                        </td>
                                </tr>
                            }
                            {
                                userhomeaddress != null &&
                                <tr>     
                                <td>3</td>
                                <td>
                                    <div className="media">
                                    
                                        <div className="media-body">
                                            {userhomeaddress != null && Object.keys(userhomeaddress).length > 0 && userhomeaddress.address}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {userhomeaddress != null && Object.keys(userhomeaddress).length > 0 && userhomeaddress.is_verified == 0 ? <FontAwesomeIcon style={{color:'#ff6c00',fontSize:18}} icon={faTimesCircle}/> : <FontAwesomeIcon style={{color:'#ffba00',fontSize:18}} icon={faTimesCircle} />}
                                </td>
                                <td>
                                    {userhomeaddress != null && Object.keys(userhomeaddress).length > 0 && userhomeaddress.date_home_address_verified == null ? 'Not Verified Yet' : userofficeaddress.date_home_address_verified }
                                </td>
                                
                                <td>
                                        {
                                            userhomeaddress != null && Object.keys(userhomeaddress).length > 0 && userhomeaddress.is_verified == 0 ? (
                                                <button style={{fontSize:13,padding:3,color:'#fff',background:'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)',borderRadius:2}}>Verify Now</button>
                                            ) : (
                                                'Verified'
                                            )
                                        }
                                    </td>
                                </tr>
                            }
                            
                       
                        {
                            userofficeaddress != null &&
                            <tr>
                            <td>4</td>
                                <td>
                                    <div className="media">
                                    
                                        <div className="media-body">
                                            {userofficeaddress != null && userofficeaddress.address}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {userofficeaddress != null && userofficeaddress.is_verified == 0 ? <FontAwesomeIcon style={{color:'#ff6c00',fontSize:18}} icon={faTimesCircle}/> : <FontAwesomeIcon style={{color:'#ffba00',fontSize:18}} icon={faTimesCircle} />}
                                </td>
                                <td>
                                  {(userofficeaddress != null && userofficeaddress.date_office_address_verified == null) ? 'Not Verified Yet' : userofficeaddress.date_office_address_verified }
                                </td>
                               
                                <td>
                                    {
                                        userofficeaddress != null && userofficeaddress.is_verified == 0 ? (
                                            <button style={{fontSize:13,padding:3,color:'#fff',background:'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)',borderRadius:2}}>Verify Now</button>
                                        ) : (
                                            'Verified'
                                        )
                                    }
                                </td>
                            </tr>
                        }
                        
                        </tbody>   
                       
				    </table>
                   
                </div>
                
                }
                {
                    userdetails != null && Object.keys(userdetails).length == 0 &&
                    <div style={{textAlign:'center', marginTop:20,width:'100%'}}>No Data Found</div>
                }
                <div style={{textAlign:'center',marginTop:100}}>
                    <Loader
                        visible={false}
                        type="Puff"
                        color="#ffbb38"
                        height={30}
                        width={30}
                        timeout= {0} //3 secs
                
                    />
                </div>    
			</section>
        
    );
}

export default Verification;