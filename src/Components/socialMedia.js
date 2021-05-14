/* eslint no-undef: "off"*/
import React, { useState, useEffect} from 'react';
import '../css/css/profile.css';
import { useForm } from "react-hook-form";
import { places, countrystates } from '../Components/redux/action/index';
import { useSelector, useDispatch } from 'react-redux'; 
import { userbasicInfo, UserhomeAddress, SocialMediaAccounts } from '../Components/redux/action/index';
import Loader from 'react-loader-spinner';
import {withRouter } from 'react-router-dom';


const SocialMedia = (props) =>
{
    const dispatch = useDispatch();
    const [ isLoadingCountries, setisLoadingCountries] = useState(false);
    const [ isLoadingState, setisLoadingState ] = useState(false);
    const [ IsSubmitting, setIsSubmiting ] =  useState(false);
    const countries = useSelector(state => state.places.countries);
    const states = useSelector(state => state.places.states);
    const nextphase = useSelector(state => state.root.nextphase);
    const IsFetching = useSelector(state => state.root.IsFetching);
    const { handleSubmit, register, errors } = useForm();
    const usersocialmedia = useSelector(state => state.root.userSocialMediaAccounts);

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
    const process = async () => {
        // if(userdetails == null)
        //    await dispatch(GetCompleteUserProfile());
    }

    const onSubmit = async (data,e) =>
    { 
        setIsSubmiting(true);
        await dispatch(SocialMediaAccounts(data, props, e));
        setIsSubmiting(false);
    }
    return(
       
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Social Media Account</h3>
                <div className="row" style={{marginTop:30}}>
                <div className="col-lg-12 col-sm-12 col-md-12">
                    <fieldset>
                        <input 
                            placeholder="Link to Facebook Profile" 
                            type="text" 
                            className="form-control"
                            tabindex="1" 
                            autofocus
                            name="facebook"
                            defaultValue = { (usersocialmedia != null && usersocialmedia.facebook) ? usersocialmedia.facebook : ''}
                            ref={register({
                                required: "Required"
                            })}
                        />
                        <small className="text-danger">{errors.facebook?.type == "required" && "Link to Facebook Account is required"}</small>
                    </fieldset>
                </div>
               
                </div>
                <div className="row" style={{marginTop:20}}>
                    <div className="col-lg-12 col-sm-12 col-md-12">
                    <fieldset>
                        <input 
                            placeholder="Link to LinkedIn Profile" 
                            type="text" 
                            className="form-control"
                            tabindex="1" 
                            autofocus
                            defaultValue = { (usersocialmedia != null && usersocialmedia.linkedin) ? usersocialmedia.linkedin : ''}
                            name="linkedin"
                            ref={register({
                                required: "Required"
                            })}
                        />
                        <small className="text-danger">{errors.linkedin?.type == "required" && "Link to LinkedIn Account is required"}</small>
                    </fieldset>
                    </div>
                </div>
                <div className="row" style={{marginTop:20}}>
                    <div className="col-lg-12 col-sm-12 col-md-12">
                    <fieldset>
                        <input 
                            placeholder="Link to Instagram Profile" 
                            type="text" 
                            className="form-control"
                            tabindex="1" 
                            autofocus
                            defaultValue = { (usersocialmedia != null && usersocialmedia.instagram) ? usersocialmedia.instagram : ''}
                            name="instagram"
                            ref={register({
                                required: "Required"
                            })}
                        />
                        <small className="text-danger">{errors.instagram?.type == "required" && "Link to instagram Account is required"}</small>
                    </fieldset>
                    </div>
                </div>
                <div className="row" style={{marginTop:20}}>
                    <div className="col-lg-12 col-sm-12 col-md-12">
                    <fieldset>
                        <input 
                            placeholder="Link to Twitter Profile" 
                            className="form-control"
                            type="text" 
                            tabindex="1" 
                            autofocus
                            defaultValue = { (usersocialmedia != null && usersocialmedia.twitter) ? usersocialmedia.twitter : ''}
                            name="twitter"
                            ref={register({
                                required: "Required"
                            })}
                        />
                        <small className="text-danger">{errors.twitter?.type == "required" && "Link to Twitter Account is required"}</small>
                    </fieldset>
                    </div>
                </div>
                <div className="row" style={{marginTop:30}}>
                    <div className="col-lg-6">

                    </div>
                    <div className="col-lg-3">
                    </div>
                    <div className="col-lg-3">
                    <button hidden={IsSubmitting} name="submit"  type="submit" className="btn btn-success" style={{backgroundColor:'rgb(255, 187, 56)', border:'none'}} id="" data-submit="...Sending">Save and Continue</button>
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
    );
}

export default withRouter(SocialMedia);