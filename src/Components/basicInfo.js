/* eslint no-undef: "off"*/
import React, { useState, useEffect} from 'react';
import '../css/css/profile.css';
import { useForm } from "react-hook-form";
import { places, countrystates } from '../Components/redux/action/index';
import { useSelector, useDispatch } from 'react-redux'; 
import { userbasicInfo, countrycodes } from '../Components/redux/action/index';
import Loader from 'react-loader-spinner';


const BasicInfo = (props) =>
{
    const dispatch = useDispatch();
    const [ isLoadingCountries, setisLoadingCountries] = useState(false);
    const [ isLoadingState, setisLoadingState ] = useState(false);
    const countries = useSelector(state => state.places.countries);
    const states = useSelector(state => state.places.states);
    const IsFetching = useSelector(state => state.root.IsFetching);
    const codes = useSelector(state => state.root.codes);
    const { handleSubmit, register, errors } = useForm();

    useEffect(() =>{
        setisLoadingCountries(true);
        dispatch(places());
        dispatch(countrycodes());
        setisLoadingCountries(false);
    },[]);

    const handleChange = (event) => {
        setisLoadingState(true);
        dispatch(countrystates(event.target.value));
        setisLoadingState(false);
    }

    const onSubmit = async (data) =>
    {
        //console.log(data);
        data.mobile1 = `${data.mobile1code}${data.mobile1}`;
        data.mobile2 = `${data.mobile2code}${data.mobile2}`;
        //alert(JSON.stringify(data));
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
                    <div className="row no-gutters">
                        <div className="col-lg-5 col-sm-5 col-md-5">
                            <select 
                            name="mobile1code"
                            style={{height:45, color:'#777777'}}
                            ref={register({
                                required: "Required",
                            })}
                            >
                            <option value="">Phone Code</option>
                            {
                                codes != null &&
                                codes.map((code) => 
                                    <option value={code.code}>{code.name}</option>
                                )
                            }
                            
                            </select> 
                            <small className="text-danger">{errors.mobile1code?.type == "required" && "Phone Number Code is required"}</small><br/>

                        </div>
                        <div className="col-lg-1 col-sm-1 col-md-1"></div>
                        <div className="col-lg-6 col-sm-6 col-md-6">
                        <input 
                            placeholder="Phone Number" 
                            type="number" 
                            tabindex="1" 
                            autofocus
                            name="mobile1"
                            ref={register({
                                required: "Required",
                                min:100,
                                max:99999999999999
                            })}
                        />
                        <small className="text-danger">{errors.mobile1?.type == "required" && "Phone Number is required"}</small>
                        <small className="text-danger">{(errors.mobile1?.type == "min" || errors.mobile1?.type == "max") && "Invalid Phone Number"}</small>
                        </div>
                    </div>  
                            
                    </fieldset>
                    </div>
                    <div className="col-lg-6 col-sm-12 col-md-6">
                        <fieldset>
                          <div className="row no-gutters">
                               <div className="col-lg-5 col-sm-5 col-md-5">
                                 <select 
                                    name="mobile2code"
                                    style={{height:45,color:'#777777'}}
                                    ref={register({
                                        required: "Required",
                                    })}
                                 >
                                 <option value="">Phone Code</option>   
                                    {
                                        codes != null &&
                                        codes.map((code) => 
                                            <option value={code.code}>{code.name}</option>
                                        )
                                    }
                                    
                                 </select> 
                                 <small className="text-danger">{errors.mobile2code?.type == "required" && "Phone Code is Required"}</small><br/>

                               </div>
                               <div className="col-lg-1 col-sm-1 col-md-1"></div>
                               <div className="col-lg-6 col-sm-6 col-md-6">
                               <input 
                                    placeholder="Phone Number 2" 
                                    type="number" 
                                    tabindex="1" 
                                    autofocus
                                    name="mobile2"
                                    ref={register({
                                        required: "Required",
                                        min:100,
                                        max:99999999999999
                                    })}
                                />
                                 <small className="text-danger">{errors.mobile2?.type == "required" && "Phone Number is required"}</small>
                                 <small className="text-danger">{(errors.mobile2?.type == "min" || errors.mobile2?.type == "max") && "Invalid Phone Number"}</small>
                               </div>
                          </div>  
                           
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
                            style={{color:'#777777',height:45}}    
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