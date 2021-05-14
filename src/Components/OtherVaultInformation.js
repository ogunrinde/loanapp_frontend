import React, {useState, useEffect } from 'react';
import '../css/css/profile.css';
import '../css/css/checkbox.css';
import {useSelector, useDispatch} from 'react-redux';
import {useForm } from 'react-hook-form';
import { Createvault_others } from '../Components/redux/action/createvault';
import { places, countrystates, MakeAvailable } from '../Components/redux/action/index';


const OtherVaultInformation = (props) => {

    const { handleSubmit, register, errors } = useForm();
    const dispatch = useDispatch();
    const [ isLoadingCountries, setisLoadingCountries] = useState(false);
    const [ isLoadingState, setisLoadingState ] = useState(false);
    const countries = useSelector(state => state.places.countries);
    const states = useSelector(state => state.places.states);
    const onSubmit = async (data, e) => {
        await dispatch(Createvault_others(data));
        await dispatch(MakeAvailable());
        //props.nextStep();
        //e.target.reset();
    }
    return (
    <div className="profilecontainer"> 
    <div id="contact">
    <form onSubmit={handleSubmit(onSubmit)}>
     <h3>Sure Vault</h3>
      <div className="row" style={{marginTop:10}}>
        <div className="col-lg-3 col-sm-12 col-md-4">
        <label class="cont" style={{color:'#777777', fontSize:14}}>Email Must be Verified
            <input type="checkbox" 
                    name = "email_must_be_verified"
                    ref={register()}
            />
            <span class="checkmark"></span>
        </label>
        </div>
        <div className="col-lg-3 col-sm-12 col-md-4">
        <label class="cont" style={{color:'#777777',fontSize:14}}>Phone Number Must be Verified
            <input type="checkbox" 
                    name = "phonenumber_must_be_verified"
                    ref={register()}
            />
            <span class="checkmark"></span>
        </label>
        </div>
        <div className="col-lg-3 col-sm-12 col-md-4">
        <label class="cont"  style={{color:'#777777',fontSize:14}}>BVN must be Verified
            <input type="checkbox" 
                    name = "bvn_must_be_verified"
                    ref={register()}
            />
            <span class="checkmark"></span>
        </label>
        </div>
        <div className="col-lg-3 col-sm-12 col-md-4">
        <label class="cont"  style={{color:'#777777',fontSize:14}}>CreditBureau Report Required
            <input type="checkbox" 
                    name = "bvn_must_be_verified"
                    ref={register()}
            />
            <span class="checkmark"></span>
        </label>
        </div>
     
      </div>
               
      <fieldset>
      <div className="row" style={{marginTop:30}}>
          <div className="col-lg-6">

          </div>
          <div className="col-lg-3">
          <button style={{cursor: 'pointer',width: '100%',border: 'none',backgroundColor: '#ffbb38',color: '#FFF',margin: '0 0 5px',padding: '10px',fontSize: '15px'}} onClick ={props.previousStep} id="" data-submit="...Sending">Previous</button>
          </div>
          <div className="col-lg-3">
          <button name="submit"  type="submit" id="" data-submit="...Sending">Submit</button>
          </div>
      </div>    
      
      </fieldset>
     
     </form>
    </div>
  </div>
    );
}
export default OtherVaultInformation;