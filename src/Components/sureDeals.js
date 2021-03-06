import React, {useState} from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import '../css/css/user.css';
import { useForm } from "react-hook-form";
import BasicInfo from './basicInfo';
import '../css/css/profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faTrash } from '@fortawesome/free-solid-svg-icons'
import UserInfo from './userInfo';
import SureRequest from './sureRequest';
import DealProcess from './dealProcess';



const SureDeals = (props) => 
{
    const [viewdetails, setDetails] = useState({});
    const [showdetails, setShow] = useState(false);
    const { handleSubmit, register, errors } = useForm();
    const onSubmit = values => console.log(values);

    return(
        <div>
           
            {
                showdetails == true &&
                <div style={{position:'fixed',right:0,top:0,width:'50%',height:'100%',overflowY:'scroll',zIndex:4000343005,backgroundColor:'#f1f7f9',padding:10}}>
                    <div>
                        <a className="pull-right" onClick ={() => setShow(false)}>
                        <FontAwesomeIcon icon={faTrash} />
                        </a>
                    </div>
                    <div className="">
                        <div id="user">
                            <DealProcess level = {true} />
                        </div>
                    </div>
                </div>
            }
            
            <section className="breadcrumb-area bg-img bg-overlay jarallax" style={{backgroundImage: `url('../../img/bg-img/13.jpg')`}}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="breadcrumb-content">
                                <h2>Sure Deals</h2>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
            <div className="profilecontainer"> 
              <div id="contact">
              <ul className="list-group">
                  
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div className="single-latest-news-area d-flex align-items-center">
                            <div className="news-thumbnail">
                                <img src="img/bg-img/7.jpg" alt=""/>
                            </div>
                            <div className="news-content">
                                <p href="#">Borrower's Name</p>
                                <div className="news-meta">
                                    <a href="#" className="post-author"><img src="img/core-img/pencil.png" alt=""/> Location</a>
                                    <a href="#" className="post-date"><img src="img/core-img/calendar.png" alt=""/> April 26</a>
                                </div>
                            </div>
                        </div>

                          <button name="submit" onClick={() => setShow(true)} className="connect" id="" data-submit="...Sending">Details</button>
                     
                   
                    </li>
                </ul>
              </div>
            </div>    
               
            </section>
            <Footer />
           
        </div>
        
    );
}

export default SureDeals;