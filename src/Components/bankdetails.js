/* eslint no-undef: "off"*/
import React, { useState, useEffect} from 'react';
import '../css/css/profile.css';
import { useForm } from "react-hook-form";
import { places, countrystates, GetBanks } from '../Components/redux/action/index';
import { useSelector, useDispatch } from 'react-redux'; 
import { BankInformation } from '../Components/redux/action/index';
import Loader from 'react-loader-spinner';
import {withRouter} from 'react-router-dom';


const BankDetails = (props) =>
{
    const dispatch = useDispatch();
    const [ isLoadingCountries, setisLoadingCountries] = useState(false);
    const [ isLoadingState, setisLoadingState ] = useState(false);
    const [ IsSubmitting, setIsSubmitting ] = useState(false);
    const countries = useSelector(state => state.places.countries);
    const states = useSelector(state => state.places.states);
    const nextphase = useSelector(state => state.root.nextphase);
    const IsFetching = useSelector(state => state.root.IsFetching);
    const { handleSubmit, register, errors } = useForm();
    const banks = useSelector(state => state.root.banks);
    const bankdetail = useSelector(state => state.root.userBankInformation);
    const usersocialmedia = useSelector(state => state.root.userSocialMediaAccounts);

    useEffect(() =>{
        dispatch(GetBanks());
        //alert(JSON.stringify(usersocialmedia));
    },[]);

    const process = async () => {
        // if(userdetails == null)
        //    await dispatch(GetCompleteUserProfile());
    }

    const onSubmit = async (data) =>
    { 
        setIsSubmitting(true);
        await dispatch(BankInformation(data,props));
        setIsSubmitting(false);
        //props.nextStep();
    }
    return(
       
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Bank Account Information</h3>
                <div className="row" style={{marginTop:20}}>
                <div className="col-lg-12 col-sm-12 col-md-12">
                    <fieldset>
                        <input 
                            placeholder="BVN Number" 
                            className="form-control"
                            type="text" 
                            tabindex="1" 
                            autofocus
                            name="bvn"
                            defaultValue = { (bankdetail != null && bankdetail.bvn) ? bankdetail.bvn : ''}
                            ref={register({
                                required: "Required"
                            })}
                        />
                        <small className="text-danger">{errors.bvn?.type == "required" && "BVN number is required"}</small>
                    </fieldset>
                </div>
               
                </div>
                <div className="row" style={{marginTop:20}}>
                    <div className="col-lg-12 col-sm-12 col-md-12">
                    <fieldset>
                        <select 
                            className="form-control"
                            name="bankname"
                            ref={register({
                                required: "Required"
                            })}
                        >
                            <option value={(bankdetail != null && bankdetail.id) ? bankdetail.bankname : ''}>{ (bankdetail != null && bankdetail.id) ? bankdetail.bankname : 'Bank Name'}</option>
                            {
                                banks != null && banks.map((bank) =>
                                <option value={bank.bankname}>{bank.bankname}</option>
                                )
                            }
                        </select>
                        
                        <small className="text-danger">{errors.bankname?.type == "required" && "Bank Name is required"}</small>
                    </fieldset>
                    </div>
                </div>
                <div className="row" style={{marginTop:30}}>
                    <div className="col-lg-12 col-sm-12 col-md-12">
                    <fieldset>
                        <input 
                            className="form-control"
                            placeholder="Account Number" 
                            type="number" 
                            tabindex="1" 
                            autofocus
                            defaultValue = {bankdetail != null ? bankdetail.accountnumber : ''}
                            name="accountnumber"
                            ref={register({
                                required: "Required"
                            })}
                        />
                        <small className="text-danger">{errors.accountnumber?.type == "required" && "Account Number is required"}</small>
                    </fieldset>
                    </div>
                </div>
        
                <div className="row" style={{marginTop:30}}> 
                    <div className="col-lg-6">

                    </div>
                    <div className="col-lg-3">
                    </div>
                    <div className="col-lg-3">
                    <button hidden={IsSubmitting} name="submit"  type="submit" className="btn btn-success" style={{backgroundColor:'rgb(255, 187, 56)',width:150, border:'none'}} id="" data-submit="...Sending">Submit</button>
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

export default withRouter(BankDetails);