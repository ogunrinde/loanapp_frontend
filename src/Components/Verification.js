import React, {useState, useEffect} from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faTrash, faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Loader from 'react-loader-spinner';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import {useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { VerifyPhone,GetCompleteUserProfile, SendCode, SendEmailCode, VerifyEmailAccount } from './redux/action/index';

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
    const [verify_phone, setverify_phone] = useState(false);
    const { handleSubmit, register, errors } = useForm();
    const [isSubmitting, setisSubmitting] = useState(false);
    const [verify_email, setverify_email] = useState(false);
    const [emailcode, setemailcode] = useState('');
    
    useEffect(() => {
        process();
        //alert(JSON.stringify(userdetails));
    },[]);

    const process = async  () =>
    {

    }

    const VerifyEmailNow = async () =>
    {
        //alert(JSON.stringify(data.code));
        if(emailcode == '') return false;
        setisSubmitting(true);
        await dispatch(VerifyEmailAccount(emailcode));
        dispatch(GetCompleteUserProfile());
        setisSubmitting(false);
        setverify_email(false);
    }

    const onSubmit = async (data) =>
    {
        //alert(JSON.stringify(data.code));
        setisSubmitting(true);
        await dispatch(VerifyPhone(data.code));
        await dispatch(GetCompleteUserProfile());
        setisSubmitting(false);
        setverify_phone(false);
    }

    const SendAgain = async () => {
        setisSubmitting(true);
        await dispatch(SendCode());
        setisSubmitting(false);
    }

    const SendEmailAgain = async () => {
        setisSubmitting(true);
        await dispatch(SendEmailCode());
        setisSubmitting(false);
    }

    const PhoneVerify = () => {  
        SendAgain();
        setverify_phone(true);

    }

    const EmailVerify = () => {  
        SendEmailAgain();
        setverify_email(true);

    }

    const requestInformation = (request) => 
    {
        //alert(JSON.stringify(request));
        setrequest(request);
        setview_more(true);
    }

    const FormatDate = (date) => {
        return date.split('T')[0];
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
                {
                    verify_email == true && 
                    <div className="sideview2" style={{padding:20,backgroundColor:'#f2f4f6'}}>
                        <div>
                            <a className="pull-right">
                            <FontAwesomeIcon icon={faTimesCircle} onClick={() => setverify_email(false)} style={{color:'red',fontSize:25}} />
                            </a>
                        </div>
                        <div className="" style={{width:'100%'}}>
                            <div id="" style={{textAlign:'center'}}>
                            <h3>Verify your Email Address</h3>
                            <div>
                                
                                <div className="row" style={{marginTop:15}}>
                                    <div style={{width:'80%', marginLeft:'10%',marginTop:30}}>                           
                                    <div className="col-lg-12 col-sm-12 col-md-12 col-lg-offset-2">   
                                    <fieldset>
                                    <input
                                        placeholder="Enter Code from Surebanker"
                                        type="text"
                                        onChange = {(event) => setemailcode(event.target.value)}
                                        className="form-control"
                                        name="code"
                                        tabindex="1" 
                                        autofocus
                                        />
                                        <small className="text-danger">{errors.code?.type == "required" && "code is required"}</small>
                                        <small onClick ={SendEmailAgain} className="text-danger">Enter the Code sent to your Email Address</small>
                                    </fieldset>
                                    </div>
                                    <div className="row">
                                    <div className="col-lg-12 col-sm-12 col-md-12 col-lg-offset-2">
                                    <button onClick= {VerifyEmailNow} hidden={isSubmitting} style={{backgroundColor:"#ffbb38",marginLeft:7,color:'#fff',padding:5,borderRadius:5,width:200}} name="submit"  type="submit" id="" data-submit="...Sending">Verify</button>
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
                    
                    </div>
            
                            </div>
                        </div>
                    </div>
                }
                {
                 userdetails != null && Object.keys(userdetails).length > 0 &&   
				<div className="table-responsive ">
                    <table className="table">
                        <thead>
                            <tr className="filter-bar" style={{color:'#fff'}}>
                                <th scope="col">S/N</th>
                                <th scope="col">Type</th>
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
                                    Phone Number
                                </td>
                                <td>
                                    <div className="media">
                                    
                                        <div className="media-body">
                                            {userdetails != null && Object.keys(userdetails).length > 0 && userdetails.mobile1}
                                        </div>
                                    </div>
                                </td>
                                
                                <td>
                                    {userdetails != null && Object.keys(userdetails).length > 0 && userdetails.Is_phone_number_verified == 1 ? <FontAwesomeIcon style={{color:'#ffba00',fontSize:18}} icon={faCheckCircle}/> : <FontAwesomeIcon style={{color:'#ff6c00',fontSize:18}} icon={faTimesCircle} />}
                                </td>
                                <td>
                                  {userdetails != null && Object.keys(userdetails).length > 0 && userdetails.date_phone_number_verified == null ? 'Not Verified Yet' : userdetails.date_phone_number_verified }
                                </td>
                               
                                <td>
                                    {
                                        userdetails != null && Object.keys(userdetails).length > 0 && userdetails.Is_phone_number_verified == 1 ? (
                                            'Verified'
                                        ): (
                                            <button onClick={PhoneVerify} style={{fontSize:13,padding:3,color:'#fff',background:'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)',borderRadius:2}}>Verify Now</button>
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
                                     Email Address
                                    </td>
                                        <td>
                                            <div className="media">
                                            
                                                <div className="media-body">
                                                    {userdetails != null && Object.keys(userdetails).length > 0 && userdetails.email}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {userdetails != null && Object.keys(userdetails).length > 0 && userdetails.Is_email_verified == 1 ? <FontAwesomeIcon style={{color:'#ffba00',fontSize:18}} icon={faCheckCircle}/> : <FontAwesomeIcon style={{color:'#ff6c00',fontSize:18}} icon={faTimesCircle} />}
                                        </td>
                                        <td>
                                        {userdetails != null && Object.keys(userdetails).length > 0 &&  userdetails.date_email_verified == null ? 'Not Verified Yet' : userdetails.date_email_verified }
                                        </td>
                                    
                                        <td>
                                            {
                                            userdetails != null && Object.keys(userdetails).length > 0 &&  userdetails.Is_email_verified == 1 ? (
                                                'Verified'
                                            ) : (
                                                    <button onClick={EmailVerify} style={{fontSize:13,padding:3,color:'#fff',background:'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)',borderRadius:2}}>Verify Now</button>
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
                                    Home Address
                                </td>
                                <td>
                                    <div className="media">
                                    
                                        <div className="media-body">
                                            {userhomeaddress != null && Object.keys(userhomeaddress).length > 0 && userhomeaddress.address}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {userhomeaddress != null && Object.keys(userhomeaddress).length > 0 && userhomeaddress.is_verified == 0 ? <FontAwesomeIcon style={{color:'#ff6c00',fontSize:18}} icon={faTimesCircle}/> : <FontAwesomeIcon style={{color:'#ffba00',fontSize:18}} icon={faCheckCircle} />}
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
                                    Office Address
                                </td>
                                <td>
                                    <div className="media">
                                    
                                        <div className="media-body">
                                            {userofficeaddress != null && userofficeaddress.address}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {userofficeaddress != null && userofficeaddress.is_verified == 0 ? <FontAwesomeIcon style={{color:'#ff6c00',fontSize:18}} icon={faTimesCircle}/> : <FontAwesomeIcon style={{color:'#ffba00',fontSize:18}} icon={faCheckCircle} />}
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

                        {
                            bankdetail != null &&
                            <tr>
                            <td>5</td>
                            <td>
                                    BVN Number
                                </td>
                                <td>
                                    <div className="media">
                                    
                                        <div className="media-body">
                                            {bankdetail != null && bankdetail.bvn}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {bankdetail != null && bankdetail.Is_BVN_verified == 0 ? <FontAwesomeIcon style={{color:'#ff6c00',fontSize:18}} icon={faTimesCircle}/> : <FontAwesomeIcon style={{color:'#ffba00',fontSize:18}} icon={faCheckCircle} />}
                                </td>
                                <td>
                                  {(bankdetail != null && bankdetail.Is_BVN_verified == 0) ? 'Not Verified Yet' : FormatDate(bankdetail.created_at) }
                                </td>
                               
                                <td>
                                    {
                                        bankdetail != null && bankdetail.Is_BVN_verified == 0 ? (
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