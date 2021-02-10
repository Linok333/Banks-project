import React from 'react';
import { connect } from 'react-redux';

import './Bank.css';
import BankImage from '../BankImage';
import BankDetails from '../BankDetails';

function Bank({ bankObj }) {
	return (
		<div className="bank">
			<BankImage bankImage={bankObj.image}/>
			<BankDetails bankObj={bankObj}/>
		</div>
	);
}

const mapStateToProps = ({ bankData }) => ({
	bankData,
});

// const mapDispatchToProps = (dispatch) => ({

// });
export default connect(mapStateToProps)(Bank);
