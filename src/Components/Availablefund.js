import React, { useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useForm } from 'react-hook-form';
import { Createvault_availablefund } from '../Components/redux/action/createvault';


const Availablefund = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const dispatch = useDispatch();
    const [ isLoadingCountries, setisLoadingCountries] = useState(false);
    const [ isLoadingState, setisLoadingState ] = useState(false);
    const countries = useSelector(state => state.places.countries);
    const states = useSelector(state => state.places.states);
    const IsFetching = useSelector(state => state.root.IsFetching);
    const onSubmit = async (data, e) => {
        await dispatch(Createvault_availablefund(data));
        props.nextStep();
        //e.target.reset();
    }
    return (
        <div className="profilecontainer"> 
              <div id="contact">
              <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Create Vault</h3>
                <span>Complete the Information Below</span>
                <div className="row" style={{marginTop:20,marginBottom:20}}>
                    <div className="col-lg-12 col-sm-12 col-md-12">
                    <p style={{color:'#777777',fontSize:16,marginBottom:7}}>Fund Available </p>    
                    <fieldset>
                        
                       <input
                        type="number" 
                        name="fundamount"
                        min="0"
                        tabindex="1" 
                        autofocus
                        ref={register({
                            required: "Required"
                          })}
                        />
                        <small className="text-danger">{errors.fundamount?.type == "required" && "Fund Amount is required"}</small>
                    </fieldset>
                    </div>
                
                </div>
                <div className="row" style={{marginBottom:20}}>
                    <div className="col-lg-6 col-sm-12 col-md-3">
                        <p style={{color:'#777777',fontSize:16,marginBottom:7}}>Fund Available From </p> 
                        <fieldset>
                       
                        <input 
                            type="date" 
                            tabindex="1" 
                            autofocus
                            name="availablefrom"
                            ref={register({
                                required: "Required"
                            })}
                        />
                        <small className="text-danger">{errors.availablefrom?.type == "required" && "Fund Available From is required"}</small>
                        </fieldset>
                    </div>
                    <div className="col-lg-6 col-sm-12 col-md-3">
                    <fieldset>
                       <p style={{color:'#777777',fontSize:16,marginBottom:7}}>Fund Available From </p>  
                       <input 
                            type="date" 
                            tabindex="1" 
                            autofocus
                            name="availableto"
                            ref={register({
                                required: "Required"
                            })}
                        />
                        <small className="text-danger">{errors.availableto?.type == "required" && "Fund Available To is required"}</small>
                    
                    </fieldset>
                    </div>
                </div>

                <fieldset>
                <div className="row" style={{marginTop:30}}>
                    <div className="col-lg-6">

                    </div>
                    <div className="col-lg-3">
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

export default Availablefund;