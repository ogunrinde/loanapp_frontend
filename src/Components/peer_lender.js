import React, { useState } from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import '../css/css/profile.css';
import { useForm } from "react-hook-form";
import { PeerLenderToBorrower } from './redux/action/index';
import {useSelector, useDispatch } from 'react-redux';
import Loader from 'react-loader-spinner';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import { withRouter } from 'react-router-dom';


const PeerLender = (props) => 
{
    const dispatch = useDispatch();
    const IsFetching = useSelector(state => state.root.IsFetching);
    const [ IsSubmitting, setIsSubmitting ] = useState(false);
    const { handleSubmit, register, errors } = useForm();
    const IsLoggedIn = useSelector(state => state.root.IsLoggedIn);
    const route = useSelector(state => state.root.route);
    const onSubmit =  async (data,e) => {
         setIsSubmitting(true);
         await dispatch(PeerLenderToBorrower(data,props, e));
         setIsSubmitting(false);
    }
    return(
        <div>
            <ReactNotification />
            {/* <section class="breadcrumb-area bg-img bg-overlay jarallax" style={{backgroundImage: `url('../../img/bg-img/13.jpg')`}}>
                <div class="container h-100">
                    <div class="row h-100 align-items-center">
                        <div class="col-12">
                            <div class="breadcrumb-content">
                                <h2>Peer to Peer</h2>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
            <section  style={{backgroundColor:'#f1f7f9',padding:20,paddingBottom:40}}>
            <div className="profilecontainer peer"> 
              <div id="contact">
             <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Peer to Peer</h3>
                <h4>Complete the Form Below</h4>
                <div className="row">
                    <div className="col-lg-6 col-sm-12 col-md-6">
                    <label style={{color:'#777777',fontSize:14,marginBottom:7}}>Borrower Phone Number </label>
                    <fieldset>
                       <input
                        placeholder=""
                        type="number" 
                        name="mobile"
                        tabindex="1" 
                        autofocus
                        ref={register({
                            required: "Required"
                          })}
                        />
                        <small className="text-danger">{errors.mobile?.type == "required" && "Borrower Phone Number is required"}</small>
                    </fieldset>
                    </div>
                    <div className="col-lg-6 col-sm-12 col-md-6">
                    <label style={{color:'#777777',fontSize:14,marginBottom:7}}>Amount Available </label>
                    <fieldset>
                       <input
                        placeholder=""
                        type="number" 
                        name="fundamount"
                        tabindex="1" 
                        autofocus
                        ref={register({
                            required: "Required"
                          })}
                        />
                        <small className="text-danger">{errors.fundAmount?.type == "required" && "Amount Available is required"}</small>
                    </fieldset>
                    </div>
            
                </div>

                <div className="row">
                    <div className="col-lg-6 col-sm-12 col-md-6">
                    <label style={{color:'#777777',fontSize:14,marginBottom:7}}>Min Interest per Month </label>    
                    <fieldset>
                    <input
                        placeholder=""
                        type="number" 
                        name="minInterestperMonth"
                        tabindex="1" 
                        autofocus
                        ref={register({
                            required: "Required"
                          })}
                        />
                        <small className="text-danger">{errors.minInterestperMonth?.type == "required" && "Minimum Interest Rate is required"}</small>
                    </fieldset>
                    </div>
                    <div className="col-lg-6 col-sm-12 col-md-6">
                    <label style={{color:'#777777',fontSize:14,marginBottom:7}}>Max Interest per Month </label>    
                    <fieldset>
                       <input
                        placeholder=""
                        type="number" 
                        name="maxInterestperMonth"
                        tabindex="1" 
                        autofocus
                        ref={register({
                            required: "Required"
                          })}
                        />
                        <small className="text-danger">{errors.maxInterestperMonth?.type == "required" && "Maximum Interest Rate is required"}</small>
                    </fieldset>
                    </div>
                </div>
               
                <div className="row">
                    <div className="col-lg-6 col-sm-12 col-md-6">
                    <label style={{color:'#777777',fontSize:14,marginBottom:7}}>Available from </label>        
                    <fieldset>
                    <input
                        placeholder=""
                        type="date" 
                        name="availablefrom"
                        tabindex="1" 
                        autofocus
                        ref={register({
                            required: "Required"
                          })}
                        />
                        <small className="text-danger">{errors.availablefrom?.type == "required" && "Available from is required"}</small>
                    </fieldset>
                    </div>
                    <div className="col-lg-6 col-sm-12 col-md-6">
                    <label style={{color:'#777777',fontSize:14,marginBottom:7}}>Available To </label>        
                    <fieldset>
                    <input
                        placeholder=""
                        type="date" 
                        name="availableto"
                        tabindex="1" 
                        autofocus
                        ref={register({
                            required: "Required"
                          })}
                        />
                        <small className="text-danger">{errors.availableto?.type == "required" && "Available to is required"}</small>
                    </fieldset>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6 col-sm-12 col-md-6">
                    <label style={{color:'#777777',fontSize:14,marginBottom:7}}>Min Loan Tenor in months</label>      
                    <fieldset>
                    <input
                        placeholder=""
                        type="number" 
                        name="minloantenor"
                        tabindex="1" 
                        autofocus
                        ref={register({
                            required: "Required",
                            min:1,
                            max:99
                          })}
                        />
                        <small className="text-danger">{errors.minloantenor?.type == "required" && "Min Loan Tenor to is required"}</small>
                    </fieldset>
                    </div>
                    <div className="col-lg-6 col-sm-12 col-md-6">
                    <label style={{color:'#777777',fontSize:14,marginBottom:7}}>Max Loan Tenor in months</label>   
                    <fieldset>
                    <input
                        placeholder=""
                        type="number" 
                        name="maxloantenor"
                        tabindex="1" 
                        autofocus
                        ref={register({
                            required: "Required"
                          })}
                        />
                        <small className="text-danger">{errors.maxloantenor?.type == "required" && "Max Loan Tenor is required"}</small>
                    </fieldset>
                    </div>
                </div>
               

                <div className="row">
                   
                    <div className="col-lg-12 col-sm-12 col-md-12">
                    <label style={{color:'#777777',fontSize:14,marginBottom:7}}>Are you will to pay for Credit Bereau</label> 
                        <fieldset>
                        <select 
                            name="requiredcreditBereau" 
                            style={{color:'#777777'}}
                            placeholder=""
                            ref={register({
                                required: "Required"
                              })}
                        >
                            <option value=""></option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select> 
                            <small className="text-danger">{errors.requiredcreditBereau?.type == "required" && "Credit Bereau field is required"}</small>
                        </fieldset>
                    </div>
               
                </div>               
                    <fieldset>
                    <div className="row">
                        <div className="col-lg-6">
    
                        </div>
                        <div className="col-lg-3">
                          
                        </div>
                        <div className="col-lg-3">
                        {
                            IsLoggedIn == true && route == '' &&
                            <button name="submit" hidden = {IsSubmitting}  type="submit" id="" data-submit="...Sending">Submit Request</button>

                        }    
                        <div style={{width:'100%',textAlign:'center'}}>
                        <Loader
								visible={IsSubmitting}
								type="Puff"
								color="#ffbb38"
								height={30}
								width={30}
								timeout= {0} //3 secs
						
							/>
                        </div>  
                        </div>
                    </div>    
                    
                    </fieldset>
            </form>
    
              </div>
            </div>    
               
            </section>
            <Footer />
           
        </div>
        
    );
}

export default withRouter(PeerLender);