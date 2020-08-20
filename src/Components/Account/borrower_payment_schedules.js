import React, {useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import $ from 'jquery';
import '../../css/account/custom.css';
import { GetBorrowerPaymentSchedules, requeststatus } from '../redux/action/index';
import Loader from 'react-loader-spinner';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import { useForm } from 'react-hook-form';
import '../../css/css/profile.css';
import { parse } from '@fortawesome/fontawesome-svg-core';

const BorrowerPaymentSchedules = (props) => {

	const [IsFetching, setIsFetching] = useState(false);
	const [ IsDisbursing, setIsDisbursing ] = useState(false);
	const { handleSubmit, register, errors } = useForm();
	const dispatch = useDispatch();
    let schedules = useSelector(state => state.root.borrower_payment_schedules,shallowEqual);
    let analytics = useSelector(state => state.root.paymentanalytics);
	const [IsSubmitting, setIsSubmitting] = useState(false);
    const request = props.request;
    //const [analytics, setanalytics] = useState({}); 

    useEffect(() =>{
		getpaymentSchedules();
    },[props.request]);


	const getpaymentSchedules = async () => {
        setIsFetching(true);
        await dispatch(GetBorrowerPaymentSchedules(props.request.id));
        //Analytics();
		setIsFetching(false);
		
    }


    
    
    return(
		<div>
        {	
         schedules != null &&
		 schedules.length > 0 &&	
        <div hidden = {IsFetching}>
		<ReactNotification />	
		<div style={{width:'96%',marginLeft:'2%'}}>
        {
            analytics != null && Object.keys(analytics).length > 0 &&   
            <section className="features-area section_gap">
            <div className="container">
                <div className="row features-inner">
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="single-features">
                            <div className="f-icon">
                                <h3>{analytics.overdues != undefined ? analytics.overdues : 0}</h3>
                            </div>
                            <h6>Amount OverDue</h6>
                            
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="single-features">
                            <div className="f-icon">
                            <h3>{analytics.paid != undefined ? analytics.paid : 0}</h3>
                            </div>
                            <h6>Total Paid</h6>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="single-features">
                            <div className="f-icon">
                                <h3>NGN {analytics.totalpending != undefined ? analytics.totalpending.toLocaleString() : 0}</h3>
                            </div>
                            <h6>Total Pending</h6>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="single-features">
                            <div className="f-icon">
                            <h3>{analytics.nextpaydate != undefined ? analytics.nextpaydate : 0}</h3>
                            </div>
                            <h6>Next Payment Date</h6>
                        </div>
                    </div>
                </div>
            </div>
        </section>    
        }
        <div hidden = {IsFetching} className="table-responsive ">
                    <table className="table">
                        <thead>
                            <tr className="filter-bar" style={{color:'#fff'}}>
                                <th className="text-center" scope="col">S/N</th>
                                <th className="text-center" scope="col">Lender Name</th>
                                <th className="text-center" scope="col">Expected Amount to Paid</th>
                                <th className="text-center" scope="col">Due date</th>
                                <th className="text-center" scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            schedules.map((request,id) =>
                            <tr>
                                <td className="text-center">
                                    {id+1}
                                </td>
                                <td>
                                    <div className="media">
                                    
                                        <div className="media-body text-center">
                                            {request.lender.name}
                                        </div>
                                    </div>
                                </td>
                                <td  className="text-center">
                                    {request.expected_amount_to_paid}
                                </td>
                                <td className="text-center">
                                    {request.dueDate}
                                </td>
                                <td className="text-center">
                                    {
                                        request.status == 'pending' && <div style={{textTransform:'capitalize',color:'orange', borderWidth:5,border :'1px solid orange',borderRadius:5}}>{request.status}</div>
                                    }

                                    {
                                        request.status == 'paid' && <div style={{textTransform:'capitalize',color:'green', borderWidth:5,border :'1px solid orange',borderRadius:5}}>{request.status}</div>
                                    }
                                    
                                </td>
                               
                            </tr>
                            )
                        }    
                        
                            
					
                        </tbody>   
                       
				    </table>
                    {
                            schedules.length == 0 &&
                            <div style={{textAlign:'center', marginTop:20,width:'100%'}}>No Data Found</div>
                    }
                </div>
        </div>
	    
		</div>
		}
		<div style={{textAlign:'center',marginTop:'35%'}}>
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
    );
}

export default BorrowerPaymentSchedules;
