/* eslint no-undef: "off"*/
import React, { useState, useEffect} from 'react';
import '../css/css/profile.css';
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { GetVault, ConnectwithLender } from './redux/action/index';
import Loader from 'react-loader-spinner';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';


const ViewVault = (props) =>
{
    const dispatch = useDispatch();
    const [IsVaultFetching, setIsVaultFetching] = useState(false);
    const [IsConnecting, setIsConnecting] = useState(false);
    const lenderVault = useSelector(state => state.root.lendervault);
    const { handleSubmit, register, errors } = useForm();
    const month = useSelector(state => state.root.month);
    const onSubmit = values => console.log(values);


    useEffect(() =>{
       get_vault();
    },[props.vaultId]);

    const get_vault = async () => {
        if(props.vaultId == undefined || props.vaultId == 0) return false;
        setIsVaultFetching(true);
        await dispatch(GetVault(props.vaultId));
        setIsVaultFetching(false);
    }

    const connectLender = async () => {
        setIsConnecting(true);
        await dispatch(ConnectwithLender(props.lenderId,props.vaultId,props.requestId));
        setIsConnecting(false);
    }

    const FormatDate = (date) => {
        let d = date.split('-');
        let day = d[2];
        let mth = month[parseInt(d[1])-1];
        let year = d[0];
        return `${day} ${mth}, ${year}`;
    }
    
    return(
        <div>
            {
              Object.keys(lenderVault).length > 0 &&
              <div hidden = {IsVaultFetching}>
                <h3>Lender Vault</h3>
                <ReactNotification />
                <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        <div className="">
                                <p>Maximum Request Amount (NGN)</p>
                        </div>      
                        <div className="row">
                            <div className="col-lg-12">
                                <p>{lenderVault.maxRequestAmount}</p>
                            </div>
                        </div>
                    </li>
                    <li style={{marginTop:10}} className="list-group-item d-flex justify-content-between align-items-center">
                        <div className="">
                                <p>Minimum Request Amount (NGN)</p>
                        </div>      
                        <div className="row">
                            <div className="col-lg-12">
                               <p>{lenderVault.minRequestAmount}</p>
                            </div>
                        </div>
                    </li>
                    <li style={{marginTop:10}} className="list-group-item d-flex justify-content-between align-items-center">
                        <div className="">
                                <p>Minimum Interest Per Month</p>
                        </div>      
                        <div className="row">
                            <div className="col-lg-12">
                               <p>{lenderVault.minInterestperMonth}%</p>
                            </div>
                        </div>
                    </li>
                    <li style={{marginTop:10}} className="list-group-item d-flex justify-content-between align-items-center">
                        <div className="">
                                <p>Maximum Interest Per Month</p>
                        </div>      
                        <div className="row">
                            <div className="col-lg-12">
                              <p>{lenderVault.minInterestperMonth}%</p>
                            </div>
                        </div>
                    </li>
                    <li style={{marginTop:10}} className="list-group-item d-flex justify-content-between align-items-center">
                        <div className="">
                                <p>Fund Available From Date</p>
                        </div>      
                        <div className="row">
                            <div className="col-lg-12">
                              <p>{FormatDate(lenderVault.availablefrom)}</p>
                            </div>
                        </div>
                    </li>
                    <li style={{marginTop:10}} className="list-group-item d-flex justify-content-between align-items-center">
                        <div className="">
                                <p>Fund Available To Date</p>
                        </div>      
                        <div className="row">
                            <div className="col-lg-12">
                              <p>{FormatDate(lenderVault.availableto)}</p>
                            </div>
                        </div>
                    </li>
                    <li style={{marginTop:10}} className="list-group-item d-flex justify-content-between align-items-center">
                        <div className="">
                                <p>Email Verification</p>
                        </div>      
                        <div className="row">
                            <div className="col-lg-12">
                                <p></p>
                            </div>
                        </div>
                    </li>
                    <li style={{marginTop:10}} className="list-group-item d-flex justify-content-between align-items-center">
                        <div className="">
                                <p>Phone Number Verification</p>
                        </div>      
                        <div className="row">
                            <div className="col-lg-12">
                                <p>Ogunrinde Omotayo</p>
                            </div>
                        </div>
                    </li>
                    <li style={{marginTop:10}} className="list-group-item d-flex justify-content-between align-items-center">
                        <div className="">
                                <p>State</p>
                        </div>      
                        <div className="row">
                            <div className="col-lg-12">
                                <p>Ogunrinde Omotayo</p>
                            </div>
                        </div>
                    </li>
                  
                </ul>
                <div className="row" style={{marginTop:1}}> 
                    <div className="col-lg-12">
                        <button hidden ={IsConnecting} onClick = {connectLender} className="btn credit-btn mt-50" style={{color:'#fff'}} data-animation="fadeInDown" data-delay="700ms">Connect With Lender</button>
                        <Loader
                            visible={IsConnecting}
                            type="Puff"
                            color="#ffbb38"
                            height={30}
                            width={30}
                            timeout= {0} //3 secs
                    
                        />
                    </div>
                        
                </div>
            </div>
            
            }
            <div style={{textAlign:'center', marginTop:'50%'}}>
            <Loader
                visible={IsVaultFetching}
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

export default ViewVault;