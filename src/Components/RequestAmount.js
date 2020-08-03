import React, { useEffect, useState } from "react";
import '../css/css/profile.css';
import '../css/css/checkbox.css';
import {useSelector, useDispatch} from 'react-redux';
import {useForm } from 'react-hook-form';
import { Createvault_requestamount } from '../Components/redux/action/createvault';


const RequestAmount = (props) => {

    const { handleSubmit, register, errors } = useForm();
    const dispatch = useDispatch();
    const [ isLoadingCountries, setisLoadingCountries] = useState(false);
    const [ isLoadingState, setisLoadingState ] = useState(false);
    const countries = useSelector(state => state.places.countries);
    const states = useSelector(state => state.places.states);
    const IsFetching = useSelector(state => state.root.IsFetching);
    const onSubmit = async (data, e) => {
        await dispatch(Createvault_requestamount(data));
        //e.target.reset();
        props.nextStep();
    }
    return (
        <div className="profilecontainer"> 
              <div id="contact">
              <form onSubmit={handleSubmit(onSubmit)}>
              <h3>Create Vault</h3>
                <span>Complete the Information Below</span>
                <div className="row" style={{marginTop:20,marginBottom:20}}>
                    <div className="col-lg-12 col-sm-12 col-md-12">
                    <p style={{color:'#777777',fontSize:16,marginBottom:7}}>Maximum Request Amount</p>    
                    <fieldset>
                       <input 
                            type="number" 
                            tabindex="1" 
                            autofocus
                            name="maxRequestAmount"
                            ref={register({
                                required: "Required"
                            })}
                        />
                        <small className="text-danger">{errors.maxRequestAmount?.type == "required" && "Maximum Request Amount is required"}</small>
                    </fieldset>
                    </div>
                    <div className="col-lg-12 col-sm-12 col-md-12">
                        <p style={{color:'#777777',fontSize:16,marginBottom:7}}>Minimum Request Amount</p>  
                        <fieldset>    
                        <input 
                            type="number" 
                            tabindex="1" 
                            autofocus
                            name="minRequestAmount"
                            ref={register({
                                required: "Required"
                            })}
                            
                        />
                        <small className="text-danger">{errors.minRequestAmount?.type == "required" && "Minimum Request Amount is required"}</small>
                        </fieldset>
                    </div>
                </div>
                <fieldset>
                <div className="row" style={{marginTop:30}}>
                    <div className="col-lg-6">

                    </div>
                    <div className="col-lg-3">
                    <button style={{cursor: 'pointer',width: '100%',border: 'none',backgroundColor: '#ffbb38',color: '#FFF',margin: '0 0 5px',padding: '10px',fontSize: '15px'}} onClick ={props.previousStep} id="">Previous</button>
                    </div>
                    <div className="col-lg-3">
                    <button name="submit"  type="submit" id="" data-submit="...Sending">Next</button>
                    </div>
                </div>    
                
                </fieldset>
               
               </form>
              </div>
            </div>
    );

}

export default RequestAmount;