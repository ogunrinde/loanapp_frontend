import React, {useState, useEffect} from 'react';
import Header from '../Header';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import '../../css/css/analytics.css'
import Footer from '../Footer';
import '../../css/account/custom.css';
import Analytics from '../analytics';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faTrash, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import SureRequest from '../sureRequest';
import Loader from 'react-loader-spinner';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import {useSelector, useDispatch } from 'react-redux';
import Sidebar from './sidebar';
import Request from './Request';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const MyProfile = (props) => 
{
	const dispatch = useDispatch();
    const userdetails = useSelector(state => state.root.userbasicdetails);
    const userhomeaddress = useSelector(state => state.root.userHomeAddress);
    const userofficeaddress = useSelector(state => state.root.userOfficeAddress);
    const usersocialmedia = useSelector(state => state.root.userSocialMediaAccounts);
    const bankdetail = useSelector(state => state.root.userBankInformation);
    const IsLoggedIn = useSelector(state => state.root.IsLoggedIn);
    const user = useSelector(state => state.root.user);
    const [ IsFetching, setIsFetching ] = useState(false);
    
    useEffect(() => {
       
    },[]);

    if(Object.keys(userdetails).length > 0)
    {
		//console.log(request);
        $('ul.tabs li').click(function(){
			var tab_id = $(this).attr('data-tab');
			$('ul.tabs li').removeClass('current');
			$('.tab-content').removeClass('current');

			$(this).addClass('current');
			$("#"+tab_id).addClass('current');
		});
	}

    return(
        <section className="lattest-product-area pb-40 category-list">
            <ReactNotification />
            <div style={{height:'100%',clear:'both'}}>  
            <Tabs defaultIndex={0}>
                            <TabList style ={{borderColor:'green'}}>
                            <Tab style={{backgroundColor:'#828bb3',color:'#fff',borderColor:'#828bb3',marginRight:2}}>Bank Information</Tab>
                            <Tab style={{backgroundColor:'#828bb3',color:'#fff',borderColor:'#828bb3',marginRight:2}}>Employment Information</Tab>
                            <Tab style={{backgroundColor:'#828bb3',color:'#fff',borderColor:'#828bb3',marginRight:2}}>Social Media Information</Tab>
                            <Tab style={{backgroundColor:'#828bb3',color:'#fff',borderColor:'#828bb3',marginRight:2}}>Bank Information</Tab>
                            </TabList>
                        
                            <TabPanel>
                             <div id="basicInformation">
					
                                <div className="bio-box">
                                    <div className="heading">
                                        <p>Surname</p>
                                    </div>
                                    <div className="desc">
                                        {userdetails.surname}
                                    </div>
                                </div>
                                <div className="bio-box">
                                    <div className="heading">
                                        <p>Firstname</p>
                                    </div>
                                    <div className="desc">
                                        {userdetails.firstname}
                                    </div>
                                </div>
                                <div className="bio-box">
                                    <div className="heading">
                                        <p>Middlename</p>
                                    </div>
                                    <div className="desc">
                                        {userdetails.middlename}
                                    </div>
                                </div>
                                <div className="bio-box">
                                    <div className="heading">
                                        <p>Gender</p>
                                    </div>
                                    <div className="desc">
                                        {userdetails.gender}
                                    </div>
                                </div>
                                <div className="bio-box">
                                    <div className="heading">
                                        <p>Mobile Number 1</p>
                                    </div>
                                    <div className="desc">
                                        {userdetails.mobile1}
                                    </div>
                                </div>
                                <div className="bio-box">
                                    <div className="heading">
                                        <p>Mobile Number 2</p>
                                    </div>
                                    <div className="desc">
                                        {userdetails.mobile2}
                                    </div>
                                </div>
                                <div className="bio-box">
                                    <div className="heading">
                                        <p>Date of Birth</p>
                                    </div>
                                    <div className="desc">
                                        {userdetails.date_of_birth}
                                    </div>
                                </div>
                                
                            </div>
                            </TabPanel>
                            <TabPanel>
                              <div id="officeaddress">
					
                                <div className="bio-box">
                                    <div className="heading">
                                        <p>Employment Status</p>
                                    </div>
                                    <div className="desc">
                                        {userofficeaddress.employmentstatus}
                                    </div>
                                </div>
                                <div className="bio-box">
                                    <div className="heading">
                                        <p>Office Address</p>
                                    </div>
                                    <div className="desc">
                                        {userofficeaddress.address}
                                    </div>
                                </div>
                                <div className="bio-box">
                                    <div className="heading">
                                        <p>Contact Number</p>
                                    </div>
                                    <div className="desc">
                                        {userofficeaddress.contact_number}
                                    </div>
                                </div>
                                <div className="bio-box">
                                    <div className="heading">
                                        <p>Contact Website</p>
                                    </div>
                                    <div className="desc">
                                        {userofficeaddress.contact_website}
                                    </div>
                                </div>
                        
                            </div>
                            </TabPanel>
                            <TabPanel>
                            <div id="social">
					
                                <div className="bio-box">
                                    <div className="heading">
                                        <p>Facebook Account</p>
                                    </div>
                                    <div className="desc">
                                        {usersocialmedia.facebook}
                                    </div>
                                </div>
                                <div className="bio-box">
                                    <div className="heading">
                                        <p>Instagram Account</p>
                                    </div>
                                    <div className="desc">
                                        {usersocialmedia.instagram}
                                    </div>
                                </div>
                                <div className="bio-box">
                                    <div className="heading">
                                        <p>LinkedIn Account</p>
                                    </div>
                                    <div className="desc">
                                        {usersocialmedia.linkedin}
                                    </div>
                                </div>
                                <div className="bio-box">
                                    <div className="heading">
                                        <p>Twitter Account</p>
                                    </div>
                                    <div className="desc">
                                        {usersocialmedia.twitter}
                                    </div>
                                </div>
                        
                            </div>
                            </TabPanel>
                            <TabPanel>
                            <div id="backinfo">
					
                                    <div className="bio-box">
                                        <div className="heading">
                                            <p>BVN</p>
                                        </div>
                                        <div className="desc">
                                            {bankdetail.bvn}
                                        </div>
                                    </div>
                                    <div className="bio-box">
                                        <div className="heading">
                                            <p>Account Number</p>
                                        </div>
                                        <div className="desc">
                                            {bankdetail.accountnumber}
                                        </div>
                                    </div>
                                    <div className="bio-box">
                                        <div className="heading">
                                            <p>Account Name</p>
                                        </div>
                                        <div className="desc">
                                            {bankdetail.bankname}
                                        </div>
                                    </div>
                                    
                            
                            </div>
                            </TabPanel>
            </Tabs>
                <div style={{textAlign:'center',marginTop:100}}>
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
			</section>
        
    );
}

export default MyProfile;