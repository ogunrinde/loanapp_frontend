/* eslint no-undef: "off"*/
import React, { useState, useEffect} from 'react';
import '../css/css/profile.css';
import { useForm } from "react-hook-form";
import { places, countrystates } from '../Components/redux/action/index';
import { useSelector, useDispatch } from 'react-redux'; 
import { userbasicInfo } from '../Components/redux/action/index';
import Loader from 'react-loader-spinner';


const BasicInfo = (props) =>
{
    const dispatch = useDispatch();
    const [ isLoadingCountries, setisLoadingCountries] = useState(false);
    const [ isLoadingState, setisLoadingState ] = useState(false);
    const countries = useSelector(state => state.places.countries);
    const states = useSelector(state => state.places.states);
    const IsFetching = useSelector(state => state.root.IsFetching);
    const { handleSubmit, register, errors } = useForm();

    useEffect(() =>{
        //setisLoadingCountries(true);
        dispatch(places());
        //setisLoadingCountries(false);
    },[]);

    const handleChange = (event) => {
        setisLoadingState(true);
        dispatch(countrystates(event.target.value));
        setisLoadingState(false);
    }

    const onSubmit = async (data) =>
    {
        //console.log(data);
        await dispatch(userbasicInfo(data,props));
        props.nextStep();
    }
    return(
       
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Basic Information </h3>
                <div className="row" style={{marginTop:15}}>
                    <div className="col-lg-6 col-sm-12 col-md-6">   
                    <fieldset>
                       <input
                        placeholder="Surname"
                        type="text" 
                        name="surname"
                        tabindex="1" 
                        autofocus
                        ref={register({
                            required: "Required",
                            minLength:3
                          })}
                        />
                        <small className="text-danger">{errors.surname?.type == "required" && "Surname is required"}</small>
                        <small className="text-danger">{errors.surname?.type == "minLength" && "Minimum of 5 Character is required"}</small>
                    </fieldset>
                    </div>
                    <div className="col-lg-6 col-sm-12 col-md-6">
                        <fieldset>
                        <input 
                            placeholder="FirstName" 
                            type="text" 
                            tabindex="1" 
                            autofocus
                            name="firstname"
                            ref={register({
                                required: "Required",
                                minLength:3
                            })}
                        />
                        <small className="text-danger">{errors.firstname?.type == "required" && "First Name is required"}</small>
                        <small className="text-danger">{errors.firstname?.type == "minLength" && "Minimum of 5 Character is required"}</small>
                        </fieldset>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6 col-sm-12 col-md-6">
                    <fieldset>
                       <input 
                            placeholder = "Middle Name" 
                            type="text" 
                            tabindex="1" 
                            autofocus
                            name="middlename"
                            ref={register({
                                required: "Required",
                                minLength:3
                            })}
                        />
                        <small className="text-danger">{errors.middlename?.type == "required" && "Middle Name is required"}</small>
                        <small className="text-danger">{errors.middlename?.type == "minLength" && "Minimum of 5 Character is required"}</small>
                    
                    </fieldset>
                    </div>
                    <div className="col-lg-6 col-sm-12 col-md-6">
                        <fieldset>
                        <input 
                            placeholder="Date of Birth" 
                            type="date" 
                            tabindex="1"
                            autofocus
                            name="date_of_birth"
                            ref={register({
                                required: "Required"
                            })}
                        />
                        <small className="text-danger">{errors.date_of_birth?.type == "required" && "Date of Birth is required"}</small>
                    
                        </fieldset>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6 col-sm-12 col-md-6">
                    <fieldset>
                       <input 
                            placeholder="Phone Number" 
                            type="number" 
                            tabindex="1" 
                            autofocus
                            name="mobile1"
                            ref={register({
                                required: "Required",
                                minLength:11,
                                maxLength:11
                            })}
                        />
                        <small className="text-danger">{errors.mobile1?.type == "required" && "Phone Number is required"}</small>
                        <small className="text-danger">{errors.mobile1?.type == "minLength" && "Max of 11 Character is required"}</small>
                    </fieldset>
                    </div>
                    <div className="col-lg-6 col-sm-12 col-md-6">
                        <fieldset>
                        <input 
                            placeholder="Phone Number 2" 
                            type="number" 
                            tabindex="1" 
                            autofocus
                            name="mobile2"
                            
                        />
                        </fieldset>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-lg-6 col-sm-12 col-md-6">
                    <fieldset>
                        <input 
                            placeholder="Email Address" 
                            type="email" 
                            tabindex="1" 
                            autofocus
                            name="email"
                            style={{color:'#777777'}}
                            ref={register({
                                required: "Required",
                            })}
                        />
                    </fieldset>
                    <small className="text-danger">{errors.email?.type == "required" && "Email is required"}</small>
                    </div>
                    <div className="col-lg-6 col-sm-12 col-md-6">
                        <fieldset>
                        <select 
                            name="gender"
                            style={{color:'#777777'}}    
                            ref={register({
                                required: "Required",
                            })}
                        >
                        <option value ="">Gender</option>
                        <option value ="Male">Male</option>   
                        <option value ="Female">Female</option> 
                    </select> 
                    <small className="text-danger">{errors.gender?.type == "required" && "Gender is required"}</small>
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
                    <button hidden={IsFetching} name="submit"  type="submit" id="" data-submit="...Sending">Save and Continue</button>
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

export default BasicInfo;