/* eslint no-undef: "off"*/
import React, { useState} from 'react';
import '../css/css/profile.css';
import { useForm } from "react-hook-form";


const SureRequest = (props) =>
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
                <h3>Sure Request  {props.totalSteps}</h3>
                <h4>Complete the Form Below</h4>
                <div className="row">
                    <div className="col">
                    <p style={{color:'#222222',fontSize:16,marginBottom:7}}>Request Amount </p> 
                    <fieldset>
                       <input
                        placeholder="Request Amount"
                        type="text" 
                        name="requestAmount"
                        tabindex="1" 
                        autofocus
                        ref={register({
                            required: "Required"
                          })}
                        />
                        <small className="text-danger">{errors.name?.type == "required" && "Name is required"}</small>
                    </fieldset>
                    </div>
            
                </div>

                <div className="row">
                    <div className="col">
                    <p style={{color:'#222222',fontSize:16,marginBottom:7}}> </p>    
                    <fieldset>
                       <select name="For How Long">
                          <option value="">How Long</option>
                      </select> 
                      <small className="text-danger">{errors.preferredRepayment?.type == "required" && "Minimum Request Amount is required"}</small>
                    </fieldset>
                    </div>
                    <div className="col">
                    <fieldset>
                     <select name="state" placeholder="">
                          <option value="">Max Interest Rate</option>
                      </select> 
                        <small className="text-danger">{errors.maxInterestperMonth?.type == "required" && "Maximum Request Amount is required"}</small>
                    </fieldset>
                    </div>
                </div>
               
                <div className="row">
                    <div className="col">
                    <fieldset>
                       <select name="country">
                          <option value="">Min Interest Rate</option>
                      </select> 
                      <small className="text-danger">{errors.preferredRepayment?.type == "required" && "Minimum Request Amount is required"}</small>
                    </fieldset>
                    </div>
                    <div className="col">
                    <fieldset>
                     <select name="state" placeholder="">
                          <option value="">Repayment</option>
                      </select> 
                        <small className="text-danger">{errors.maxInterestperMonth?.type == "required" && "Maximum Request Amount is required"}</small>
                    </fieldset>
                    </div>
                </div>
               

                <div className="row">
                   
                    <div className="col">
                        <fieldset>
                        <select name="state" placeholder="">
                            <option value="">Are you will to pay for Credit Bereau</option>
                        </select> 
                            <small className="text-danger">{errors.maxInterestperMonth?.type == "required" && "Maximum Request Amount is required"}</small>
                        </fieldset>
                    </div>
               
                </div>

    
                <div className="row">
                    <div className="col">
                    <fieldset>
                     <select name="state" placeholder="">
                          <option value="">Lender's Country</option>
                      </select> 
                        <small className="text-danger">{errors.maxInterestperMonth?.type == "required" && "Maximum Request Amount is required"}</small>
                    </fieldset>
                    </div>
                    <div className="col">
                        <fieldset>
                        <select name="state" placeholder="">
                            <option value="">Lender's City</option>
                        </select> 
                            <small className="text-danger">{errors.maxInterestperMonth?.type == "required" && "Maximum Request Amount is required"}</small>
                        </fieldset>
                    </div>
                </div>
               
                {
                    props.level == undefined || props.level == false &&
                    <fieldset>
                    <div className="row">
                        <div className="col-lg-6">
    
                        </div>
                        <div className="col-lg-3">
                          
                        </div>
                        <div className="col-lg-3">
                        <button name="submit"  type="submit" id="" data-submit="...Sending">Submit</button>
                        </div>
                    </div>    
                    
                    </fieldset>
                }
               
                {
                    props.level == true &&
                    <fieldset>
                    <div className="row" style={{marginTop:50}}>
                        <div className="col-lg-7">
    
                        </div>
                        <div className="col-lg-2">
                        <button name="submit"  className="connect" id="" data-submit="...Sending">Reject</button>
                        </div>
                        <div className="col-lg-3">
                        <button name="submit"  type="submit" id="" data-submit="...Sending">Accept</button>
                        </div>
                    </div>    
                    
                    </fieldset>
                }
               
               
            </form>
    
    );
}

export default SureRequest;