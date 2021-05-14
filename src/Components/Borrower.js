import React, {useState, useEffect } from 'react';
import '../css/css/profile.css';
import '../css/css/checkbox.css';
import {useSelector, useDispatch} from 'react-redux';
import {useForm } from 'react-hook-form';
import { Createvault_borrower } from '../Components/redux/action/createvault';
import { places, countrystates, MakeAvailable, Getcities} from '../Components/redux/action/index';
import Loader from 'react-loader-spinner';


const Borrower = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const dispatch = useDispatch();
    const [ isLoadingCountries, setisLoadingCountries] = useState(false);
    const [ isLoadingState, setisLoadingState ] = useState(false);
    const [ isLoadingCities, setisLoadingCities ] = useState(false);
    const countries = useSelector(state => state.places.countries);
    const states = useSelector(state => state.places.states);
    const IsFetching = useSelector(state => state.root.IsFetching);
    const cities = useSelector(state => state.root.cities);
    const vaultcreated = useSelector(state => state.root.vaultcreated);

    useEffect(() =>{
        
    },[])

    const onSubmit = async (data, e) => {
        //alert(JSON.stringify(data));
        await dispatch(Createvault_borrower(data));
        await dispatch(MakeAvailable(props));
        //if(vaultcreated == true) window.location.reload();
        //alert(vaultcreated);
        //props.nextStep();
        //e.target.reset();
    }

    const handleChange = (event) => {
        setisLoadingState(true);
        dispatch(countrystates(event.target.value));
        setisLoadingState(false);
    }

    const handleState = (event) => {
        //alert(event.target.value);
        setisLoadingCities(true);
        dispatch(Getcities(event.target.value));
        setisLoadingCities(false);
        //handleInput(event);
    }


    return(
    <div className="profilecontainer"> 
    <div id="contact">
    <form onSubmit={handleSubmit(onSubmit)}>
    <h3>Preferred Borrower's Profile</h3>
        <span>Complete the Information Below</span>
        <div className="row" style={{marginTop:20,marginBottom:10}}>
        <div className="col-lg-12 col-sm-12 col-md-12">
        <label style={{color:'#777777',fontSize:14,marginBottom:7}}>Borrower's Country</label>    
        <fieldset>
        <select 
                name="borrower_country_id"
                onChange = {(text) => handleChange(text)}
                style={{color:'#777777'}}    
                ref={register({
                    required: "Required",
                })}    
            >
            <option value=""></option>
            <option value ="">Select your Country</option>
                {
                    countries.map((country) =>
                    <option value ={country.id}>{ country.name }</option>
                )}
        </select> 
        <small className="text-danger">{errors.borrower_country_id?.type == "required" && "Country is required"}</small>
        </fieldset>
        </div>
        <div className="col-lg-12 col-sm-12 col-md-12">
        <label style={{color:'#777777',fontSize:16,marginBottom:7}}>Borrower's State</label>        
        <fieldset>
        <select 
            name="borrower_state_id" 
            onChange = {(text) => handleState(text)}
            placeholder=""
            style={{color:'#777777'}}    
                ref={register({
                    required: "Required",
                })}
        >
            <option value=""></option>
            <option value ="">Select your State</option>
                {
                    states.map((state) =>
                    <option value ={state.id}>{ state.name }</option>
                )}
        </select> 
            <small className="text-danger">{errors.borrower_state_id?.type == "required" && "State is required"}</small>
        </fieldset>
        </div>
        <div className="col-lg-12 col-sm-12 col-md-12">
        <label style={{color:'#777777',fontSize:14,marginBottom:7}}>Borrower's City</label>        
        <fieldset>
        <select 
            name="borrower_city_id" 
            placeholder=""
            style={{color:'#777777'}}    
                ref={register({
                    required: "Required",
                })}
        >
            <option value=""></option>
            <option value ="">Select City</option>
                {
                    cities.map((city) =>
                    <option value ={city.id}>{ city.name }</option>
                )}
        </select> 
            <small className="text-danger">{errors.borrower_city_id?.type == "required" && "City is required"}</small>
        </fieldset>
        </div>
     
      </div>
      <div className="row" style={{marginTop:20}}>
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
                    name = "creditbureau_report_required"
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
          <button name="submit" hidden ={IsFetching}  type="submit" id="" data-submit="...Sending">Submit</button>
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
    </div>
  </div>
    );
}

export default Borrower;