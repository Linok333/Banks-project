import React from 'react';
import './TableResult.css';
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

function TableResult({ array, isValidation }) {
	const classes = useStyles();
	if (isValidation) {
		return (
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell> Month </StyledTableCell>
							<StyledTableCell align="right"> Total payment </StyledTableCell>
							<StyledTableCell align="right"> Interest payment </StyledTableCell>
							<StyledTableCell align="right"> Loan balance </StyledTableCell>
							<StyledTableCell align="right"> Equity</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{array.map((row) => (
							<StyledTableRow key={row.month}>
								<StyledTableCell align="right">{row.month}</StyledTableCell>
								<StyledTableCell align="right">{row.totalPayment}</StyledTableCell>
								<StyledTableCell align="right">{row.interestPayment}</StyledTableCell>
								<StyledTableCell align="right">{row.loanBalance}</StyledTableCell>
								<StyledTableCell align="right">{row.equity}</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		);
	}

	return null;
}

const mapStateToProps = ({ bankData, array, isValidation }) => ({
	bankData, array, isValidation,
});

export default connect(mapStateToProps)(withRouter(TableResult));
