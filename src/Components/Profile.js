import React, { useEffect, useState } from 'react';
import Header from './Header';
import BasicInfo from './basicInfo';
import SocialMedia from './socialMedia';
//import Office from './officeInfo';
import { Link } from 'react-router-dom';
import { Stepper } from 'react-form-stepper';
import '../css/css/profile.css';
import OfficeInfo from './officeInfo';
import StepWizard from 'react-step-wizard';
import Footer from './Footer';
import HomeAddress from './HomeAddress';
import BankDetails from './bankdetails';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import { useSelector, useDispatch } from 'react-redux';
import { GetCompleteUserProfile } from './redux/action/index';
import Loader from 'react-loader-spinner';


const Profile = (props) => 
{
    const dispatch = useDispatch();
    const step = useSelector(state => state.root.nextphase);
    const stepwiz = parseInt(step) + 1;
    const [ IsFetching, setIsFetching] = useState(false);
    const userdetails = useSelector(state => state.root.userbasicdetails);
    const userhomeaddress = useSelector(state => state.root.userHomeAddress);
    const userofficeaddress = useSelector(state => state.root.userOfficeAddress);
    const usersocialmedia = useSelector(state => state.root.userSocialMediaAccounts);
    const bankdetail = useSelector(state => state.root.userBankInformation);
    useEffect(() =>{
        setIsFetching(true);
        dispatch(GetCompleteUserProfile());
        setIsFetching(false);
        //alert(step);
    },[]);
    return(
        <div>
           
            <ReactNotification />
            <section class="breadcrumb-area bg-img bg-overlay jarallax" style={{backgroundImage: `url('../../img/bg-img/13.jpg')`}}>
                <div class="container h-100">
                    <div class="row h-100 align-items-center">
                        <div class="col-12">
                            <div class="breadcrumb-content">
                                <h2>Complete your Profile</h2>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section style={{backgroundColor:'#f1f7f9',padding:20,paddingBottom:40}}>
            {  
                IsFetching == false && step != -1 &&
                <div className="profilecontainer"> 
                <div id="contact">
                <Stepper
                    styleConfig={{activeBgColor:'#ffbb38',inactiveBgColor:'#eee', completedBgColor:'#003679'}}
                    steps={[
                        { label: 'Basic Information' },
                        { label: 'Home Address' }, 
                        { label: 'Office Address' },
                        { label: 'Social Media'},
                        { label: 'Bank Information' }
                    ]}
                    activeStep={step}
                    /> 
                    
                    <StepWizard initialStep={stepwiz}>
                        <BasicInfo update = {props} />
                        <HomeAddress />
                        <OfficeInfo />
                        <SocialMedia />
                        <BankDetails />
                    </StepWizard>
                    
                </div>
                </div>    
            }     
            {
                IsFetching == true && step != -1 &&
                <div style={{textAlign:'center',padding:10}}>
                    <Loader
                        visible={IsFetching}
                        type="Puff"
                        color="#ffbb38"
                        height={30}
                        width={30}
                        timeout= {0} //3 secs
                
                    />
                </div>
            }
            </section>
            <Footer />
           
        </div>
        
    );
}

export default Profile;