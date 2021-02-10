import React from 'react';
import './BankImage.css';

function BankImage({ bankImage }) {
	return (
		<div className="bankImage">
			<img src={bankImage} height="120px" width="120px"/>
		</div>
	);
}

export default BankImage;
