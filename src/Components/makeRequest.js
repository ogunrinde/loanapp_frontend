import React, {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import Header from './Header';
import '../css/css/profile.css';
import Footer from './Footer';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import {  useSelector, useDispatch } from 'react-redux';
import { places, countrystates, SendRequest } from '../Components/redux/action/index';
import { withRouter } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import Loader from 'react-loader-spinner';


const MakeRequest = (props) => 
{
    const dispatch = useDispatch();
    const [ isLoadingCountries, setisLoadingCountries] = useState(false);
    const [ isLoadingState, setisLoadingState ] = useState(false);
    const countries = useSelector(state => state.places.countries);
    const states = useSelector(state => state.places.states);
    const IsFetching = useSelector(state => state.root.IsFetching);
    
    const { handleSubmit, register, errors } = useForm();
    

    useEffect(() =>{
        process();
    },[]);


    process = async () => {
        setisLoadingCountries(true);
        await dispatch(places());
        setisLoadingCountries(false);
    }

    const onSubmit = async (data,props) =>
    { 
        await dispatch(SendRequest(data,props));
        
    }

    const handleChange = (event) => {
        setisLoadingState(true);
        dispatch(countrystates(event.target.value));
        setisLoadingState(false);
    }

    

    return(
        <div>
            <ReactNotification />
            <section class="breadcrumb-area bg-img bg-overlay jarallax" style={{backgroundImage: `url('../../img/bg-img/13.jpg')`}}>
                <div class="container h-100">
                    <div class="row h-100 align-items-center">
                        <div class="col-12">
                            <div class="breadcrumb-content">
                                <h2>Request for a Loan</h2>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section style={{backgroundColor:'#f1f7f9',padding:20,paddingBottom:40}}>
            <div className="profilecontainer"> 
              <div id="contact"> 
              <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Sure Request  {props.totalSteps}</h3>
                <h4>Complete the Form Below</h4>
                <div className="row">
                    <div className="col-lg-12 col-sm-12 col-md-12">
                   
                    <fieldset>
                       <input
                        placeholder="Request Amount"
                        type="number" 
                        name="requestAmount"
                        tabindex="1" 
                        autofocus
                        ref={register({
                            required: "Required"
                          })}
                        />
                        <small className="text-danger">{errors.requestAmount?.type == "required" && "Request Amount is required"}</small>
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
                          <option value="3 months">3 months</option>
                          <option value ="6 months">6 months</option>
                          <option value="1 year">1 year</option>
                          <option value="2 years"></option>
                          <option value="3 years">3 years</option>
                      </select> 
                      <small className="text-danger">{errors.loanperiod?.type == "required" && "Loan Period is required"}</small>
                    </fieldset>
                    </div>
                    <div className="col-lg-6 col-sm-12 col-md-6">
                    <fieldset>
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
                    <input
                        placeholder="Min Interest Rate"
                        type="number" 
                        name="minInterestRate"
                        tabindex="1" 
                        autofocus
                        ref={register({
                            required: "Required"
                          })}
                        />
                        <small className="text-danger">{errors.minInterestRate?.type == "required" && "Minimum Interest Rate is required"}</small>
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
               

                <div className="row">
                   
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
               
                </div>

                <div className="row">
                <div className="col-lg-6 col-sm-12 col-md-6">
                    <fieldset>
                        <select 
                                name="lender_country_id"
                                style={{color:'#777777'}}
                                onChange = {(text) => handleChange(text)}
                                ref={register({
                                    required: "Required",
                                })}
                            >
                            <option value ="">Select Lender's Country</option>
                                {
                                    countries.map((country) =>
                                    <option value ={country.id}>{ country.name }</option>
                                )}
                        </select> 
                        <small className="text-danger">{errors.lender_country_id?.type == "required" && "Country is required"}</small>
                        { isLoadingCountries == true && <small className="text-danger">Loading Countries....</small>}
                    </fieldset>
                </div>
                <div className="col-lg-6 col-sm-12 col-md-6">
                    <fieldset>
                            <select 
                                name="lender_state_id"
                                style={{color:'#777777'}}    
                                ref={register({
                                    required: "Required",
                                })}
                            >
                            <option value ="">Select Lender's State</option>
                                {
                                    states.map((state) =>
                                    <option value ={state.id}>{ state.name }</option>
                                )}
                        </select> 
                        <small className="text-danger">{errors.lender_state_id?.type == "required" && "State is required"}</small>
                        { isLoadingState == true && <small className="text-danger">Loading States....</small>}
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
                        <button name="submit" hidden = {IsFetching}  type="submit" id="" data-submit="...Sending">Submit Request</button>
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
                    
                    </fieldset>
            </form>
    
                 
              </div>
            </div>    
               
            </section>
            <Footer />
           
        </div>
        
    );
}

export default withRouter(MakeRequest);