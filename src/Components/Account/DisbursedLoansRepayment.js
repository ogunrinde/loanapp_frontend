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
import {  ViewRepaymentsOnRequestId } from '../redux/action/index';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Request from './Request';

const DisbursedFundRepayment = (props) => {

    const dispatch = useDispatch();
    //const repayments = useSelector(state => state.root.repayments_lender);
    const [IsFetching, setIsFetching] = useState(false);
    const [view_more, setview_more] = useState(false);
    const [request, setrequest] = useState({});
    const month = useSelector(state => state.root.month);

    const viewrepayment = async (request) => {
        //alert(JSON.stringify(request));
        await dispatch(ViewRepaymentsOnRequestId(request.request.id));
        props.nextStep();
    }

    const FormatDate = (date) => {
        date = date.split('T')[0];
        let d = date.split('-');
        let day = d[2];
        let mth = month[parseInt(d[1])-1];
        let year = d[0];
        return `${day} ${mth}, ${year}`;
    }
    return (
    <div hidden = {IsFetching} className="table-responsive ">
    <table className="table">
        <thead>
            <tr className="filter-bar" style={{color:'#fff'}}>
                <th scope="col">S/N</th>
                <th scope="col">Borrower Name</th>
                <th scope="col">Repayment Plan</th>
                <th scope="col">Loan Period</th>
                <th scope="col">Request Date</th>
                <th scope="col">Option</th>
            </tr>
        </thead>
        <tbody>
        {
            props.loansdisbursed.map((request,id) =>
            <tr>
                <td>{id+1} </td>
                <td>
                    <div className="media">
                    
                        <div className="media-body" style={{textTransform:'capitalize'}}>
                            {request.borrower.name}
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
                    <button onClick={() => viewrepayment(request)} style={{padding:3,color:'#fff',background:'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)',borderRadius:3}}>Repayments</button>
                
                </td>
            </tr>
            )
        }    
        
            
    
        </tbody>   
       
    </table>
    {
            props.loansdisbursed.length == 0 &&
            <div style={{textAlign:'center', marginTop:20,width:'100%'}}>No Data Found</div>
    }
    </div>);
}

export default DisbursedFundRepayment;