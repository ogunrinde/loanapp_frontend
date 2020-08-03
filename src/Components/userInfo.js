/* eslint no-undef: "off"*/
import React, { useState} from 'react';
import '../css/css/profile.css';
import { useForm } from "react-hook-form";


const UserInfo = (props) =>
{
    const { handleSubmit, register, errors } = useForm();
    const onSubmit = values => console.log(values);

    function form(event,val) 
    {
        event.preventDefault();
        //props.nextStep();
         alert(val);
    }
    return(
       
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Basic Information  {props.totalSteps}</h3>
                <h4>Contact us for custom quote</h4>
                <div className="row">
                    <div className="col">
                    <fieldset>
                       <label>Surname</label> 
                       <input
                        placeholder="Surname"
                        type="text" 
                        name="name"
                        tabindex="1" 
                        autofocus
                        ref={register({
                            required: "Required",
                            minLength:3
                          })}
                        />
                        <small className="text-danger">{errors.name?.type == "required" && "Name is required"}</small>
                        <small className="text-danger">{errors.name?.type == "minLength" && "Minimum of 5 Character is required"}</small>
                    </fieldset>
                    </div>
                    <div className="col">
                        <fieldset>
                        <label>First Name</label>     
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
                    <div className="col">
                    <fieldset>
                    <label>Middle Name</label>  
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
                    <div className="col">
                        <label>Date of Birth</label> 
                        <fieldset>
                        <input 
                            placeholder="Date of Birth" 
                            type="date" 
                            tabindex="1"
                            autofocus
                            name="dob"
                            ref={register({
                                required: "Required"
                            })}
                        />
                        <small className="text-danger">{errors.dob?.type == "required" && "Date of Birth is required"}</small>
                    
                        </fieldset>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                    <fieldset>
                       <label>Phone Number</label>  
                       <input 
                            placeholder="Phone Number" 
                            type="number" 
                            tabindex="1" 
                            autofocus
                            name="pNumber1"
                            ref={register({
                                required: "Required",
                                minLength:11,
                                maxLength:11
                            })}
                        />
                        <small className="text-danger">{errors.pNumber1?.type == "required" && "Phone Number is required"}</small>
                        <small className="text-danger">{errors.pNumber1?.type == "minLength" && "Max of 11 Character is required"}</small>
                    </fieldset>
                    </div>
                    <div className="col">
                        <fieldset>
                        <label>Phone Number 2</label> 
                        <input 
                            placeholder="Phone Number 2" 
                            type="number" 
                            tabindex="1" 
                            autofocus
                            name="pNumber2"
                            
                        />
                        </fieldset>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                    <fieldset>
                       <label>Country</label>  
                       <input placeholder="Country" type="text" tabindex="1" autofocus/>
                    </fieldset>
                    </div>
                    <div className="col">
                        <fieldset>
                        <label>State</label>     
                        <input placeholder="State" type="text" tabindex="1" autofocus/>
                        </fieldset>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                    <fieldset>
                       <label>Country</label>  
                       <input placeholder="Country" type="text" tabindex="1" autofocus/>
                    </fieldset>
                    </div>
                    <div className="col">
                        <fieldset>
                        <label>State</label>     
                        <input placeholder="State" type="text" tabindex="1" autofocus/>
                        </fieldset>
                    </div>
                </div>
               
                
                <fieldset>
                <div className="row">
                    <div className="col-lg-6">

                    </div>
                    <div className="col-lg-3">
                      <button name="submit" type="submit" style={{backgroundColor:'#ffbb38;'}} id="" data-submit="...Sending">Previous</button>
                    </div>
                    <div className="col-lg-3">
                    <button name="submit"  type="submit" id="" data-submit="...Sending">Next</button>
                    </div>
                </div>    
                
                </fieldset>
               
            </form>
    );
}

export default UserInfo;