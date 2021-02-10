import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Button from '@material-ui/core/Button';
import { v4 as uuidv4 } from 'uuid';

import { FirebaseContext } from '../../contexts';
import { getDataAction } from '../../action';
import './BankForm.css';

const BankForm = ({
	getDataResult, bankData, history, location, isUpdate,
}) => {
	const firebase = useContext(FirebaseContext);
	const { pathname } = location;
	let bankObj = {
		name: 'PrivatBank',
		rate: '',
		maxLoan: '',
		minPayment: '',
		loanTerm: '1',
	};

	let button = 'Create';
	const bankId = pathname.split('/')[2];

	if (isUpdate) {
		button = 'Update';
		bankData.forEach((element) => {
			if (bankId === element.id) {
				bankObj = element;
			}
		});
	}
	const [name, setName] = useState(`${bankObj.name}`);
	const [rate, setRate] = useState(`${bankObj.rate}`);
	const [maxLoan, setMaxLoan] = useState(`${bankObj.maxLoan}`);
	const [minPayment, setMinPayment] = useState(`${bankObj.minPayment}`);
	const [loanTerm, setLoanTerm] = useState(`${bankObj.loanTerm}`);

	const optBank = [
		{ text: 'MonoBank', id: 1 },
		{ text: 'CredoBank', id: 2 },
		{ text: 'АlfaBank', id: 3 },
		{ text: 'PrivatBank', id: 4 },
		{ text: 'PraveksBank', id: 5 },
		{ text: 'OschadBank', id: 6 },
		{ text: 'ForwardBank', id: 7 },
	];
	const optName = [
		{ text: '1', id: 1 },
		{ text: '3', id: 2 },
		{ text: '5', id: 3 },
		{ text: '10', id: 4 },
		{ text: '15', id: 5 },
	];

	const banks = optBank.map((el) => (
		<option key={el.id} value={el.text}> {el.text} </option>
	));
	const names = optName.map((el) => (
		<option key={el.id} value={el.text}> {el.text} </option>
	));

	const onName = (e) => {
		setName(e.target.value);
	};

	const onRate = (e) => {
		setRate(e.target.value);
	};

	const onMaxLoan = (e) => {
		setMaxLoan(e.target.value);
	};

	const onMinPayment = (e) => {
		setMinPayment(e.target.value);
	};

	const onLoanTerm = (e) => {
		setLoanTerm(e.target.value);
	};

	const onSubmit = () => {
		if (rate && maxLoan && minPayment) {
			if (!isUpdate) {
				const bankD = bankData.find((elem) => elem.name === name);
				if (bankD) {
					alert('You already have this bank!');
				} else {
					firebase.addData({
						id: uuidv4(),
						name,
						image: 'https://cdn2.iconfinder.com/data/icons/banking-line-circle/614/944_-_Internet_Banking-512.png',
						rate: Number(rate),
						maxLoan: Number(maxLoan),
						minPayment: Number(minPayment),
						loanTerm: Number(loanTerm),
						history: [],
					});
					firebase.getData().then((result) => {
						getDataResult(result);
					});

					setName('');
					setRate('');
					setMaxLoan('');
					setMinPayment('');
					setLoanTerm('');
					history.push('/Banks');
				}
			} else {
				firebase.updateData(bankId, {
					id: bankId,
					name,
					image: bankObj.image,
					rate: Number(rate),
					maxLoan: Number(maxLoan),
					minPayment: Number(minPayment),
					loanTerm: Number(loanTerm),
					history: bankObj.history,
				});
				// firebase.getData().then((result) => {
				//	getDataResult(result);
				// });

				setName('');
				setRate('');
				setMaxLoan('');
				setMinPayment('');
				setLoanTerm('');
				history.push('/Banks');
			}
		} else {
			alert('Enter all data, please!');
		}
	};

	return (
		<div className="form-style1">
			<div className="style">
				<div className="text"> <span> Bank name:</span> </div>
				<div className="input">
					<select name="select" className="input2" onChange={onName} value={ name || 'MonoBank'}>
						{banks}
					</select>
				</div>
			</div>
			<div className="style">
				<div className="text"> <span> Interest rate: </span> </div>
				<div className="input">
					<input type="number" className="form-control input2" pattern="^[0-9]+$" placeholder="Enter please..." title="Используйте числовой формат" onChange={onRate} value={rate}/>
				</div>
			</div>
			<div className="style">
				<div className="text"> <span> Maximum loan:</span> </div>
				<div className="input">
					<input type="number" className="form-control input2" placeholder="Enter please..." onChange={onMaxLoan} value={maxLoan} />
				</div>
			</div>
			<div className="style">
				<div className="text"> <span> Min payment:</span> </div>
				<div className="input">
					<input type="number" className="form-control input2" placeholder="Enter please..." onChange={onMinPayment} value={minPayment}/>
				</div>
			</div>
			<div className="style">
				<div className="text" > <span> Loan term (months):</span> </div>
				<div className="input">
					<select name="select" className="input2" onChange={onLoanTerm} value={ loanTerm || '2'}>
						{names}
					</select>
				</div>
			</div>
			<div className="style4">
				<div className="buttonSubmit">
					<Button variant="contained" onClick={onSubmit} color="primary">
						{button}
					</Button>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = ({ bankData }) => ({
	bankData,
});

const mapDispatchToProps = (dispatch) => ({
	getDataResult: (obj) => dispatch(getDataAction(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BankForm));
