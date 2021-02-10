import { withRouter } from 'react-router';
import BankList from './components/BankList';
import './App.css';

function App({ history }) {
	return (
		<div className="app">
			<span className="text-banks"> Banks </span>
			<BankList />
			<img onClick={() => history.push('./CreateBank')}
				width="110px" height="110px" className="createBank" src="https://static.thenounproject.com/png/948521-200.png"/>
		</div>
	);
}

export default withRouter(App);
