import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { mortCalculatorAction, getDataAction } from '../../action';

import './Calculator.css';
import Spinner from '../Spinner';
import { FirebaseContext } from '../../contexts';

const Calculator = ({
	bankData, handleClick, mortCalculator, getDataResult,
}) => {
	// 15
	const firebase = useContext(FirebaseContext);
	if (bankData.length === 0) {
		firebase.getData().then((result) => {
			getDataResult(result);
		});
	}

	const bankNames = bankData.length && bankData.map((el) => (
		<option key={el.id} value={el.name}> {el.name} </option>
	));

	const [initLoan, setInitLoan] = useState('');
	const [downPayment, setDownPayment] = useState('');
	const [bankName, setBankName] = useState(`${bankData[0] && bankData[0].name}`);

	const onBankName = (e) => {
		setBankName(e.target.value);
	};

	const onInitLoan = (e) => {
		setInitLoan(e.target.value);
	};

	const onDownPayment = (e) => {
		setDownPayment(e.target.value);
	};

	const onSubmit = () => {
		if (bankName && initLoan && downPayment) {
			let currentBank;
			// r
			bankData.forEach((bankObj) => {
				if (bankName === bankObj.name) {
					currentBank = bankObj;
				}
			});

			if (currentBank.maxLoan > initLoan) {
				const bankPayment = (initLoan * currentBank.minPayment) / 100;

				if (bankPayment <= Number(downPayment)) {
					mortCalculator({
						currentBank,
						initLoan,
						downPayment,
					});
					const obj = {
						name: currentBank.name,
						initLoan,
						downPayment,
						loanTerm: currentBank.loanTerm,
						isCheck: 'S',
					};
					currentBank.history.push(obj);

					firebase.updateData(currentBank.id, {
						id: currentBank.id,
						name: currentBank.name,
						image: currentBank.image,
						rate: currentBank.rate,
						maxLoan: currentBank.maxLoan,
						minPayment: currentBank.minPayment,
						loanTerm: currentBank.loanTerm,
						history: currentBank.history,
					});

					firebase.getData().then((result) => {
						getDataResult(result);
					});
					handleClick();
					setBankName('');
					setInitLoan('');
					setDownPayment('');
				} else {
					const obj = {
						name: currentBank.name,
						initLoan,
						downPayment,
						loanTerm: currentBank.loanTerm,
						isCheck: 'F',
					};
					currentBank.history.push(obj);
					firebase.updateData(currentBank.id, {
						id: currentBank.id,
						name: currentBank.name,
						image: currentBank.image,
						rate: currentBank.rate,
						maxLoan: currentBank.maxLoan,
						minPayment: currentBank.minPayment,
						loanTerm: currentBank.loanTerm,
						history: currentBank.history,

					});
					firebase.getData().then((result) => {
						getDataResult(result);
					});
					handleClick();
					setBankName('');
					setInitLoan('');
					setDownPayment('');

					alert('This mortgage is impossible!');
				}
			} else {
				alert("Bank don't have enough money!");
			}
		} else {
			alert('Enter all data, please!');
		}
	};

	return (
		<>
			{ bankData.length ? (<div className="form-calculate">
				<div className="block-calculate">
					<div className="textCalculate" > <span> Bank Name:</span> </div>
					<div className="block-input">
						<select name="select" className="input-value" onChange={onBankName} value={bankName}>
							{bankNames}
						</select>
					</div>
				</div>
				<div className="block-calculate">
					<div className="textCalculate"> <span> Initial loan:</span> </div>
					<div className="block-input">
						<input type="number" className="form-control input-value" placeholder="Enter please..." onChange={onInitLoan} value={initLoan} />
					</div>
				</div>

				<div className="block-calculate">
					<div className="textCalculate"> <span> Down payment:</span> </div>
					<div className="block-input">
						<input type="number" className="form-control input-value" placeholder="Enter please..." onChange={onDownPayment} value={downPayment} />
					</div>
				</div>
				<div className="buttonCheck">
					<div className="buttonSubmit">
						<Button variant="contained" onClick={onSubmit} color="primary">
							Check
						</Button>
					</div>
				</div>
			</div>) : (< Spinner />)}
		</>
	);
};

const mapStateToProps = ({ bankData, isValidation }) => ({
	bankData, isValidation,
});

const mapDispatchToProps = (dispatch) => ({
	mortCalculator: (obj) => dispatch(mortCalculatorAction(obj)),
	getDataResult: (result) => dispatch(getDataAction(result)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);
