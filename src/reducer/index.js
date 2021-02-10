import {
	GET_DATA, MORTGAGE_CALCULATOR,
} from '../action/actionTypes';

const initialState = {
	bankData: [],
	isValidation: false,
};

const resultArray = (mortMonth, rate, loanTerm, downPayment, initLoan) => {
	const array = [];
	const cost = +initLoan + +downPayment;
	for (let index = 1; index < loanTerm + 1; index++) {
		const interestPayment = ((initLoan * (rate / 100)) / 12).toFixed(2);
		const loanBalance = (initLoan - (mortMonth - interestPayment)).toFixed(2);
		const equity = (cost - loanBalance).toFixed(2);

		const element = {
			month: index,
			totalPayment: mortMonth,
			interestPayment,
			loanBalance,
			equity,
		};
		initLoan = loanBalance;
		array.push(element);
	}
	return array;
};

const mortCalculator = (state, { currentBank, initLoan, downPayment }) => {
	const { bankData } = state;
	let array;
	// eslint-disable-next-line no-restricted-properties
	const rate = Math.pow((1 + (currentBank.rate / 100) / 12), currentBank.loanTerm);
	const mortMonth = ((Number(initLoan) * ((currentBank.rate / 100) / 12) * rate) / (rate - 1)).toFixed(2);
	// eslint-disable-next-line prefer-const
	array =	resultArray(mortMonth,
		currentBank.rate,
		currentBank.loanTerm, downPayment, initLoan);

	return {
		...state,
		bankData,
		array,
		isValidation: true,
	};
};

const getData = (state, result) => ({
	...state,
	bankData: result,
});

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case MORTGAGE_CALCULATOR:
			return mortCalculator(state, action.payload);
		case GET_DATA:
			return getData(state, action.payload);
		default:
			return state;
	}
};

export default reducer;
