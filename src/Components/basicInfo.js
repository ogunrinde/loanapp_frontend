/* eslint no-undef: "off"*/
import React, { useState, useEffect} from 'react';
import '../css/css/profile.css';
import { useForm } from "react-hook-form";
import { places, countrystates } from '../Components/redux/action/index';
import { useSelector, useDispatch } from 'react-redux'; 
import { userbasicInfo, countrycodes, GetCompleteUserProfile } from '../Components/redux/action/index';
import Loader from 'react-loader-spinner';
import { Link, withRouter } from 'react-router-dom';
import { IMAGEPATH } from './redux/action/constants';


const BasicInfo = (props) =>
{
    const dispatch = useDispatch();
    const [ isLoadingCountries, setisLoadingCountries] = useState(false);
    const [ isLoadingState, setisLoadingState ] = useState(false);
    const countries = useSelector(state => state.places.countries);
    const states = useSelector(state => state.places.states);
    const [IsSubmitting, setIsSubmitting] = useState(false);
    const codes = useSelector(state => state.root.codes);
    const { handleSubmit, register, errors } = useForm();
    const userdetails = useSelector(state => state.root.userbasicdetails);
    const userhomeaddress = useSelector(state => state.root.userHomeAddress);
    const userofficeaddress = useSelector(state => state.root.userOfficeAddress);
    const usersocialmedia = useSelector(state => state.root.userSocialMediaAccounts);
    const bankdetail = useSelector(state => state.root.userBankInformation);
    const [file, setfile ] = useState(null);
    //const [ showfile, setshowfile ] = useState()


    useEffect(() =>{
        process();
        setisLoadingCountries(true);
        dispatch(places());
        dispatch(countrycodes());
        setisLoadingCountries(false);
    },[]);

    const process = async () => {
        // if(userdetails == null)
        //    await dispatch(GetCompleteUserProfile());
    }

    const handleChange = (event) => {
        setisLoadingState(true);
        dispatch(countrystates(event.target.value));
        setisLoadingState(false);
    }

    const handleFileChange = (event) => {
        let file = event.target.files[0];
        setfile(file);
    }

    const onSubmit = async (data,e) =>
    {
        const formdata = new FormData();
        formdata.append('surname', data.surname);
        formdata.append('firstname', data.firstname);
        formdata.append('middlename', data.middlename);
        formdata.append('gender', data.gender);
        formdata.append('date_of_birth', data.date_of_birth);
        formdata.append('email', data.email);
        formdata.append('mobile1', data.mobile1);
        formdata.append('mobile2', data.mobile2);
        formdata.append('image', file);
        setIsSubmitting(true);
        await dispatch(userbasicInfo(formdata,props,e));    
        setIsSubmitting(false);
    }
    return(
       
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Basic Information </h3>
                <div className="row" style={{marginTop:15}}>
                    <div className="col-lg-6 col-sm-12 col-md-6">   
                    <label style={{fontSize:14}}>Surname</label>
                    <fieldset>
                       <input
                        placeholder=""
                        type="text" 
                        name="surname"
                        className="form-control"
                        tabindex="1" 
                        defaultValue = {(userdetails != null && userdetails.surname) ? userdetails.surname : ''}
                        autofocus
                        ref={register({
                            required: "Required",
                            minLength:3
                          })}
                        />
                        <small className="text-danger">{errors.surname?.type === "required" && "Surname is required"}</small>
                        <small className="text-danger">{errors.surname?.type === "minLength" && "Minimum of 5 Character is required"}</small>
                    </fieldset>
                    </div>
                    <div className="col-lg-6 col-sm-12 col-md-6">
                        <label style={{fontSize:14}}>First Name</label>
                        <fieldset>
                        <input 
                            placeholder="" 
                            className="form-control"
                            type="text" 
                            tabindex="1" 
                            defaultValue = {(userdetails != null && userdetails.firstname) ? userdetails.firstname : ''}
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

                <div className="row" style={{marginTop:7}}>
                    <div className="col-lg-6 col-sm-12 col-md-6">
                    <label style={{fontSize:14}}>Middle Name</label>    
                    <fieldset>
                       <input 
                            placeholder = "" 
                            type="text" 
                            className="form-control"
                            tabindex="1" 
                            defaultValue=""
                            autofocus
                            name="middlename"
                            defaultValue = {(userdetails != null && userdetails.middlename) ? userdetails.middlename : ''}
                            ref={register({
                                
                            })}
                        />
                        <small className="text-danger">{errors.middlename?.type == "required" && "Middle Name is required"}</small>
                        <small className="text-danger">{errors.middlename?.type == "minLength" && "Minimum of 5 Character is required"}</small>
                    
                    </fieldset>
                    </div>
                    <div className="col-lg-6 col-sm-12 col-md-6">
                        <label style={{fontSize:14}}>Date of Birth</label>
                        <fieldset>
                        <input 
                            placeholder="" 
                            type="date" 
                            className="form-control"
                            tabindex="1"
                            autofocus
                            defaultValue = {(userdetails != null && userdetails.date_of_birth) ? userdetails.date_of_birth : ''}
                            name="date_of_birth"
                            ref={register({
                                required: "Required"
                            })}
                        />
                        <small className="text-danger">{errors.date_of_birth?.type == "required" && "Date of Birth is required"}</small>
                    
                        </fieldset>
                    </div>
                </div>

                <div className="row" style={{marginTop:7}}>
                      
                        <div className="col-lg-6 col-sm-6 col-md-6 pnum">
                        <label style={{fontSize:14}}>Phone Number</label>    
                        <input 
                            placeholder="" 
                            type="number" 
                            className="form-control"
                            tabindex="1" 
                            autofocus
                            name="mobile1"
                            defaultValue = {(userdetails != null && userdetails.mobile1) ? userdetails.mobile1 : ''}
                            ref={register({
                                required: "Required",
                                min:100,
                                max:99999999999999
                            })}
                        />
                        <small className="text-danger">{errors.mobile1?.type == "required" && "Phone Number is required"}</small>
                        <small className="text-danger">{(errors.mobile1?.type == "min" || errors.mobile1?.type == "max") && "Invalid Phone Number"}</small>
                        </div>
                        <div className="col-lg-6 col-sm-6 col-md-6 pnum">
                               <label style={{fontSize:14}}>Phone Number 2</label>   
                               <input 
                                    placeholder="" 
                                    type="number" 
                                    className="form-control"
                                    tabindex="1" 
                                    autofocus
                                    defaultValue = {(userdetails != null && userdetails.mobile2) ? userdetails.mobile2 : ''}
                                    name="mobile2"
                                    ref={register({
                                        min:100,
                                        max:99999999999999
                                    })}
                                />
                                 <small className="text-danger">{errors.mobile2?.type == "required" && "Phone Number is required"}</small>
                                 <small className="text-danger">{(errors.mobile2?.type == "min" || errors.mobile2?.type == "max") && "Invalid Phone Number"}</small>
                               </div>
                </div>  
                {/* <div className="row" style={{marginTop:7}}>    
                              
                </div> */}
                
                <div className="row" style={{marginTop:7}}>
                    <div className="col-lg-6 col-sm-12 col-md-6">
                    <fieldset>
                        <label style={{fontSize:14}}>Email</label>
                        <input 
                            placeholder="" 
                            type="email" 
                            className="form-control"
                            defaultValue = {(userdetails != null && userdetails.email) ? userdetails.email : ''}
                            tabindex="1" 
                            autofocus
                            name="email"
                            ref={register({
                                required: "Required",
                            })}
                        />
                    </fieldset>
                    <small className="text-danger">{errors.email?.type == "required" && "Email is required"}</small>
                    </div>
                    <div className="col-lg-6 col-sm-12 col-md-6">
                        <label style={{fontSize:14}}>Gender</label>
                        <fieldset>
                        <select 
                            className="form-control"
                            name="gender"
                            defaultValue={(userdetails != null && userdetails.gender) ? userdetails.gender : ''}
                            style={{backgroundColor:'#fff'}}    
                            ref={register({
                                required: "Required",
                            })}
                        >
                        <option value = ''></option>
                            <option value ="Female">Female</option>
                            <option value ="Male">Male</option>  
                    </select> 
                    <small className="text-danger">{errors.gender?.type == "required" && "Gender is required"}</small>
                        </fieldset>
                    </div>
                 
                </div>
                <div className="row" style={{marginTop:7}}>
                    <div className="col-lg-12 col-sm-12 col-md-12">
                        {
                            file != null && <img src = {URL.createObjectURL(file)} style={{width:100,height:100}} />
                        }

                        {
                            (file == null && userdetails != null && userdetails.profileImage != null) ? 
                            <img src={`${IMAGEPATH}/${userdetails.profileImage}`} style={{width:100,height:100}} /> : ''
                        }
                        
                    </div>
                </div>    
                
                <div className="row" style={{marginTop:7}}>
                    <div className="col-lg-12 col-sm-12 col-md-12">
                    <fieldset>
                    
                        <label style={{fontSize:14}}>Profile Image</label>
                        <input 
                            placeholder="" 
                            className="form-control"
                            type="file" 
                            tabindex="1" 
                            autofocus
                            onChange={handleFileChange}
                            name="image"
                            ref={register({
                                required: "",
                            })}
                        />
                    </fieldset>
                    <small className="text-danger">{errors.image?.type == "required" && "Profile Image is required"}</small>
                    </div>
                 
                </div>
                
                <fieldset>
                <div className="row">
                    <div className="col-lg-6">

                    </div>
                    <div className="col-lg-3">

                    </div>
                    <div className="col-lg-3 pull-right">

                    <button hidden={IsSubmitting} className="btn btn-success" style={{backgroundColor:'rgb(255, 187, 56)', border:'none'}} name="submit"  type="submit" id="" data-submit="...Sending">Save and Continue</button>
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
                
                </fieldset>
               
            </form>
    );
}

export default withRouter(BasicInfo);