import React, {useState, useEffect} from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import '../css/css/profile.css';
import Loader from 'react-loader-spinner';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { VerifyEmailNow } from './redux/action/index';


const VerifyEmail = (props) => 
{
    const dispatch = useDispatch();
    const [IsFetching, setIsFectching ] = useState(false);
    const verify_email  = useSelector(state => state.root.verify_email);
    const { id } = useParams();
    useEffect(() => {
        process();
        //alert(atob(id));
        
    },[]);

    const process = async () => {
        setIsFectching(true);
        //alert(verify_email);
        await dispatch(VerifyEmailNow(id));
        setIsFectching(false);
    }

    return(
        <div>
          
            <ReactNotification />
            <section className="breadcrumb-area bg-img bg-overlay jarallax" style={{backgroundImage: `url('../../img/bg-img/13.jpg')`}}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="breadcrumb-content">
                                <h2>Email Verification</h2>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
            <div className="profilecontainer" style={{marginTop:40,textAlign:'center'}}> 
              <div id="contact">  
                  <div className="list-group">
                  {
                    IsFetching == false &&  
                       <div>
                            <li className="list-group-item d-flex justify-content-between align-items-center"style = {{backgroundColor:'#ffbb38',padding:30,color:'#fff'}} >
                                <div className="text-center">
                                        
                                        <div className="news-content text-center">
                                            <p style={{color:'#fff'}}>{verify_email}</p>
                                            
                                        </div>
                                </div>
                            </li>
                        </div>
                  }  
                  {
                    IsFetching == true &&
                    <div>
                        <p>Please wait...While we verifying your Email Address</p>
                        <Loader
                            visible={IsFetching}
                            type="Puff"
                            color="#ffbb38"
                            height={60}
                            width={60}
                            timeout= {0} //3 secs
                
                       />
                    </div>
                    
                }   
                   
                    
                  
                </div>      
             
              </div>
            </div>    
               
            </section>
           
           
        </div>
        
    );
}

export default VerifyEmail;