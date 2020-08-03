import React, {} from 'react';
import { Link } from 'react-router-dom';
 

const Sidebar = () => 
{
    return (
        <div className="sidebar-categories">
					<div className="head">Surebanker Activities</div>
					<ul className="main-categories">
						<li className="main-nav-list"><a data-toggle="collapse" href="#fruitsVegetable" aria-expanded="false" aria-controls="fruitsVegetable"><span
								 className="lnr lnr-arrow-right"></span>Home<span className="number"></span></a>
							<ul className="collapse" id="fruitsVegetable" data-toggle="collapse" aria-expanded="false" aria-controls="fruitsVegetable">
								
							</ul>
						</li>

						<li className="main-nav-list"><a data-toggle="collapse" href="#meatFish" aria-expanded="false" aria-controls="meatFish"><span
								 className="lnr lnr-arrow-right"></span>Loan</a>
							<ul className="collapse" id="meatFish" data-toggle="collapse" aria-expanded="false" aria-controls="meatFish">
								<li className="main-nav-list child"><Link to="/pendingapproval">Loan Approval</Link></li>
								<li className="main-nav-list child"><Link to="/loan_todisbursed">To be Disbursed<span className="number"></span></Link></li>
								<li className="main-nav-list child"><Link to="/loan_disbursed">Loan Disbursed<span className="number"></span></Link></li>
								<li className="main-nav-list child"><Link to="/loan_rejected">Loan Rejected<span className="number"></span></Link></li>
							</ul>
						</li>

						<li className="main-nav-list"><a data-toggle="collapse" href="#meatFish" aria-expanded="false" aria-controls="meatFish"><span
								 className="lnr lnr-arrow-right"></span>Vault</a>
							<ul className="collapse" id="meatFish" data-toggle="collapse" aria-expanded="false" aria-controls="meatFish">
								<li className="main-nav-list child"><Link to ="/vaultHistory">Vault History</Link></li>
								<li className="main-nav-list child"><Link to ="/currentVault">Current Vault</Link></li>
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
			
    );
}

export default Sidebar;