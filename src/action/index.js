import {
	GET_DATA, MORTGAGE_CALCULATOR,
} from './actionTypes';

const mortCalculatorAction = (obj) => ({
	type: MORTGAGE_CALCULATOR,
	payload: obj,
});

const getDataAction = (result) => ({
	type: GET_DATA,
	payload: result,
});

export {
	mortCalculatorAction,
	getDataAction,
};
