import React, {useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import $ from 'jquery';
import '../../css/account/custom.css';
import { GetTransactions } from '../redux/action/index';
import Loader from 'react-loader-spinner';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import { useForm } from 'react-hook-form';
import '../../css/css/profile.css';

const Transaction = (props) => {

	const [IsFetchingTransaction, setIsFetchingTransaction] = useState(false);
	const { handleSubmit, register, errors } = useForm();
	const dispatch = useDispatch();
    const transactions = useSelector(state => state.root.transactions);
    const month = useSelector(state => state.root.month);
    const [IsSubmitting, setIsSubmitting] = useState(false);
    const surevault = props.surevault;
	const onSubmit = data => {
        
	}
    useEffect(() =>{
		getVaultTransaction();
    },[]);

    if(IsFetchingTransaction == false || IsFetchingTransaction == true)
    {
		//console.log(request);
        $('ul.tabs li').click(function(){
			var tab_id = $(this).attr('data-tab');
			$('ul.tabs li').removeClass('current');
			$('.tab-content').removeClass('current');

			$(this).addClass('current');
			$("#"+tab_id).addClass('current');
		});
	}
	const getVaultTransaction = async () => {
        setIsFetchingTransaction(true);
		await dispatch(GetTransactions(props.surevault.id));
		setIsFetchingTransaction(false);
		
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
        <div hidden = {IsFetchingTransaction} className="profile-main">
		<ReactNotification />	
		<div className="profile-header">
		
            <div className="tab-panel-main">
				<ul className="tabs">
					<li  className="tab-link current" data-tab="officeaddress">Vault Information</li>
					<li  className="tab-link" data-tab="Edu-detail">Transactions</li>
				</ul>
				<div id="officeaddress" className="tab-content current">
                    <div className="bio-box">
						<div className="heading">
							<p>Amount In Vault</p>
						</div>
						<div className="desc">
                            {surevault.fundamount.toLocaleString()}
						</div>
					</div>
					<div className="bio-box">
						<div className="heading">
							<p>Available from</p>
						</div>
						<div className="desc">
                            {FormatDate(surevault.availablefrom)}
						</div>
					</div>
					<div className="bio-box">
						<div className="heading">
							<p>Available To</p>
						</div>
						<div className="desc">
                            {FormatDate(surevault.availableto)}
						</div>
					</div>
					<div className="bio-box">
						<div className="heading">
							<p>Maximum Request Amount</p>
						</div>
						<div className="desc">
							{surevault.maxRequestAmount.toLocaleString()}
						</div>
					</div>
					<div className="bio-box">
						<div className="heading">
							<p>Minimum Request Amount</p>
						</div>
						<div className="desc">
							{surevault.minRequestAmount.toLocaleString()}
						</div>
					</div>
                    <div className="bio-box">
						<div className="heading">
							<p>Minimum Interest per Month</p>
						</div>
						<div className="desc">
							{surevault.minInterestperMonth}%
						</div>
					</div>
                    <div className="bio-box">
						<div className="heading">
							<p>Maximum Interest per Month</p>
						</div>
						<div className="desc">
							{surevault.maxInterestperMonth}%
						</div>
					</div>
					
				</div>
				
				<div id="Edu-detail" className="tab-content" style={{width:'100%'}}>
               
                <div className="table-responsive ">
                    <table className="table" style={{width:'100%'}}>
                        <thead>
                            <tr className="filter-bar" style={{color:'#fff'}}>
                                <th scope="col">S/N</th>
                                <th scope="col">Amount Witdrawn</th>
                                <th scope="col">Borrower Name</th>
                                <th scope="col">Date Created</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            transactions.map((trans,id) =>
                            <tr>
                                <td>
                                    <p>{id+1}</p>
                                </td>
                                <td>
                                    <div className="media">
                                    
                                        <div className="media-body">
                                            <p>{trans.Amount_withdrawn}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <p>Name</p>
                                </td>
                                <td>
                                    <p>{surevault.created_at}</p>
                                </td>
                                
                            </tr>
                            )
                        }    
                        
                            
					
                        </tbody>   
                       
				    </table>
                    {
                            transactions.length == 0 &&
                            <div style={{textAlign:'center', marginTop:20,width:'100%'}}>No Data Found</div>
                    }
                </div>
                
				</div>
			</div>
		</div>
	    </div>
		<div style={{textAlign:'center',marginTop:'35%'}}>
			<Loader
				visible={IsFetchingTransaction}
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

export default Transaction;
