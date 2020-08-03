/* eslint no-undef: "off"*/
import React, { useState, useEffect} from 'react';
import '../css/css/profile.css';
import { useForm } from "react-hook-form";
import { places, countrystates } from '../Components/redux/action/index';
import { useSelector, useDispatch } from 'react-redux'; 
import { userbasicInfo, UserhomeAddress, UserOfficeAddress } from '../Components/redux/action/index';
import Loader from 'react-loader-spinner';


const OfficeInfo = (props) =>
{
    const dispatch = useDispatch();
    const { handleSubmit, register, errors } = useForm();
    const countries = useSelector(state => state.places.countries);
    const states = useSelector(state => state.places.states);
    const nextphase = useSelector(state => state.root.nextphase);
    const IsFetching = useSelector(state => state.root.IsFetching);
    const [ isLoadingCountries, setisLoadingCountries] = useState(false);
    const [ isLoadingState, setisLoadingState ] = useState(false);


    useEffect(() =>{
        setisLoadingCountries(true);
        dispatch(places());
        setisLoadingCountries(false);
        //if(nextphase == 4) props.nextStep();
    },[nextphase]);


    const handleChange = async (event) => {
        setisLoadingState(true);
        await dispatch(countrystates(event.target.value));
        setisLoadingState(false);
    }


    const onSubmit = async (data) => {
       await dispatch(UserOfficeAddress(data));
       props.nextStep();
    }

    
    return(
       
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Office Address</h3>
                <div className="row">
                    <div className="col-lg-6 col-sm-12 col-md-6">
                        <fieldset>
                            <select 
                                    name="employmentstatus"
                                    style={{color:'#777777'}}
                                    ref={register({
                                        required: "Required",
                                    })}
                                >
                                <option value ="">Employment Status</option>
                                <option value ="Job Hunting">Job Hunting</option>  
                                <option value ="Contract Staff">Contract Staff</option>
                                <option value ="Internship">Internship</option>
                                <option value ="Full Time Employment">Full Time Employment</option>
                                <option value ="Self Employed">Self Employed</option>
                            </select> 
                            <small className="text-danger">{errors.employmentstatus?.type == "required" && "Employment Status is required"}</small>
                        </fieldset>
                    </div>
                    <div className="col-lg-6 col-sm-12 col-md-6">
                    <fieldset>
                       <input
                        placeholder="Company/Business Name"
                        type="text" 
                        name="company_name"
                        tabindex="1" 
                        autofocus
                        ref={register({
                            required: "Required",
                            minLength:3
                          })}
                        />
                        <small className="text-danger">{errors.company_name?.type == "required" && "Name is required"}</small>
                    </fieldset>
                    </div>
            
                </div>

                <div className="row">
                   
                    <div className="col-lg-6 col-sm-12 col-md-6">
                        <fieldset>
                        <input 
                            placeholder="Contact Number" 
                            type="text" 
                            tabindex="1" 
                            autofocus
                            name="contact_number"
                            ref={register({
                                required: "Required"
                            })}
                        />
                        <small className="text-danger">{errors.contact_number?.type == "required" && "Company Phone Number is required"}</small>
                        </fieldset>
                    </div>
                    <div className="col-lg-6 col-sm-12 col-md-6">
                        <fieldset>
                        <input 
                            placeholder="Company Website" 
                            type="text" 
                            tabindex="1" 
                            autofocus
                            name="company_website"
                            ref={register({
                                required: "Required"
                            })}
                        />
                        <small className="text-danger">{errors.company_website?.type == "required" && "Company Website is required"}</small>
                        </fieldset>
                    </div>
               
                </div>

    
                <div className="row">
                    <div className="col-lg-6 col-sm-12 col-md-6">
                        <fieldset>
                            <select 
                                    name="country_id"
                                    style={{color:'#777777'}}
                                    onChange = {(text) => handleChange(text)}
                                    ref={register({
                                        required: "Required",
                                    })}
                                >
                                <option value ="">Select your Country</option>
                                    {
                                        countries.map((country) =>
                                        <option value ={country.id}>{ country.name }</option>
                                    )}
                            </select> 
                            <small className="text-danger">{errors.country_id?.type == "required" && "Country is required"}</small>
                            <small className="text-danger" hidden = {!isLoadingCountries}>Loading Countries....</small>
                        </fieldset>
                    </div>

                    <div className="col-lg-6 col-sm-12 col-md-6">
                    <fieldset>
                            <select 
                                name="state_id"
                                style={{color:'#777777'}}    
                                ref={register({
                                    required: "Required",
                                })}
                            >
                            <option value ="">Select your State</option>
                                {
                                    states.map((state) =>
                                    <option value ={state.id}>{ state.name }</option>
                                )}
                        </select> 
                        <small className="text-danger" hidden = {!isLoadingState}>Loading States....</small>
                        <small className="text-danger">{errors.state_id?.type == "required" && "State is required"}</small>
                    </fieldset>
                    </div>
                   
                </div>
                <div className="row">
                    <div className="col-lg-12 col-sm-12 col-md-12">
                    <fieldset>
                       <input 
                            placeholder="House Address" 
                            type="text" 
                            tabindex="1" 
                            autofocus
                            name="address"
                            ref={register({
                                required: "Required"
                            })}
                        />
                        <small className="text-danger">{errors.address?.type == "required" && "House Address is required"}</small>
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
                       <button hidden={IsFetching} name="submit"  type="submit" id="" data-submit="...Sending">Next</button>
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
    );
}

export default OfficeInfo;