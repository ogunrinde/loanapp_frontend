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
import {  GetBorrowersRepayment } from '../redux/action/index';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Request from './Request';

const RepaymentOrder = (props) => {

    const dispatch = useDispatch();
    const repayments = [];//useSelector(state => state.root.repayments_lender);
    const requestID = useSelector(state => state.root.repaymentsonrequestId);
    const [IsFetching, setIsFetching] = useState(false);
    const [view_more, setview_more] = useState(false);
    const [request, setrequest] = useState({});
    const month = useSelector(state => state.root.month);

    useEffect(() =>{
        getdata();
    },[requestID]);

    const getdata = async () =>
    {
        setIsFetching(true);
        await dispatch(GetBorrowersRepayment());
        //alert(JSON.stringify(repayments));
        setIsFetching(false);
    }


    const FormatDate = (date) => {
        date = date.split(' ')[0];
        let d = date.split('-');
        let day = d[2];
        let mth = month[parseInt(d[1])-1];
        let year = d[0];
        return `${day} ${mth}, ${year}`;
    }
    return (
    <div>    
    <div hidden = {IsFetching} className="table-responsive ">
    <table className="table">
        <thead>
            <tr className="filter-bar" style={{color:'#fff'}}>
                <th scope="col">S/N</th>
                <th scope="col">Borrower Name</th>
                <th scope="col">Amount Paid</th>
                <th scope="col">Date Paid</th>
                <th scope="col">Mode of Payment</th>
                <th scope="col">Option</th>
            </tr>
        </thead>
        <tbody>
        {
            repayments.map((request,id) =>
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
                    {request.amount_paid}
                </td>
                <td>
                    {FormatDate(request.date_paid)}
                </td>
                <td>
                    {request.mode_of_payment}
                </td>
                <td>
                    <button onClick={props.nextStep} style={{padding:3,color:'#fff',background:'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)',borderRadius:3}}>Repayments</button>
                    <Loader
                    visible={IsFetching}
                    type="Puff"
                    color="#ffbb38"
                    height={30}
                    width={30}
                    timeout= {0} //3 secs
            
                   />
                </td>
            </tr>
            )
        }    
        
            
    
        </tbody>   
       
    </table>
    {
            repayments.length == 0 &&
            <div style={{textAlign:'center', marginTop:20,width:'100%'}}>No Data Found</div>
    }
    </div></div>);
}

export default RepaymentOrder;