import './Charts.css';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { getDataAction } from '../../action';
import Spinner from '../Spinner';
import { FirebaseContext } from '../../contexts';

const loan = {
	chart: {
		type: 'pie',
	},
	title: {
		text: 'Loan Banks',
	},
	accessibility: {
		announceNewData: {
			enabled: true,
		},
		point: {
			valueSuffix: '%',
		},
	},
	plotOptions: {
		series: {
			dataLabels: {
				enabled: true,
				format: '{point.name}: {point.y:.1f}$',
			},
		},
	},
};

const rate = {
	chart: {
		type: 'column',
	},
	title: {
		text: 'Interest rate of banks, 2021',
	},
	xAxis: {
		type: 'category',
	},
	yAxis: {
		title: {
			text: 'Total procent',
		},
	},
	legend: {
		enabled: false,
	},
	plotOptions: {
		series: {
			borderWidth: 0,
			dataLabels: {
				enabled: true,
				format: '{point.y:.1f}%',
			},
		},
	},
};

const term = {
	chart: {
		type: 'pie',
	},
	title: {
		text: 'Loan Term',
	},
	accessibility: {
		announceNewData: {
			enabled: true,
		},
		point: {
			valueSuffix: '%',
		},
	},
	plotOptions: {
		series: {
			dataLabels: {
				enabled: true,
				format: '{point.name}: {point.y:.1f} month',
			},
		},
	},
};

const payment = {
	chart: {
		type: 'column',
	},
	title: {
		text: 'Down Payment of banks, 2021',
	},
	xAxis: {
		type: 'category',
	},
	yAxis: {
		title: {
			text: 'Total procent',
		},
	},
	legend: {
		enabled: false,
	},
	plotOptions: {
		series: {
			borderWidth: 0,
			dataLabels: {
				enabled: true,
				format: '{point.y:.1f}%',
			},
		},
	},
};

function Charts({ bankData, getDataResult }) {
	const firebase = useContext(FirebaseContext);
	useEffect(() => {
		if (bankData.length === 0) {
			firebase.getData().then((result) => {
				getDataResult(result);
			});
		}
	}, []);

	const dataLoan = [];
	if (bankData.length) {
		bankData.forEach((bankObj) => {
			const obj = {
				name: bankObj.name,
				y: bankObj.maxLoan,
			};
			dataLoan.push(obj);
		});
	}
	const seriesLoan = [
		{
			name: 'Max Loan',
			colorByPoint: true,
			data: dataLoan,
		},
	];
	loan.series = seriesLoan;

	const dataRate = [];
	if (bankData.length) {
		bankData.forEach((bankObj) => {
			const obj = {
				name: bankObj.name,
				y: bankObj.rate,
			};
			dataRate.push(obj);
		});
	}

	const seriesRate = [
		{
			name: 'Banks Rate',
			colorByPoint: true,
			data: dataRate,
		},
	];
	rate.series = seriesRate;

	const dataTerm = [];
	if (bankData.length) {
		bankData.forEach((bankObj) => {
			const obj = {
				name: bankObj.name,
				y: bankObj.loanTerm,
			};
			dataTerm.push(obj);
		});
	}
	const seriesTerm = [
		{
			name: 'Max Loan',
			colorByPoint: true,
			data: dataTerm,
		},
	];
	term.series = seriesTerm;

	const dataPayment = [];
	if (bankData.length) {
		bankData.forEach((bankObj) => {
			const obj = {
				name: bankObj.name,
				y: bankObj.minPayment,
			};
			dataPayment.push(obj);
		});
	}

	const seriesPayment = [
		{
			name: 'Payment',
			colorByPoint: true,
			data: dataPayment,
		},
	];
	payment.series = seriesPayment;

	return (
		<>
			{bankData.length ? (
				<div className="charts">
					<div className="block-chart">
						<HighchartsReact highcharts={Highcharts} options={loan} />
						<div className="chart">
							<HighchartsReact highcharts={Highcharts} options={rate} />
						</div>
					</div>

					<div className="block-chart">
						<HighchartsReact highcharts={Highcharts} options={payment} />
						<div className="chart">
							<HighchartsReact highcharts={Highcharts} options={term} />
						</div>
					</div>
				</div>
			) : <Spinner />}
		</>
	);
}

const mapStateToProps = ({ bankData }) => ({
	bankData,
});

const mapDispatchToProps = (dispatch) => ({
	getDataResult: (result) => dispatch(getDataAction(result)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Charts);
