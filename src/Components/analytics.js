import React, {useEffect, useState} from 'react';
import '../css/css/analytics.css';
import { UserActivitiesAnalytics } from './redux/action/index';
import {useSelector, useDispatch} from 'react-redux';





const Analytics = () => {
	const analytics = useSelector(state => state.root.analytics);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(UserActivitiesAnalytics());
	},[]);
    return(
        <section className="features-area section_gap">
		<div className="container">
			<div className="row features-inner">
				<div className="col-lg-3 col-md-6 col-sm-6">
					<div className="single-features">
						<div className="f-icon">
							<h3>{analytics.surevault == undefined ? 0 : analytics.surevault}</h3>
						</div>
						<h6>Sure Vault</h6>
						Total Amount In Vault
					</div>
				</div>
				<div className="col-lg-3 col-md-6 col-sm-6">
					<div className="single-features">
						<div className="f-icon">
						<h3>{analytics.loanrequest == undefined ? 0 : analytics.loanrequest}</h3>
						</div>
						<h6>Sure Request</h6>
						Amount Borrowed
					</div>
				</div>
				<div className="col-lg-3 col-md-6 col-sm-6">
					<div className="single-features">
						<div className="f-icon">
							<img src="img/features/f-icon3.png" alt=""/>
						</div>
						<h6>Accepted Request</h6>
						Number of Request Accepted
					</div>
				</div>
				<div className="col-lg-3 col-md-6 col-sm-6">
					<div className="single-features">
						<div className="f-icon">
						<h3>{analytics.disbursed == undefined ? 0 : analytics.disbursed}</h3>
						</div>
						<h6>Disbursed</h6>
						Amount Disbursed
					</div>
				</div>
			</div>
		</div>
	</section>
    );
}

export default Analytics;