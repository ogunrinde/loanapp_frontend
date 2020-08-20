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
	const [IsWithdrawing, setIsWithdrawing] = useState(false);
	const surevault = props.surevault;
	const [borrowed, setborrowed] = useState(0);
	const [self, setself] = useState(0);
	const onSubmit = data => {
        
	}
    useEffect(() =>{
		getVaultTransaction();
    },[props.surevault]);

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

		if(transactions != null && transactions.length > 0)
		{
			let borrow = 0;
			let self = 0;
			transactions.forEach(function(trans){
				if(trans.vault_withdrawal_type == 'borrow')
				{
					borrow = borrow + parseFloat(trans.Amount_withdrawn);
				}
				else {
                   self = self + parseFloat(trans.Amount_withdrawn);
				}
			});
			setborrowed(borrow);
			setself(self);
		}
		
    }
    
    const FormatDate = (date) => {
		let d = date.split('-');
        let day = d[2];
        let mth = month[parseInt(d[1])-1];
        let year = d[0];
        return `${day} ${mth}, ${year}`;
	}
	
	const FormatDate2 = (date) => {
		let d = new Date(date).toString();
		d = d.split('G')[0];
		//alert(new Date(date));
        //let day = d[2];
        //let mth = month[parseInt(d[1])-1];
        //let year = d[0];
		//return `${day} ${mth}, ${year}`;
		return d;
    }

    return(
		<div>	
        <div hidden = {IsFetchingTransaction} className="profile-main">
		<ReactNotification />	
		<section className="features-area section_gap">
			<div className="container">
				<div className="row features-inner">
					<div className="col-lg-6 col-md-6 col-sm-6">
						<div className="single-features">
							<div className="f-icon">
							<h3>{borrowed.toLocaleString()}</h3>
							</div>
							<h6>Total Lend to Borrower</h6>
							
						</div>
					</div>
					<div className="col-lg-6 col-md-6 col-sm-6">
						<div className="single-features" style={{borderRight:'none'}}>
							<div className="f-icon">
							<h3>{self.toLocaleString()}</h3>
							</div>
							<h6>Total Withdrew for Self</h6>
							
						</div>
					</div>
					
				</div>
			</div>
		</section>
		<div className="profile-header">
		
            <div className="tab-panel-main">
				<ul className="tabs">
					<li  className="tab-link current" data-tab="officeaddress">Vault Information</li>
					<li  className="tab-link" data-tab="Edu-detail">Transactions</li>
					<li  className="tab-link" data-tab="tobewithdraw">Withdraw from Vault </li>
				</ul>
				<div id="officeaddress" className="tab-content current">
                    <div className="bio-box">
						<div className="heading">
							<p>Amount In Vault</p>
						</div>
						<div className="desc">
                            NGN {surevault.fundamount.toLocaleString()}
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
							NGN {surevault.maxRequestAmount.toLocaleString()}
						</div>
					</div>
					<div className="bio-box">
						<div className="heading">
							<p>Minimum Request Amount</p>
						</div>
						<div className="desc">
							NGN {surevault.minRequestAmount.toLocaleString()}
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
                                <th scope="col">Amount Withdrawn</th>
                                <th scope="col">Withdrawal Type</th>
                                <th scope="col">Withdrawal Date</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            transactions.map((trans,id) =>
                            <tr>
                                <td>
                                    {id+1}
                                </td>
                                <td>
                                    <div className="media">
                                    
                                        <div className="media-body">
                                            {trans.Amount_withdrawn}
                                        </div>
                                    </div>
                                </td>
								<td>
                                    {trans.vault_withdrawal_type}
                                </td>
                                <td>
                                    {FormatDate2(trans.created_at)}
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
			    <div id="tobewithdraw" className="tab-content">
					<div className=""> 
					<div id="">
					<form onSubmit={handleSubmit(onSubmit)}>
					<div className = "row" style={{marginTop:20}}>
						<div className="col-md-12 col-lg-12 col-sm-12">
						<div class="form-group">
							<label for="exampleInputEmail1" style={{fontSize:13}}>Amount to Withdraw</label>
							<input 
								style={{fontSize:14, borderColor:'#f1f7f9'}}
								type="number"
								name="Amount_withdrawn"
								class="form-control" 
								id="exampleInputEmail1" 
								aria-describedby="emailHelp" 
								placeholder=""
								ref={register({
									required: "Required"
								})}
							/>
							<small className="text-danger">{errors.Amount_withdrawn?.type == "required" && "Amount to Withdraw is required"}</small>
						</div>
						</div>
					</div>	
			
					<button hidden={IsWithdrawing} type="submit" style={{padding:5,marginTop:20,color:'#fff',background:'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)',borderRadius:3}}>Withdraw Cash</button>
				    <Loader
						visible={IsWithdrawing}
						type="Puff"
						color="#ffbb38"
						height={30}
						width={30}
						timeout= {0} //3 secs
				
					/>
					</form>
					</div>
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
