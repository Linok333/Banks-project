import React, { useEffect, useContext, useState } from 'react';
import './BankList.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ArchiveIcon from '@material-ui/icons/Archive';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Bank from '../Bank';

import {
	getDataAction,
} from '../../action';
import Spinner from '../Spinner';
import { FirebaseContext } from '../../contexts';

const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(1),
	},
}));
function BankList({
	bankData,
	history,
	getDataResult,
}) {
	const classes = useStyles();
	const [isLoad, setIsLoad] = useState(false);

	const firebase = useContext(FirebaseContext);

	useEffect(() => {
		firebase.getData().then((result) => {
			setIsLoad(true);
			getDataResult(result);
		});
	}, []);

	const onDelete = (id) => {
		firebase.deleteData(id);
		firebase.getData().then((result) => {
			getDataResult(result);
		});
	};

	const bank = bankData.map((bankObj) => (
		<div key={bankObj.id}>
			<div className="bankList">
				<Bank bankObj={bankObj}/>
			</div>
			<Button onClick={() => onDelete(bankObj.id)} variant="contained" color="secondary"
				className={classes.button} startIcon={<DeleteIcon />}>
				Delete
			</Button>
			<Button onClick={() => history.push(`/UpdateBank/${bankObj.id}`)} variant="contained" color="primary"
				className={classes.button} endIcon={< EditIcon/>}>
				Update
			</Button>
			<Button onClick={() => history.push(`/ShowHistory/${bankObj.id}`)}
				variant="contained"
				color="default"
				className={classes.button}
				startIcon={<ArchiveIcon />}>
				Show
			</Button>
		</div>

	));
	return (
		<>
			{isLoad ? (<div>
				{bank}
			</div>) : (<Spinner />) }
		</>
	);
}

const mapStateToProps = ({ bankData }) => ({
	bankData,
});

const mapDispatchToProps = (dispatch) => ({
	getDataResult: (result) => dispatch(getDataAction(result)),

});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BankList));
