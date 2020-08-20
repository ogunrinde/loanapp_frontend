/* eslint no-undef: "off"*/
import React, { useState, useEffect} from 'react';
import '../css/css/profile.css';
import { useForm } from "react-hook-form";
import { places, countrystates, Getcities } from '../Components/redux/action/index';
import { useSelector, useDispatch } from 'react-redux'; 
import { userbasicInfo, UserhomeAddress } from '../Components/redux/action/index';
import Loader from 'react-loader-spinner';


const HomeAddress = (props) =>
{
    const dispatch = useDispatch();
    const [ isLoadingCountries, setisLoadingCountries] = useState(false);
    const [ isLoadingState, setisLoadingState ] = useState(false);
    const [ isLoadingCities, setisLoadingCities ] = useState(false);
    const countries = useSelector(state => state.places.countries);
    const states = useSelector(state => state.places.states);
    const cities = useSelector(state => state.root.cities);
    const nextphase = useSelector(state => state.root.nextphase);
    const IsFetching = useSelector(state => state.root.IsFetching);
    const { handleSubmit, register, errors } = useForm();

    useEffect(() =>{
        setisLoadingCountries(true);
        dispatch(places());
        setisLoadingCountries(false);
        //if(nextphase == 3) props.nextStep();
    },[nextphase]);

    const handleChange = (event) => {
        setisLoadingState(true);
        dispatch(countrystates(event.target.value));
        setisLoadingState(false);
    }

    const handleState = (event) => {
        setisLoadingCities(true);
        dispatch(Getcities(event.target.value));
        setisLoadingCities(false);
    }

    const onSubmit = async (data) =>
    { 
        //alert(JSON.stringify(data));
        await dispatch(UserhomeAddress(data));
        props.nextStep();
    }
    return(
       
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Home Address</h3>
                <div className="row">
                <div className="col-lg-4 col-sm-12 col-md-6">
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
                                onChange = {(text) => handleState(text)}
                                style={{color:'#777777'}}    
                                ref={register({
                                    required: "Required",
                                })}
                            >
                            <option value ="">Select your State</option>
                                {
                                    states != null &&
                                    states.map((state) =>
                                    <option value ={state.id}>{ state.name }</option>
                                )}
                        </select> 
                        <small className="text-danger">{errors.state?.type == "required" && "State is required"}</small>
                    </fieldset>
                </div>
                <div className="col-lg-4 col-sm-12 col-md-6">
                    <fieldset>
                            <select 
                                name="city_id"
                                style={{color:'#777777'}}    
                                ref={register({
                                    required: "Required",
                                })}
                            >
                            <option value ="">Select your City</option>
                                {
                                    cities != null &&
                                    cities.map((city) =>
                                    <option value ={city.id}>{ city.name }</option>
                                )}
                        </select> 
                        <small className="text-danger">{errors.city?.type == "required" && "City is required"}</small>
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
                
               
            </form>
    );
}

export default HomeAddress;