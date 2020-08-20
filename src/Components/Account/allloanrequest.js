import React, {useState, useEffect} from 'react';
import Header from '../Header';
import { Link, Redirect, withRouter, useHistory } from 'react-router-dom';
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
import {  GetBorrowerAllLoansRequest, ResearchforLender } from '../redux/action/index';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Request from './Request';

const AllLoanRequest = (props) => 
{
	const dispatch = useDispatch();
    const MainFetching = useSelector(state => state.root.IsFetching);
    const allloansrequest = useSelector(state => state.root.allmyloansrequest);
    const [IsFetching, setIsFetching] = useState(false);
    const [view_more, setview_more] = useState(false);
    const [request, setrequest] = useState({});
    let history = useHistory();
    
    useEffect(() => {
        process();
    },[]);

    const process = async  () =>
    {
        setIsFetching(true);
        await dispatch(GetBorrowerAllLoansRequest());
        setIsFetching(false);
    }

    const requestInformation = async (request) => 
    {
        await dispatch(ResearchforLender(request,props));
        window.location.href ='/sureoffers';
    }
    return(
        <section className="lattest-product-area pb-40 category-list">
            <ReactNotification />
                <div hidden={!view_more} className="sideview">
                    <div>
                        <a className="pull-right">
                        <FontAwesomeIcon icon={faTimesCircle} onClick={() => setview_more(false)} style={{color:'red',fontSize:25}} />
                        </a>
                    </div>
                    <div className="">
                        <div id="">
                        { Object.keys(request).length > 0 && <Request request = {request} />   }
                        
                        </div>
                    </div>
                </div>
                
				<div hidden = {IsFetching} className="table-responsive ">
                    <table className="table">
                        <thead>
                            <tr className="filter-bar" style={{color:'#fff'}}>
                                <th scope="col">S/N</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Load Period</th>
                                <th scope="col">Max Interest</th>
                                <th scope="col">Min Interest</th>
								<th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            allloansrequest.map((request,id) =>
                            <tr>
                                <td>
                                    {id+1}
                                </td>
                                <td>
                                    <div className="media">
                                    
                                        <div className="media-body">
                                            {request.requestAmount.toString().toLocaleString()}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {request.loanperiod}
                                </td>
                                <td>
                                    {request.maxInterestRate}%
                                </td>
                                <td>
                                    {request.minInterestRate}%
                                </td>
                               
                                <td>
                                    {
                                      request.connect == null &&
                                      <button onClick = {() => requestInformation(request)} style={{padding:3,color:'#fff',background:'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)',borderRadius:3}}>Connect with Lender</button>
                                    }
                                    {
                                        request.connect !=null && 'Connected' 
                                    }
                                </td>
                               
                            </tr>
                            )
                        }    
                        
                            
					
                        </tbody>   
                       
				    </table>
                    {
                            allloansrequest.length == 0 &&
                            <div style={{textAlign:'center', marginTop:20,width:'100%'}}>No Data Found</div>
                    }
                </div>
                <div style={{textAlign:'center',marginTop:100}}>
                    <Loader
                        visible={MainFetching}
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

export default withRouter(AllLoanRequest);