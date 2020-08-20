import React from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import '../css/css/profile.css';
import { useForm } from "react-hook-form";
import { PeerBorrowerToLender } from './redux/action/index';
import {useSelector, useDispatch } from 'react-redux';
import Loader from 'react-loader-spinner';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import { withRouter } from 'react-router-dom';


const PeerBorrower = (props) => 
{
    const dispatch = useDispatch();
    const IsFetching = useSelector(state => state.root.IsFetching);
    const { handleSubmit, register, errors } = useForm();
    const onSubmit =  (data) => {
         dispatch(PeerBorrowerToLender(data,props));
    }
    return(
        <div>
            <ReactNotification />
            <section class="breadcrumb-area bg-img bg-overlay jarallax" style={{backgroundImage: `url('../../img/bg-img/13.jpg')`}}>
                <div class="container h-100">
                    <div class="row h-100 align-items-center">
                        <div class="col-12">
                            <div class="breadcrumb-content">
                                <h2>Peer to Peer</h2>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
            <div className="profilecontainer"> 
              <div id="contact">
             <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Peer to Peer  {props.totalSteps}</h3>
                <h4>Complete the Form Below</h4>
                <div className="row">
                    <div className="col-lg-6 col-sm-12 col-md-6">
                   
                    <fieldset>
                       <input
                        placeholder="Lender Phone Number"
                        type="number" 
                        name="mobile"
                        tabindex="1" 
                        autofocus
                        ref={register({
                            required: "Required"
                          })}
                        />
                        <small className="text-danger">{errors.mobile?.type == "required" && "Lender Phone Number is required"}</small>
                    </fieldset>
                    </div>
                    <div className="col-lg-6 col-sm-12 col-md-6">
                   
                    <fieldset>
                       <input
                        placeholder="Amount Intend to Borrow"
                        type="number" 
                        name="requestAmount"
                        tabindex="1" 
                        autofocus
                        ref={register({
                            required: "Required",
                            min:1,
                            max:99999999999999
                          })}
                        />
                        <small className="text-danger">{errors.requestAmount?.type == "required" && "Amount Needed is required"}</small>
                    </fieldset>
                    </div>
            
                </div>

                <div className="row">
                    <div className="col-lg-6 col-sm-12 col-md-6">
                    <fieldset>
                       <select name="loanperiod" 
                        style={{color:'#777777'}}
                        ref={register({
                            required: "Required"
                          })}
                       >
                          <option value="">How Long</option>
                          <option value="3">3 months</option>
                          <option value ="6">6 months</option>
                          <option value="1">1 year</option>
                          <option value="2">2 years</option>
                          <option value="3">3 years</option>
                      </select> 
                      <small className="text-danger">{errors.loanperiod?.type == "required" && "Loan Period is required"}</small>
                    </fieldset>
                    </div>
                    <div className="col-lg-6 col-sm-12 col-md-6">
                    <fieldset>
                    <input
                        style={{display:'none'}}
                        placeholder="Min Interest Rate"
                        type="number" 
                        name="minInterestRate"
                        tabindex="1" 
                        value="0"
                        autofocus
                        ref={register({
                            required: "Required"
                          })}
                        /> 
                       <input
                        placeholder="Max Interest Rate"
                        type="number" 
                        name="maxInterestRate"
                        tabindex="1" 
                        autofocus
                        ref={register({
                            required: "Required"
                          })}
                        />
                        <small className="text-danger">{errors.maxInterestRate?.type == "required" && "Maximum Interest Rate is required"}</small>
                    </fieldset>
                    </div>
                </div>
               
                <div className="row">
                    
                    <div className="col-lg-6 col-sm-12 col-md-6">
                        <fieldset>
                        <select 
                            name="requiredcreditBereau" 
                            style={{color:'#777777'}}
                            placeholder=""
                            ref={register({
                                required: "Required"
                              })}
                        >
                            <option value="">Are you will to pay for Credit Bereau</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select> 
                            <small className="text-danger">{errors.requiredcreditBereau?.type == "required" && "Credit Bereau field is required"}</small>
                        </fieldset>
                    </div>
                    <div className="col-lg-6 col-sm-12 col-md-6">
                    <fieldset>
                     <select name="repaymentplan" 
                            style={{color:'#777777'}}
                            placeholder=""
                            ref={register({
                                required: "Required"
                              })}
                    >
                          <option value="">Repayment Plan</option>
                          <option value="Daily">Daily</option>
                          <option value="Weekly">Weekly</option>
                          <option value= "Monthly">Monthly</option>
                          <option value="At the End">At the End</option>
                      </select> 
                        <small className="text-danger">{errors.repaymentplan?.type == "required" && "Repayment Plan is required"}</small>
                    </fieldset>
                    </div>
                </div>
               

                {/* <div className="row">
                   
                    <div className="col-lg-12 col-sm-12 col-md-12">
                        <fieldset>
                        <select 
                            name="requiredcreditBereau" 
                            style={{color:'#777777'}}
                            placeholder=""
                            ref={register({
                                required: "Required"
                              })}
                        >
                            <option value="">Are you will to pay for Credit Bereau</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select> 
                            <small className="text-danger">{errors.requiredcreditBereau?.type == "required" && "Credit Bereau field is required"}</small>
                        </fieldset>
                    </div>
               
                </div>                */}
                    <fieldset>
                    <div className="row">
                        <div className="col-lg-6">
    
                        </div>
                        <div className="col-lg-3">
                          
                        </div>
                        <div className="col-lg-3">
                        <button name="submit" hidden = {IsFetching}  type="submit" id="" data-submit="...Sending">Submit Request</button>
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
                    
                    </fieldset>
            </form>
    
              </div>
            </div>    
               
            </section>
            <Footer />
           
        </div>
        
    );
}

export default withRouter(PeerBorrower);