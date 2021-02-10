import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Calculator from '../../components/Calculator';
import './CalculatorPage.css';
import TableResult from '../../components/TableResult';

const CalculatorPage = () => {
	function Alert(props) {
		return <MuiAlert elevation={6} variant="filled" {...props} />;
	}
	const [open, setOpen] = React.useState(false);
	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};
	return (
		<div className="calculatorPage">
			<span className="calculatorText"> Mortgage Calculator </span>
			<div>
				< Calculator handleClick={handleClick}/>
				< TableResult />
				<Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={open} autoHideDuration={6000} onClose={handleClose}>
					<Alert onClose={handleClose} severity="success">
						Mortgage calculated successfully!
					</Alert>
				</Snackbar>
			</div>
		</div>
	);
};
export default CalculatorPage;
