/* eslint no-undef: "off"*/
import React, { useState, useEffect} from 'react';
import '../css/css/profile.css';
import { useForm } from "react-hook-form";
import { places, countrystates, Getcities } from '../Components/redux/action/index';
import { useSelector, useDispatch } from 'react-redux'; 
import { userbasicInfo, UserhomeAddress, UserOfficeAddress, GetCompleteUserProfile } from '../Components/redux/action/index';
import Loader from 'react-loader-spinner';
import { withRouter } from 'react-router-dom';


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
    const [ isLoadingCities, setisLoadingCities] = useState(false);
    const [ IsSubmitting, setIsSubmitting ] = useState(false);
    const codes = useSelector(state => state.root.codes);
    const cities = useSelector(state => state.root.cities);
    const userofficeaddress = useSelector(state => state.root.userOfficeAddress);


    useEffect(() =>{
        setisLoadingCountries(true);
        dispatch(places());
        setisLoadingCountries(false);
        process();
        //alert(JSON.stringify(userofficeaddress));
        //if(nextphase == 4) props.nextStep();
    },[nextphase]);



    const process = async () => {
        // if(userofficeaddress == null)
        //    await dispatch(GetCompleteUserProfile());
    }


    const handleChange = async (event) => {
        setisLoadingState(true);
        await dispatch(countrystates(event.target.value));
        setisLoadingState(false);
    }

    const country = (id) => {
        let index = countries.findIndex(x => x.id == id);
        //await dispatch(Getcities(id));
        return countries[index].name;
    }

    const allstates = (id) => {
        let index = states.findIndex(x => x.id == id);
        //await dispatch(Getcities(id));
        return states[index].name;
    }

    const allcities = (id) => {
        let index = cities.findIndex(x => x.id == id);
        //await dispatch(Getcities(id));
        return cities[index].name;
    }


    const onSubmit = async (data,e) => {
        //alert(JSON.stringify(data));
      // data.contact_number = `${data.mobile1code}${data.contact_number}`; 
       setIsSubmitting(true);
       await dispatch(UserOfficeAddress(data, props,e));
       setIsSubmitting(false);
    }

    const handleState = async (event) => {
        setisLoadingCities(true);
        await dispatch(Getcities(event.target.value));
        setisLoadingCities(false);
    }


    
    return(
       
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Office Address</h3>
                <div className="row" style={{marginTop:30}}>
                    <div className="col-lg-6 col-sm-12 col-md-6">
                        <fieldset>
                            <select 
                                    className="form-control"
                                    name="employmentstatus"
                                    style={{color:'#777777'}}
                                    ref={register({
                                        required: "Required",
                                    })}
                                >
                                
                                <option value ={userofficeaddress != null && userofficeaddress.employmentstatus}>{(userofficeaddress != null && userofficeaddress.id) ? userofficeaddress.employmentstatus : 'Select Employment Status'} </option>    
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
                        className="form-control"
                        placeholder="Company/Business Name"
                        type="text" 
                        name="company_name"
                        defaultValue ={(userofficeaddress != null && userofficeaddress.company_name) ? userofficeaddress.company_name :''}
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

                <div className="row" style={{marginTop:20}}>
                   
                    <div className="col-lg-6 col-sm-12 col-md-6">
                        <fieldset>
                        <input 
                                    className="form-control"
                                    placeholder="Contact Number" 
                                    type="number" 
                                    tabindex="1" 
                                    defaultValue ={(userofficeaddress != null && userofficeaddress.contact_number) ? userofficeaddress.contact_number :''}
                                    autofocus
                                    name="contact_number"
                                    ref={register({
                                        required: "Required",
                                        min:100,
                                        max:999999999999999
                                    })}
                                />
                                <small className="text-danger">{errors.contact_number?.type == "required" && "Company Phone Number is required"}</small>
                                <small className="text-danger">{(errors.contact_number?.type == "min" || errors.contact_number?.type == "max") && "Invalid Phone Number"}</small>
                        </fieldset>
                    </div>
                    <div className="col-lg-6 col-sm-12 col-md-6">
                        <fieldset>
                        <input 
                            className="form-control"
                            placeholder="Company Website" 
                            defaultValue ={(userofficeaddress != null && userofficeaddress.company_website) ? userofficeaddress.company_website :''}
                            type="text" 
                            tabindex="1" 
                            autofocus
                            name="company_website"
                            ref={register({
                                
                            })}
                        />
                        <small className="text-danger">{errors.company_website?.type == "required" && "Company Website is required"}</small>
                        </fieldset>
                    </div>
               
                </div>

    
                <div className="row" style={{marginTop:20}}>
                    <div className="col-lg-6 col-sm-12 col-md-6">
                        <fieldset>
                            <select 
                                    className="form-control"
                                    name="country_id"
                                    style={{color:'#777777',backgroundColor:'#fff'}}
                                    onChange = {(text) => handleChange(text)}
                                    ref={register({
                                        required: "Required",
                                    })}
                                >
                                <option value ={userofficeaddress != null && userofficeaddress.country_id}>{(userofficeaddress != null && userofficeaddress.userofficecountry != null) ? userofficeaddress.userofficecountry.name : 'Select Country' } </option>
                                {/* <option value ="">Select your Country</option> */}
                                    {
                                        countries != null &&
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
                                className="form-control"
                                name="state_id"
                                onChange = {(text) => handleState(text)}
                                style={{color:'#777777',backgroundColor:'#fff'}}    
                                ref={register({
                                    required: "Required",
                                })}
                            >
                            <option value ={userofficeaddress != null && userofficeaddress.state_id}>{(userofficeaddress != null && userofficeaddress.userofficestate != null) ? userofficeaddress.userofficestate.name : 'Select State'} </option>
                                {
                                    states != null &&
                                    states.map((state) =>
                                    <option value ={state.id}>{ state.name }</option>
                                )}
                        </select> 
                        <small className="text-danger" hidden = {!isLoadingState}>Loading States....</small>
                        <small className="text-danger">{errors.state_id?.type == "required" && "State is required"}</small>
                    </fieldset>
                    </div>
                   
                </div>
                <div className="row" style={{marginTop:20}}>
                    <div className="col-lg-6 col-sm-12 col-md-6">
                        <fieldset>
                                <select 
                                    className="form-control"
                                    name="city_id"
                                    style={{color:'#777777',backgroundColor:'#fff'}}    
                                    ref={register({
                                        required: "Required",
                                    })}
                                >
                                <option value ={userofficeaddress != null ? userofficeaddress.city_id : ''}>{(userofficeaddress != null && userofficeaddress.city != null) ? userofficeaddress.city.name : 'Select City' } </option>

                                    {
                                        cities != null &&
                                        cities.map((city) =>
                                        <option value ={city.id}>{ city.name }</option>
                                    )}
                            </select> 
                            <small className="text-danger" hidden = {!isLoadingCities}>Loading Cities....</small>
                            <small className="text-danger">{errors.city_id?.type == "required" && "City is required"}</small>
                        </fieldset>
                    </div>
                    <div className="col-lg-6 col-sm-12 col-md-6">
                    <fieldset>
                       <input 
                            className="form-control"
                            placeholder="Office Address" 
                            type="text" 
                            tabindex="1" 
                            autofocus
                            name="address"
                            defaultValue ={(userofficeaddress != null && userofficeaddress.address) ? userofficeaddress.address :''}
                            ref={register({
                                required: "Required"
                            })}
                        />
                        <small className="text-danger">{errors.address?.type == "required" && "Office Address is required"}</small>
                    </fieldset>
                    </div>
                </div>
               
                
                <fieldset>
                <div className="row" style={{marginTop:20}}>
                    <div className="col-lg-6">

                    </div>
                    <div className="col-lg-3">
                    </div>
                    <div className="col-lg-3">
                    {
                        isLoadingCities == false && isLoadingCountries == false && isLoadingState == false &&
                        <button hidden={IsSubmitting} name="submit"  type="submit" className="btn btn-success" style={{backgroundColor:'rgb(255, 187, 56)', border:'none'}} id="" data-submit="...Sending">Save and Continue</button>

                    }
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
                
                </fieldset>
               
            </form>
    );
}

export default withRouter(OfficeInfo);