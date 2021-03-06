import React, {useState, useEffect} from 'react';
import Header from '../Header';
import { Link } from 'react-router-dom';
import '../../css/css/analytics.css'
import Footer from '../Footer';
import Analytics from '../analytics';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faTrash, faTimesCircle, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import SureRequest from '../sureRequest';
import Loader from 'react-loader-spinner';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import {useSelector, useDispatch } from 'react-redux';
import Sidebar from './sidebar';
import {  GetCompleteVault } from '../redux/action/index';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Transaction from './transactions';

const Vault = (props) => 
{
	const dispatch = useDispatch();
    const vault = useSelector(state => state.root.myvault);
    const [IsFetching, setIsFetching] = useState(false);
    const [view_more, setview_more] = useState(false);
    const [ Sure_Vault, setSure_Vault] = useState({});
    //const transaction = useSelector(state => state.root.transaction);
    
    useEffect(() => {
        process();
    },[]);

    const process = async  () =>
    {
        setIsFetching(true);
        await dispatch(GetCompleteVault());
        setIsFetching(false);
    }

    

    const requestInformation = (surevault) => 
    {
        setIsFetching(true);
        setview_more(true);
        setSure_Vault(surevault);
        setIsFetching(false);
    }
    return(
        <section className="lattest-product-area pb-40 category-list">
            <ReactNotification />
                <div hidden={!view_more} className="sideview2" style={{padding:10}}>
                    <div style={{float:'right'}}>
                        <a className="pull-right">
                        <FontAwesomeIcon icon={faWindowClose} onClick={() => setview_more(false)} style={{color:'red',fontSize:25}} />
                        </a>
                    </div>
                    <div className="">
                        <div id="">
                        { Object.keys(Sure_Vault).length > 0 && <Transaction surevault = {Sure_Vault} />   }
                        
                        </div>
                    </div>
                </div>
               
				<div hidden = {IsFetching} className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr className="filter-bar" style={{color:'#fff'}}>
                                <th scope="col">S/N</th>
                                <th scope="col">Available Fund</th>
                                <th scope="col">Max Request Amount</th>
                                <th scope="col">Min Request Amount</th>
                                <th scope="col">Max Interest Rate</th>
                                <th scope="col">Min Interest Rate</th>
								<th scope="col">Option</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            vault.map((surevault,id) =>
                            <tr>
                                <td>
                                    {id+1}
                                </td>
                                <td>
                                    <div className="media">
                                    
                                        <div className="media-body">
                                            {surevault.fundamount.toLocaleString()}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {surevault.maxRequestAmount.toLocaleString()}
                                </td>
                                <td>
                                    {surevault.minRequestAmount.toLocaleString()}
                                </td>
                                <td>
                                    {surevault.maxInterestperMonth}%
                                </td>
                                <td>
                                    {surevault.minInterestperMonth}%
                                </td>
                                <td>
                                    <button onClick = {() => requestInformation(surevault)} style={{padding:3,color:'#fff',background:'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)',borderRadius:3}}>Transaction</button>
                                
                                </td>
                            </tr>
                            )
                        }    
                        
                            
					
                        </tbody>   
                       
				    </table>
                    {
                            vault.length == 0 &&
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

export default Vault;