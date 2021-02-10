import React from 'react';
import './BankName.css';

function BankName({ bankName }) {
	return (
		<div className="bankName">
			{bankName}
		</div>
	);
}

export default BankName;
