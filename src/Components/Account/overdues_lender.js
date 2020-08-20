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
import {  GetLenderOverdues } from '../redux/action/index';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Request from './Request';

const LenderOverDues = (props) => 
{
	const dispatch = useDispatch();
    //const IsFetching = useSelector(state => state.root.IsFetching);
    const lender_overdues = useSelector(state => state.root.lender_overdues);
    const [IsFetching, setIsFetching] = useState(false);
    const [view_more, setview_more] = useState(false);
    const [request, setrequest] = useState({});
    
    useEffect(() => {
        process();
    },[]);

    const process = async  () =>
    {
        setIsFetching(true);
        await dispatch(GetLenderOverdues());
        //alert(JSON.stringify(lender_overdues));
        setIsFetching(false);
    }

    const requestInformation = (request) => 
    {
        setrequest(request);
        setview_more(true);
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
                                <th scope="col">Borrower Name</th>
                                <th scope="col">Amount Due</th>
                                <th scope="col">Date Due</th>
								<th scope="col">Option</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                        {
                            lender_overdues != null && lender_overdues.length > 0 && 
                            lender_overdues.map((overdue,id) =>
                            <tr>
                                <td>
                                    <p>{id+1}</p>
                                </td>
                                <td>
                                    <div className="media">
                                    
                                        <div className="media-body">
                                            <p>{overdue.borrower.name}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <p>{overdue.paymentschedule.expected_amount_to_paid}</p>
                                </td>
                                <td>
                                    <p>{overdue.paymentschedule.dueDate}</p>
                                </td>
                                <td>
                                    <button style={{padding:7,color:'#fff',background:'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)',borderRadius:7}}>View Profile</button>
                                
                                </td>
                            </tr>
                            )
                        }    
                        
                            
					
                        </tbody>   
                       
				    </table>
                </div>
                {
                            lender_overdues != null && lender_overdues.length == 0 && IsFetching == false &&
                            <div style={{textAlign:'center', marginTop:20,width:'100%'}}>No Data Found</div>
                }
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

export default LenderOverDues;