import React, { useContext } from 'react';
import './History.css';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { getDataAction } from '../../action';
import { FirebaseContext } from '../../contexts';

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

const useStyles = makeStyles({
	table: {
		minWidth: 700,
	},
});

function History({ location, getDataResult, bankData }) {
	const firebase = useContext(FirebaseContext);
	if (!bankData) {
		firebase.getData().then((result) => {
			getDataResult(result);
		});
	}

	const { pathname } = location;

	const bankId = pathname.split('/')[2];
	let bankHistory;
	// 15
	bankData.forEach((element) => {
		if (bankId === element.id) {
			bankHistory = element.history;
		}
	});
	const classes = useStyles();
	return (
		<div className="showHistory">
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell> Bank Name </StyledTableCell>
							<StyledTableCell align="right"> Init Loan </StyledTableCell>
							<StyledTableCell align="right"> Down Payment </StyledTableCell>
							<StyledTableCell align="right"> Loan Term</StyledTableCell>
							<StyledTableCell align="right"> Status </StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{bankHistory.map((row) => (
							<StyledTableRow key={uuidv4()}>
								<StyledTableCell align="right">{row.name}</StyledTableCell>
								<StyledTableCell align="right">{row.initLoan}</StyledTableCell>
								<StyledTableCell align="right">{row.downPayment}</StyledTableCell>
								<StyledTableCell align="right">{row.loanTerm}</StyledTableCell>
								<StyledTableCell align="right">{row.isCheck}</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}

const mapStateToProps = ({ bankData }) => ({
	bankData,
});

const mapDispatchToProps = (dispatch) => ({
	getDataResult: (result) => dispatch(getDataAction(result)),
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(History));
