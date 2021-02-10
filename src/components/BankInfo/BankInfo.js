import React from 'react';
import './BankInfo.css';

function BankInfo({ bankInfo }) {
	return (
		<div className="bankInfo">
			<div className="block-info">
				<div className="innerBlock"> Interest rate:</div>
				<div> {bankInfo.rate}% </div>
			</div>

			<div className="block-info">
				<div className="innerBlock"> Maximum loan: </div>
				<div> {bankInfo.maxLoan}$ </div>
			</div>

			<div className="block-info">
				<div className="innerBlock"> Minimum down payment: </div>
				<div> {bankInfo.minPayment}%  </div>
			</div>

			<div className="block-info">
				<div className="innerBlock"> Loan term: </div>
				<div>  {bankInfo.loanTerm} month  </div>
			</div>
		</div>
	);
}

export default BankInfo;
