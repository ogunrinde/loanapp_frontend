/* eslint no-undef: "off"*/
import React, { useState, useEffect} from 'react';
import '../css/css/profile.css';
import { useForm } from "react-hook-form";
import { places, countrystates, Getcities } from '../Components/redux/action/index';
import { useSelector, useDispatch } from 'react-redux'; 
import { userbasicInfo, UserhomeAddress, GetCompleteUserProfile } from '../Components/redux/action/index';
import Loader from 'react-loader-spinner';
import { withRouter } from 'react-router-dom';
import { GetState, AllGetcities } from './Message/getdata';


const HomeAddress = (props) =>
{
    const dispatch = useDispatch();
    const [ isLoadingCountries, setisLoadingCountries] = useState(false);
    const [ isLoadingState, setisLoadingState ] = useState(false);
    const [ isLoadingCities, setisLoadingCities ] = useState(false);
    const [ IsSubmitting, setIsSubmitting ] = useState(false);
    const countries = useSelector(state => state.places.countries);
    const states = useSelector(state => state.places.states);
    const cities = useSelector(state => state.root.cities);
    const nextphase = useSelector(state => state.root.nextphase);
    const IsFetching = useSelector(state => state.root.IsFetching);
    const { handleSubmit, register, errors } = useForm();
    const userdetails = useSelector(state => state.root.userbasicdetails);
    const userhomeaddress = useSelector(state => state.root.userHomeAddress);
    const userofficeaddress = useSelector(state => state.root.userOfficeAddress);
    const usersocialmedia = useSelector(state => state.root.userSocialMediaAccounts);
    const bankdetail = useSelector(state => state.root.userBankInformation);

    useEffect(() =>{
        //alert('djjf');
        process();
        getcountries();
        //alert(JSON.stringify(userhomeaddress));
        //if(nextphase == 3) props.nextStep();
    },[nextphase]);



    const getcountries = async () => {
        setisLoadingCountries(true);
        await dispatch(places());
        setisLoadingCountries(false);
    }

    const handleChange = async (event) => {
        setisLoadingState(true);
        await dispatch(countrystates(event.target.value));
        setisLoadingState(false);
    }

    const process = async () => {
        // if(userhomeaddress == null)
        //    await dispatch(GetCompleteUserProfile());
    }

    const handleState = async (event) => {
        setisLoadingCities(true);
        await dispatch(Getcities(event.target.value));
        setisLoadingCities(false);
    }

    const country = () => {
        let index = countries.findIndex(x => x.id == userhomeaddress.country_id);
        //await dispatch(Getcities(id));
        return countries[index].name;
    }

    

    

    // const state = (id) => {
    //     if(states == null || states.length == 0) return false;
    //     let index = states.findIndex(x => x.id == id);
    //     return states[index].name;
    // }

    const onSubmit = async (data,e) =>
    { 
        setIsSubmitting(true);
        //alert(JSON.stringify(data));
        await dispatch(UserhomeAddress(data, props,e));
        setIsSubmitting(false);
       
    }
    return(
        <div style={{marginTop:0}}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Home Address</h3>
                <div className="row" style={{marginTop:40}}>
                <div className="col-lg-4 col-sm-12 col-md-6">
                    <fieldset>
                        <select 
                                name="country_id"
                                className="form-control"
                                defaultValue={userhomeaddress != null ? userhomeaddress.country_id : ''}
                                style={{color:'#777777', backgroundColor:'#fff'}}
                                onChange = {(text) => handleChange(text)}
                                ref={register({
                                    required: "Required",
                                })}
                            >
                            
                            <option value =''>Select your Country </option>
                                {
                                    countries != null &&
                                    countries.map((country) =>
                                    <option value ={country.id}>{ country.name }</option>
                                )}
                        </select> 
                        <small className="text-danger">{errors.country?.type == "required" && "Country is required"}</small>
                    </fieldset>
                </div>
                <div className="col-lg-4 col-sm-12 col-md-6">
                    <fieldset>
                            <select 
                                name="state_id"
                                className="form-control"
                                onChange = {(text) => handleState(text)}
                                style={{color:'#777777',backgroundColor:'#fff'}}    
                                ref={register({
                                    required: "Required",
                                })}
                            >
                            <option value ={userhomeaddress != null && userhomeaddress.state_id}>{(userhomeaddress != null && userhomeaddress.userhomestate != null && userhomeaddress.userhomestate.name)} </option>

                                {
                                    states != null &&
                                    states.map((state) =>
                                    <option value ={state.id}>{ state.name }</option>
                                )}
                        </select> 
                        {
                            isLoadingState == true &&
                            <small className="text-danger">Please Wait...loading State</small>
                        }
                        <small className="text-danger">{errors.state?.type == "required" && "State is required"}</small>
                    </fieldset>
                </div>
                <div className="col-lg-4 col-sm-12 col-md-6">
                    <fieldset>
                            <select 
                                name="city_id"
                                className="form-control"
                                style={{color:'#777777',backgroundColor:'#fff'}}    
                                ref={register({
                                    required: "Required",
                                })}
                            >
                            <option value ={userhomeaddress != null && userhomeaddress.city_id}>{(userhomeaddress != null && userhomeaddress.city != null && userhomeaddress.city.name)} </option>


                                {
                                    cities != null &&
                                    cities.map((city) =>
                                    <option value ={city.id}>{ city.name }</option>
                                )}
                        </select> 
                        {
                            isLoadingCities == true &&
                            <small className="text-danger">Please Wait...loading Cities</small>
                        }
                        <small className="text-danger">{errors.city?.type == "required" && "City is required"}</small>
                    </fieldset>
                </div>
                </div>
                <div className="row" style={{marginTop:20}}>
                    <div className="col-lg-12 col-sm-12 col-md-12">
                    <fieldset>
                        <textarea
                          className="form-control"
                          name="address"
                          placeholder="Address"
                          ref={register({
                              required: "Required"
                          })}
                        >
                        {userhomeaddress != null ? userhomeaddress.address : ''}
                        </textarea>
                        <small className="text-danger">{errors.address?.type == "required" && "House Address is required"}</small>
                    </fieldset>
                    </div>
                </div>
                <div className="row" style={{marginTop:30}}>
                    <div className="col-lg-6">

                    </div>
                    <div className="col-lg-3">
                    </div>
                    <div className="col-lg-3">
                    {
                        isLoadingCities == false && isLoadingCountries == false && isLoadingState == false &&
                        <button hidden={IsSubmitting} name="submit" className="btn btn-success" style={{backgroundColor:'rgb(255, 187, 56)', border:'none'}} type="submit" id="" data-submit="...Sending">Save and Continue</button>

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
                
               
            </form>
        </div>
    );
}

export default withRouter(HomeAddress);