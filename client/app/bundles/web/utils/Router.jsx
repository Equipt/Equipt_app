import React from 'react';
import { Router, Route, Redirect, browserHistory, Switch } from 'react-router';

// Components
import Home from 'components/Home';

// Containers
import Session from 'containers/Session';
import Login from 'containers/Login';
import Signup from 'containers/Signup';
import Alert from 'containers/Alert';
import SportingGoodsIndex from 'containers/SportingGoodsIndex';
import SportingGoodsShow from 'containers/SportingGoodsShow';


export default (props, store) => {

	const isAuthenticated = () => {
		const state = store.getState();
		return !!state.session && state.session.token;
	}

	// Render Login if not authenticated
	const protectedRoute = (ProtectedComponent) => {
		if (isAuthenticated()) {
			return <ProtectedComponent/>;
		} else {
			return <Login/>;
		}
	}

	return (
		<div>
			<Session/>
			<Alert/>
			<Route path="/signup" component={ Signup }/>
			<Route path="/login" component={ Login }/>
			<Switch>
				<Route path="/sporting_goods/:slug" render={ () => {
					return protectedRoute(SportingGoodsShow);
				}}/>
				<Route path="/sporting_goods" render={ () => {
					return protectedRoute(SportingGoodsIndex);
				}}/>
			</Switch>
		</div>
	);
	
};
