import React from 'react';
import BankName from '../BankName';
import BankInfo from '../BankInfo';

import './BankDetails.css';

function BankDetails({ bankObj }) {
	return (
		<div className="bankDetails">
			< BankName bankName={bankObj.name}/>
			< BankInfo bankInfo={bankObj}/>
		</div>
	);
}

export default BankDetails;
