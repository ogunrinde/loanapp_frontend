import React, { useState, useEffect } from 'react';
import '../css/account/main.css';
import '../css/account/util.css';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { user_attempt_register } from './redux/action/index';
import 'react-toastify/dist/ReactToastify.css';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';



const Register = (props) => 
{

	
	const IsLoggedIn = useSelector(state => state.root.IsLoggedIn);
	const IsAccountCreated = useSelector(state => state.root.IsAccountCreated);
	const IsFetching = useSelector(state => state.root.IsFetching);
	const [ IsSubmittingRegister, setIsSubmittingRegister ] = useState(false);
	const user = useSelector(state => state.root.user);
	const dispatch = useDispatch();
	const [ isSubmitting, setisSubmitting] = useState(false);
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = async (data,e) => {
		setIsSubmittingRegister(true);
		await dispatch(user_attempt_register(data,props));
		e.target.reset();
		setIsSubmittingRegister(false);
	}
	useEffect(()=>{
		reset();
	},[IsAccountCreated]);

	const reset = (e) => {
		//if(IsAccountCreated == true) e.target.reset();
	}
    return(
        <div className="limiter">
			<ReactNotification />
		    <div className="container-login100">
			<div className="wrap-login100">
				<form onSubmit={handleSubmit(onSubmit)} className="login100-form validate-form">
			    <div style={{textAlign:'center'}}>
					<div className="logo">
						<Link to ="/"><img src="../../img/core-img/logo.png" alt=""/></Link>
					</div>
				</div>		
					<span className="login100-form-title p-b-43" style={{marginTop:30}}>
						Create Account
					</span>

					<label style={{fontSize:14}}>Name</label>
                    <div className="wrap-input100 validate-input">
                        <input 
                            className="input100" 
                            type="text" 
                            name="name"
                            ref={register({ required: true, minLength: 5 })}
                            />
						<span className="focus-input100"></span>
                        
					</div>
                    <span className="text-danger">{errors.name?.type == "required" && "Name is required"}</span>
                    <span className="text-danger">{errors.name?.type == "minLength" && "Minimum of 5 Character is required"}</span>
					
					<label style={{fontSize:14}}>Email</label>
					<div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                        <input 
                            className="input100" 
                            type="text" 
                            name="email"
                            ref={register({ required: true, pattern : /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/})}
                            />
					</div>
                    <span className="text-danger">{errors.email?.type == "required" && "Email is required"}</span>
                    <span className="text-danger">{errors.email?.type == "pattern" && "Invalid Email Address"}</span>
					
					<label style={{fontSize:14}}>Password</label>
					<div className="wrap-input100 validate-input" data-validate="Password is required">
                        <input 
                            className="input100" 
                            type="password" 
                            name="pass"
                            ref={register({ required: true, minLength: 8 })}
                        />
					
					</div>
                    <span className="text-danger">{errors.pass && "Password is required"}</span>


					<label style={{fontSize:14}}>Confirm Password</label>
                    <div className="wrap-input100 validate-input" data-validate="Password is required">
                        <input 
                            className="input100" 
                            type="password" 
                            name="cpass"
                            ref={register({ required: true, validate: (value) => {
                                return value === watch('pass'); 
                              } })}
                        />
					</div>
                    <span className="text-danger">{errors.cpass?.type == 'validate' && "Password Mismatch"}</span>

					<div className="flex-sb-m w-full p-t-3 p-b-32">
						<div className="contact100-form-checkbox">
							<input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me"/>
							{/* <label className="label-checkbox100" for="ckb1">
								Remember me
							</label> */}
						</div>
					</div>
			

					<div className="container-login100-form-btn">
						<button hidden={IsSubmittingRegister} type="submit" className="login100-form-btn">
							Create Account 
						</button>
						<Loader
								visible={IsSubmittingRegister}
								type="Puff"
								color="#ffbb38"
								height={30}
								width={30}
								timeout= {0} //3 secs
						
							/>
					</div>
					
					<div className="text-center p-t-46 p-b-20">
						<p style={{fontSize:14}}>
							Have an Account? <Link to="/login">Login</Link>
						</p>
					</div>

					
				</form>

				<div className="login100-more" style={{backgroundImage: `url('../../img/bg-img/5.jpg')`}}>
				</div>
			</div>
		</div>
    	</div>
    );
}

export default withRouter(Register);