import React, { useEffect } from 'react';
import '../css/account/main.css';
import '../css/account/util.css';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { userlogin } from '../redux/action/index';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { user_attempt_login } from './redux/action/index';
import Loader from 'react-loader-spinner';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';

const Login = (props) => 
{
	const user = useSelector(state => state.root.user);
	const IsFetching = useSelector(state => state.root.IsFetching);
	const dispatch = useDispatch();
	const { handleSubmit, register, errors } = useForm();
	let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };
	const onSubmit = async data => {
		await dispatch(user_attempt_login(data,history,from));
		//if(Object.keys(user).length > 0) history.replace(from);
	}

	useEffect(() => {
      //alert(IsFetching);
	},[])
	
    return(
        <div className="limiter">
			 <ReactNotification />
		     <div className="container-login100">
			<div className="wrap-login100">
				<form onSubmit={handleSubmit(onSubmit)} className="login100-form validate-form">
				<div style={{textAlign:'center',marginBottom:20}}>
					<div className="logo">
						<Link to ="/"><img src="../../img/core-img/logo.png" alt=""/></Link>
					</div>
				</div>
					<span className="login100-form-title p-b-43">
						Login to continue
					</span>
					
					<label style={{fontSize:14}}>Email</label>
					<div className="wrap-input100 validate-input" style={{marginBottom:20}}>
						<input 
							className="input100" 
							type="text" 
							name="email"
							ref={register({ required: true, pattern : /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/})}
							/>
							<small className="text-danger">{errors.email?.type == "required" && "Email is required"}</small>
							<small className="text-danger">{errors.email?.type == "pattern" && "Invalid Email"}</small>
							
					</div>
					
					<label style={{fontSize:14}}>Password</label>
					<div className="wrap-input100 validate-input" style={{marginBottom:20}}>
						<input 
							className="input100" 
							type="password" 
							name="password"
							ref={register({
								required: "Required"
							  })}
							/>
						<small className="text-danger">{errors.password?.type == "required" && "Password is required"}</small>
						<span className="focus-input100"></span>
						
					</div>

					<div className="flex-sb-m w-full p-t-3 p-b-32">
						<div className="contact100-form-checkbox">
							<input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me"/>
							{/* <label className="label-checkbox100" for="ckb1">
								Remember me
							</label> */}
						</div>

						{/* <div>
							<a href="#" className="txt1">
								Forgot Password?
							</a>
						</div> */}
					</div>
			

					<div className="container-login100-form-btn">
						<button hidden = {IsFetching} type="submit" className="login100-form-btn">
							Login
						</button>
						<Loader
								visible={IsFetching}
								type="Puff"
								color="#ffbb38"
								height={30}
								width={30}
								timeout= {0} //3 secs
						
							/>
					</div>
					
					<div className="text-center p-t-46 p-b-20">
						<p style={{fontSize:14}}>
							Don't have an Account ? <Link to="/register">Register</Link>
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

export default withRouter(Login);