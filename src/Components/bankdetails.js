/* eslint no-undef: "off"*/
import React, { useState, useEffect} from 'react';
import '../css/css/profile.css';
import { useForm } from "react-hook-form";
import { places, countrystates } from '../Components/redux/action/index';
import { useSelector, useDispatch } from 'react-redux'; 
import { BankInformation } from '../Components/redux/action/index';
import Loader from 'react-loader-spinner';


const BankDetails = (props) =>
{
    const dispatch = useDispatch();
    const [ isLoadingCountries, setisLoadingCountries] = useState(false);
    const [ isLoadingState, setisLoadingState ] = useState(false);
    const countries = useSelector(state => state.places.countries);
    const states = useSelector(state => state.places.states);
    const nextphase = useSelector(state => state.root.nextphase);
    const IsFetching = useSelector(state => state.root.IsFetching);
    const { handleSubmit, register, errors } = useForm();

    useEffect(() =>{

    },[nextphase]);

    const onSubmit = async (data) =>
    { 
        await dispatch(BankInformation(data));
        props.nextStep();
    }
    return(
       
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Bank Account Information</h3>
                <div className="row">
                <div className="col-lg-12 col-sm-12 col-md-12">
                    <fieldset>
                        <input 
                            placeholder="BVN Number" 
                            type="text" 
                            tabindex="1" 
                            autofocus
                            name="bvn"
                            ref={register({
                                required: "Required"
                            })}
                        />
                        <small className="text-danger">{errors.bvn?.type == "required" && "BVN number is required"}</small>
                    </fieldset>
                </div>
               
                </div>
                <div className="row">
                    <div className="col-lg-12 col-sm-12 col-md-12">
                    <fieldset>
                        <input 
                            placeholder="Bank Name" 
                            type="text" 
                            tabindex="1" 
                            autofocus
                            name="bankname"
                            ref={register({
                                required: "Required"
                            })}
                        />
                        <small className="text-danger">{errors.bankname?.type == "required" && "Bank Name is required"}</small>
                    </fieldset>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-sm-12 col-md-12">
                    <fieldset>
                        <input 
                            placeholder="Account Number" 
                            type="number" 
                            tabindex="1" 
                            autofocus
                            name="accountnumber"
                            ref={register({
                                required: "Required"
                            })}
                        />
                        <small className="text-danger">{errors.accountnumber?.type == "required" && "Account Number is required"}</small>
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

export default BankDetails;