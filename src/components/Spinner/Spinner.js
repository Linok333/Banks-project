import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import './Spinner.css';

function Spinner() {
	return (
		<div className="spinner">
			<CircularProgress disableShrink />;
		</div>
	);
}

export default Spinner;
