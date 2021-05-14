import React, {useState, useEffect} from 'react';
import Header from '../Header';
import { Link } from 'react-router-dom';
import '../../css/css/analytics.css'
import Footer from '../Footer';
import Analytics from '../analytics';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faTrash, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import SureRequest from '../sureRequest';
import Loader from 'react-loader-spinner';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import {useSelector, useDispatch } from 'react-redux';
import Sidebar from './sidebar';
import {  GetBorrowerpendingapprovals } from '../redux/action/index';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
//import Request from './Request';
import LenderRequest from './LenderRequest';

const BorrowerPendingRequest = (props) => 
{
	const dispatch = useDispatch();
    //const IsFetching = useSelector(state => state.root.IsFetching);
    const mypendingapprovalloans = useSelector(state => state.root.mypendingapprovalloans);
    const [IsFetching, setIsFetching] = useState(false);
    const [view_more, setview_more] = useState(false);
    const [request, setrequest] = useState({});
    const type = 'borrower';
    
    useEffect(() => {
        process();
    },[]);

    const process = async  () =>
    {
        setIsFetching(true);
        await dispatch(GetBorrowerpendingapprovals());
        setIsFetching(false);
    }

    const requestInformation = (request) => 
    {
        setrequest(request);
        setview_more(true);
    }

    const FormatDate = (date) => {
		let d = new Date(date).toString();
		d = d.split('G')[0];
		return d;
    }
    return(
        <section className="lattest-product-area pb-40 category-list">
            <ReactNotification />
                <div hidden={!view_more} className="sideview">
                    <div style={{float:'right'}}>
                        <a className="pull-right">
                        <FontAwesomeIcon icon={faTimesCircle} onClick={() => setview_more(false)} style={{color:'red',fontSize:25}} />
                        </a>
                    </div>
                    <div className="">
                        <div id="">
                        { Object.keys(request).length > 0 && <LenderRequest request = {request} type = {type} />   }
                        
                        </div>
                    </div>
                </div>
				<div hidden = {IsFetching} className="table-responsive ">
                    <table className="table">
                        <thead>
                            <tr className="filter-bar" style={{color:'#fff'}}>
                                <th scope="col">S/N</th>
                                <th scope="col">Lender Name</th>
                                <th scope="col">Request Amount</th>
                                <th scope="col">Repayment Plan</th>
                                <th scope="col">Loan Period (In months)</th>
                                <th scope="col">Request Date</th>
								<th scope="col">Option</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            mypendingapprovalloans.map((request,id) =>
                            <tr>
                                <td>
                                    {id+1}
                                </td>
                               
                                <td>
                                    <div className="media">
                                    
                                        <div className="media-body">
                                            {request.lender.name}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="media">
                                    
                                        <div className="media-body">
                                            {request.request.requestAmount}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {request.request.repaymentplan}
                                </td>
                                <td>
                                    {request.request.loanperiod} month(s)
                                </td>
                                <td>
                                    {FormatDate(request.request.created_at)}
                                </td>
                                <td>
                                    {
                                        request.connection_type == 'lender connect' &&
                                        <button onClick = {() => requestInformation(request)} style={{padding:3,color:'#fff',background:'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)',borderRadius:3}}>View Profile</button>

                                    }
                                    {
                                        request.connection_type == null &&
                                        'Waiting for Lender to Approve'

                                    }
                                
                                </td>
                            </tr>
                            )
                        }    
                        
                            
					
                        </tbody>   
                       
				    </table>
                    {
                            mypendingapprovalloans.length == 0 &&
                            <div style={{textAlign:'center', marginTop:20,width:'100%'}}>No Data Found</div>
                    }
                </div>
                <div style={{textAlign:'center',marginTop:100}}>
                    <Loader
                        visible={IsFetching}
                        type="Puff"
                        color="#ffbb38"
                        height={30}
                        width={30}
                        timeout= {0} //3 secs
                
                    />
                </div>    
			</section>
        
    );
}

export default BorrowerPendingRequest;