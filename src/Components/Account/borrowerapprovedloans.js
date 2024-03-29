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
import {  GetBorrowerApprovedLoans } from '../redux/action/index';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Request from './Request';

const BorrowerApprovedRequest = (props) => 
{
	const dispatch = useDispatch();
    //const IsFetching = useSelector(state => state.root.IsFetching);
    const approvedloans = useSelector(state => state.root.myapprovedloans);
    const [IsFetching, setIsFetching] = useState(false);
    const [view_more, setview_more] = useState(false);
    const [request, setrequest] = useState({});
    const month = useSelector(state => state.root.month);
    const type = 'borrower';
    
    useEffect(() => {
        process();
    },[]);

    const process = async  () =>
    {
        setIsFetching(true);
        await dispatch(GetBorrowerApprovedLoans());
        setIsFetching(false);
    }

    const requestInformation = (request) => 
    {
        setrequest(request);
        setview_more(true);
    }

    const FormatDate = (date) => {
        date = date.split('T')[0];
        let d = date.split('-');
        let day = d[2];
        let mth = month[parseInt(d[1])-1];
        let year = d[0];
        return `${day} ${mth}, ${year}`;
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
                        { Object.keys(request).length > 0 && <Request request = {request} type = {type} />   }
                        
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
                                <th scope="col">Loan Period</th>
                                <th scope="col">Request Date</th>
								<th scope="col">Option</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            approvedloans.map((request,id) =>
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
                                    {request.request.loanperiod}
                                </td>
                                <td>
                                    {FormatDate(request.request.created_at)}
                                </td>
                                <td>
                                    <button onClick = {() => requestInformation(request)} style={{padding:3,color:'#fff',background:'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)',borderRadius:3}}>View Profile</button>
                                
                                </td>
                            </tr>
                            )
                        }    
                        
                            
					
                        </tbody>   
                       
				    </table>
                    {
                            approvedloans.length == 0 &&
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

export default BorrowerApprovedRequest;