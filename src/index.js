import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import Navbar from './components/Navbar';
import Main from './Pages/Main';
import CreatePage from './Pages/CreatePage';
import UpdatePage from './Pages/UpdatePage';
import CalculatorPage from './Pages/CalculatorPage/CalculatorPage';
import ShowHistory from './Pages/ShowHistory';
import ChartsPage from './Pages/ChartsPage';
import { Firebase } from './components/lib/firebase.prod';
import { FirebaseContext } from './contexts';

ReactDOM.render(
	<Provider store={store}>
		<FirebaseContext.Provider value={new Firebase()}>
			<Router>
				<Navbar/>
				<Route path="/Banks" component={App}/>
				<Route path="/" exact component={Main}/>
				<Route path="/CreateBank" component={CreatePage}/>
				<Route path="/UpdateBank/:id" component={UpdatePage}/>
				<Route path="/CalculatorPage" component={CalculatorPage}/>
				<Route path="/ShowHistory/:id" component={ShowHistory}/>
				<Route path="/Charts" component={ChartsPage}/>
			</Router>
		</FirebaseContext.Provider>
	</Provider>,

	document.getElementById('root'),
);
