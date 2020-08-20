import React, {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import Header from './Header';
import '../css/css/profile.css';
import Footer from './Footer';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import {  useSelector, useDispatch } from 'react-redux';
import { places, countrystates, SendRequest, GetAllLenderOffers, Getcities } from '../Components/redux/action/index';
import { withRouter } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import Loader from 'react-loader-spinner';


const MakeRequest = (props) => 
{
    const dispatch = useDispatch();
    const [ isLoadingCountries, setisLoadingCountries] = useState(false);
    const [ isLoadingState, setisLoadingState ] = useState(false);
    const countries = useSelector(state => state.places.countries);
    const userdetails = useSelector(state => state.root.userbasicdetails);
    const userhomeaddress = useSelector(state => state.root.userHomeAddress);
    const userofficeaddress = useSelector(state => state.root.userOfficeAddress);
    const usersocialmedia = useSelector(state => state.root.userSocialMediaAccounts);
    const bankdetail = useSelector(state => state.root.userBankInformation);
    const states = useSelector(state => state.places.states);
    const IsFetching = useSelector(state => state.root.IsFetching);
    const all_lender_offers = useSelector(state => state.root.all_lender_offers);
    const [requestamount, setrequestamount ] = useState(0);
    const [minInterest, setminInterest ] = useState(0);
    const [maxInterest, setmaxInterest ] = useState(0);
    const [isgettinglist, setisgettinglist] = useState(false);
    const [meetrequirement, setmeetrequirement] = useState([]);
    const [isLoadingCities, setisLoadingCities] = useState(false);
    const cities = useSelector(state => state.root.cities);
    
    const { handleSubmit, register, errors } = useForm();
    

    useEffect(() =>{
        process();
        getalloffers();
        //days('2020-08-14','2020-08-31');
    },[]);

    const days = (from,to) => {
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        let fromyear = from.split('-')[0];
        let frommonth = from.split('-')[1];
        let fromday = from.split('-')[2];

        let toyear = to.split('-')[0];
        let tomonth = to.split('-')[1];
        let today = to.split('-')[2];
        const firstDate = new Date(fromyear, frommonth, fromday);
        const secondDate = new Date(toyear, tomonth, today);

        const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
        //alert(diffDays);
        return diffDays;
    }



    process = async () => {
        setisLoadingCountries(true);
        await dispatch(places());
        setisLoadingCountries(false);
    }

    const getalloffers = () => {
        setisgettinglist(true);
        dispatch(GetAllLenderOffers());
        setisgettinglist(false);
    }

    const onSubmit = async (data) =>
    { 
        //alert(JSON.stringify(data));
        await dispatch(SendRequest(data,props,meetrequirement));
        
    }

    const handleChange = (event) => {
        setisLoadingState(true);
        dispatch(countrystates(event.target.value));
        setisLoadingState(false);
        handleInput(event);
    }

    const handleState = (event) => {
        //alert(event.target.value);
        setisLoadingCities(true);
        dispatch(Getcities(event.target.value));
        setisLoadingCities(false);
        handleInput(event);
    }

    const handleInput = async (event) => {
        if(event.target.value == '') return false;
        //let requirement = [];
        let requirement = meetrequirement.length == 0 ? all_lender_offers : meetrequirement;
        if(event.target.name == 'requestAmount')
        {
            //alert(event.target.value);
            requirement = requirement.filter(function (offer) {
                return parseFloat(event.target.value) >= parseFloat(offer.minRequestAmount) &&
                       parseFloat(event.target.value) <= parseFloat(offer.maxRequestAmount)
            });
        } 
        if(event.target.name == 'maxInterestRate')
        {
            requirement = requirement.filter(function (offer) {
                return parseFloat(offer.minInterestperMonth) <= parseFloat(event.target.value)
            });
        }
        if(event.target.name == 'loanperiod')
        {
            requirement = requirement.filter(function (offer) {
                let offerdays = days(offer.availablefrom,offer.availableto);
                let loandays = parseFloat(event.target.value) * 30;
                return offerdays >= loandays
            });
        }
        // if(event.target.name == 'minInterestRate')
        // {
        //     requirement = requirement.filter(function (offer) {
        //         return parseFloat(offer.minInterestperMonth) >= parseFloat(event.target.value)
        //     });
        // }
        if(event.target.name == 'lender_country_id')
        {
            requirement = requirement.filter(function (offer) {
                return parseFloat(offer.borrower_country_id) == parseFloat(event.target.value)
            });
        }
        if(event.target.name == 'lender_state_id')
        {
            requirement = requirement.filter(function (offer) {
                return parseFloat(offer.borrower_state_id) == parseFloat(event.target.value)
            });
        }
        if(event.target.name == 'lender_city_id')
        {
            requirement = requirement.filter(function (offer) {
                return parseFloat(offer.borrower_city_id) == parseFloat(event.target.value)
            });
        }
        setmeetrequirement(requirement);    
    }

    

    return(
        <div>
            <ReactNotification />
            <section class="breadcrumb-area bg-img bg-overlay jarallax" style={{backgroundImage: `url('../../img/bg-img/13.jpg')`}}>
                <div class="container h-100">
                    <div class="row h-100 align-items-center">
                        <div class="col-12">
                            <div class="breadcrumb-content">
                                <h2>Request for a Loan</h2>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section style={{backgroundColor:'#f1f7f9',padding:20,paddingBottom:40}}>
            <div className="profilecontainer"> 
              <div id="contact"> 
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className ="col-lg-7 col-sm-12 col-md-7">
                       <h3>Sure Request  {props.totalSteps}</h3>
                       <h4>Complete the Form Below</h4>
                    </div>
                    <div className ="col-lg-5 col-sm-12 col-md-5">
                       <div style={{textAlign:'right'}}>
                       <h1 style={{fontSize:45}}>{meetrequirement.length}</h1>
                       <h4>Available Loans</h4>
                       </div> 
                    </div>
                </div>  
                
                <div className="row">
                    <div className="col-lg-6 col-sm-12 col-md-6">
                   
                    <fieldset>
                       <input
                        onChange={handleInput}
                        placeholder="Request Amount"
                        type="number" 
                        min="1"
                        name="requestAmount"
                        tabindex="1" 
                        autofocus
                        ref={register({
                            required: "Required",
                            min:1,
                            max:999999999999999
                          })}
                        />
                        <small className="text-danger">{errors.requestAmount?.type == "required" && "Request Amount is required"}</small>
                    </fieldset>
                    </div>
                    <div className="col-lg-6 col-sm-12 col-md-6">
                    <fieldset>
                       <select name="loanperiod" 
                        onChange={handleInput}
                        style={{color:'#777777'}}
                        ref={register({
                            required: "Required"
                          })}
                       >
                          <option value="">How Long</option>
                          <option value="1">1 months</option>
                          <option value="3">3 months</option>
                          <option value ="6">6 months</option>
                          <option value="12">1 year</option>
                          <option value="24">2 years</option>
                          <option value="36">3 years</option>
                      </select> 
                      <small className="text-danger">{errors.loanperiod?.type == "required" && "Loan Period is required"}</small>
                    </fieldset>
                    </div>
            
                </div>

              
               
                <div className="row">
                    <div className="col-lg-6 col-sm-12 col-md-6">
                    <input
                        style={{display:'none'}}
                        placeholder="Min Interest Rate"
                        onChange={handleInput}
                        type="number" 
                        min="0"
                        value = '0'
                        name="minInterestRate"
                        tabindex="1" 
                        autofocus
                        ref={register({
                            required: "Required",
                            min:0,
                            max:999999999999999
                          })}
                        />     
                    <fieldset>
                    
                       <input
                        placeholder="Max Interest Rate"
                        onChange={handleInput}
                        type="number" 
                        min="1"
                        name="maxInterestRate"
                        tabindex="1" 
                        autofocus
                        ref={register({
                            required: "Required",
                            min:1,
                            max:999999999999999
                          })}
                        />
                        <small className="text-danger">{(errors.maxInterestRate?.type == "min" || errors.maxInterestRate?.type =="max") && "Invalid Input"}</small>
                        <small className="text-danger">{errors.maxInterestRate?.type == "required" && "Maximum Interest Rate is required"}</small>
                    </fieldset>
                    </div>
                    <div className="col-lg-6 col-sm-12 col-md-6">
                    <fieldset>
                     <select name="repaymentplan" 
                            style={{color:'#777777'}}
                            placeholder=""
                            ref={register({
                                required: "Required"
                              })}
                    >
                          <option value="">Repayment Plan</option>
                          <option value="Daily">Daily</option>
                          <option value="Weekly">Weekly</option>
                          <option value= "Monthly">Monthly</option>
                          <option value="At the End">At the End</option>
                      </select> 
                        <small className="text-danger">{errors.repaymentplan?.type == "required" && "Repayment Plan is required"}</small>
                    </fieldset>
                    </div>
                </div>
               

                <div className="row">
                   
                    <div className="col-lg-6 col-sm-6 col-md-6">
                        <fieldset>
                        <select 
                            name="requiredcreditBereau" 
                            style={{color:'#777777'}}
                            placeholder=""
                            ref={register({
                                required: "Required"
                              })}
                        >
                            <option value="">Are you will to pay for Credit Bereau</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select> 
                            <small className="text-danger">{errors.requiredcreditBereau?.type == "required" && "Credit Bereau field is required"}</small>
                        </fieldset>
                    </div>
                    <div className="col-lg-6 col-sm-12 col-md-6">
                        <fieldset>
                            <select 
                                    name="lender_country_id"
                                    style={{color:'#777777'}}
                                    onChange = {(text) => handleChange(text)}
                                    ref={register({
                                        required: "Required",
                                    })}
                                >
                                <option value ="">Select Lender's Country</option>
                                    {
                                        countries.map((country) =>
                                        <option value ={country.id}>{ country.name }</option>
                                    )}
                            </select> 
                            <small className="text-danger">{errors.lender_country_id?.type == "required" && "Country is required"}</small>
                            { isLoadingCountries == true && <small className="text-danger">Loading Countries....</small>}
                        </fieldset>
                    </div>
               
                </div>

                <div className="row">
                    <div className="col-lg-6 col-sm-12 col-md-6">
                        <fieldset>
                                <select 
                                    name="lender_state_id"
                                    onChange = {(text) => handleState(text)}
                                    style={{color:'#777777'}}    
                                    ref={register({
                                        required: "Required",
                                    })}
                                >
                                <option value ="">Select Lender's State</option>
                                    {
                                        states.map((state) =>
                                        <option value ={state.id}>{ state.name }</option>
                                    )}
                            </select> 
                            <small className="text-danger">{errors.lender_state_id?.type == "required" && "State is required"}</small>
                            { isLoadingState == true && <small className="text-danger">Loading States....</small>}
                        </fieldset>
                    </div>
                    <div className="col-lg-6 col-sm-12 col-md-6">
                        <fieldset>
                            <select 
                                    name="lender_city_id"
                                    style={{color:'#777777'}}
                                    onChange = {handleInput}
                                    ref={register({
                                        required: "Required",
                                    })}
                                >
                                <option value ="">Select Lender's City</option>
                                    {
                                        cities.map((city) =>
                                        <option value ={city.id}>{ city.name }</option>
                                    )}
                            </select> 
                            <small className="text-danger">{errors.lender_city_id?.type == "required" && "City is required"}</small>
                            { isLoadingCities == true && <small className="text-danger">Loading Cities....</small>}
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
                            {
                                (userdetails != null ||
                                userhomeaddress != null ||
                                userofficeaddress != null ||
                                usersocialmedia != null ||
                                bankdetail != null || userdetails.Is_phone_number_verified != 0   || userdetails.Is_email_verified != 0) &&
                                <button name="submit" hidden = {IsFetching}  type="submit" id="" data-submit="...Sending">Submit Request</button>
                            }      
                            <div style={{width:'100%',textAlign:'center'}}>
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
                    </div>    
                    
                    </fieldset>
            </form>
    
                 
              </div>
            </div>    
               
            </section>
            <Footer />
           
        </div>
        
    );
}

export default withRouter(MakeRequest);