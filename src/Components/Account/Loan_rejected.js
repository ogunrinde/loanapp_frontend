import React from 'react';
import Header from './Header';
import BasicInfo from './basicInfo';
//import Office from './officeInfo';
import { Link } from 'react-router-dom';
import '../../css/css/analytics.css'
import Footer from './Footer';
import Analytics from '../analytics';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faTrash, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import SureRequest from './sureRequest';
import Loader from 'react-loader-spinner';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import {useSelector, useDispatch } from 'react-redux';

const LoanRejected = (props) => 
{
	const dispatch = useDispatch();
	const IsFetching = useSelector(state => state.root.IsFetching);
    
    return(
        <div>
            <Header />
		<div className="container">
		    <Analytics />
		</div>
		<div hidden ={true} style={{position:'fixed',right:0,top:0,width:'50%',height:'100%',overflowY:'scroll',zIndex:4000343005,backgroundColor:'#f1f7f9',padding:10}}>
				<div>
					<a className="pull-right">
					<FontAwesomeIcon icon={faTimesCircle} style={{color:'red',fontSize:25}} />
					</a>
				</div>
				<div className="">
					<div id="user">
						<SureRequest level = {true} />
					</div>
				</div>
		</div>       
        <div className="container" style={{marginBottom:30}}>
		<div className="row" style={{marginBottom:25}}>
			<div className="col-xl-12">
			<div className="filter-bar d-flex flex-wrap align-items-center">
					<div className="sorting">
						<select className="form-control">
							<option value="1">Default sorting</option>
							<option value="1">Default sorting</option>
							<option value="1">Default sorting</option>
						</select>
					</div>
					<div className="sorting mr-auto">
						<select className="form-control">
							<option value="1">Show 12</option>
							<option value="1">Show 12</option>
							<option value="1">Show 12</option>
						</select>
					</div>
					
				</div>
			</div>
		</div>
		<div className="row">
			<div className="col-xl-3 col-lg-4 col-md-5">
				<div className="sidebar-categories">
					<div className="head">Browse Categories</div>
					<ul className="main-categories">
						<li className="main-nav-list"><a data-toggle="collapse" href="#fruitsVegetable" aria-expanded="false" aria-controls="fruitsVegetable"><span
								 className="lnr lnr-arrow-right"></span>Home<span className="number">(53)</span></a>
							<ul className="collapse" id="fruitsVegetable" data-toggle="collapse" aria-expanded="false" aria-controls="fruitsVegetable">
								<li className="main-nav-list child"><a href="#">Frozen Fish<span className="number">(13)</span></a></li>
								<li className="main-nav-list child"><a href="#">Dried Fish<span className="number">(09)</span></a></li>
								<li className="main-nav-list child"><a href="#">Fresh Fish<span className="number">(17)</span></a></li>
								<li className="main-nav-list child"><a href="#">Meat Alternatives<span className="number">(01)</span></a></li>
								<li className="main-nav-list child"><a href="#">Meat<span className="number">(11)</span></a></li>
							</ul>
						</li>

						<li className="main-nav-list"><a data-toggle="collapse" href="#meatFish" aria-expanded="false" aria-controls="meatFish"><span
								 className="lnr lnr-arrow-right"></span>Loan</a>
							<ul className="collapse" id="meatFish" data-toggle="collapse" aria-expanded="false" aria-controls="meatFish">
								<li className="main-nav-list child"><a href="#">Loan Approval</a></li>
								<li className="main-nav-list child"><a href="#">To be Disbursed<span className="number">(09)</span></a></li>
								<li className="main-nav-list child"><a href="#">Loan Disbursed<span className="number">(17)</span></a></li>
								<li className="main-nav-list child"><a href="#">Loan Rejected<span className="number">(01)</span></a></li>
							</ul>
						</li>

						<li className="main-nav-list"><a data-toggle="collapse" href="#meatFish" aria-expanded="false" aria-controls="meatFish"><span
								 className="lnr lnr-arrow-right"></span>Vault</a>
							<ul className="collapse" id="meatFish" data-toggle="collapse" aria-expanded="false" aria-controls="meatFish">
								<li className="main-nav-list child"><a href="#">Vault History</a></li>
								<li className="main-nav-list child"><a href="#">Current Vault</a></li>
							</ul>
						</li>

						<li className="main-nav-list"><a data-toggle="collapse" href="#meatFish" aria-expanded="false" aria-controls="meatFish"><span
								 className="lnr lnr-arrow-right"></span>Transactions</a>
							<ul className="collapse" id="meatFish" data-toggle="collapse" aria-expanded="false" aria-controls="meatFish">
								<li className="main-nav-list child"><a href="#">View</a></li>
								<li className="main-nav-list child"><a href="#">Current Vault</a></li>
							</ul>
						</li>
						
					</ul>
				</div>
			
			</div>
			<div className="col-xl-9 col-lg-8 col-md-7" style={{border:'1px solid #eee'}}>
				
			
				<section className="lattest-product-area pb-40 category-list">
				<div className="table-responsive ">
                    <table className="table">
                        <thead>
                            <tr className="filter-bar" style={{color:'#fff'}}>
                                <th scope="col">Loan ID</th>
                                <th scope="col">Borrower Name</th>
                                <th scope="col">Repayment Plan</th>
                                <th scope="col">Request Date</th>
								<th scope="col">Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="media">
                                       
                                        <div className="media-body">
                                            <p>LON-2y3u34j3</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <h5>Daddy Cool</h5>
                                </td>
                                <td>
                                    23,000 (Monthly)
                                </td>
                                <td>
                                    <h5>2020-02-02</h5>
                                </td>
								<td>
								    <a href="#" style={{padding:7,color:'#fff',background:'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)',borderRadius:7}}>View Profile</a>
                                
                                </td>
                            </tr>
							<tr>
                                <td>
                                    <div className="media">
                                       
                                        <div className="media-body">
                                            <p>LON-2y3u34j3</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <h5>Daddy Cool</h5>
                                </td>
                                <td>
                                    23,000 (Monthly)
                                </td>
                                <td>
                                    <h5>2020-02-02</h5>
                                </td>
								<td>
								    <a href="#" style={{padding:7,color:'#fff',background:'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)',borderRadius:7}}>View Profile</a>
                                
                                </td>
                            </tr>
                           
                        </tbody>   
                       
				    </table>
                </div>
				</section>
				
			</div>
		</div>
	</div>
            <Footer />
           
        </div>
        
    );
}

export default LoanRejected;