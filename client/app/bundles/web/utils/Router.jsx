import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Session from 'containers/Session';
import Login from 'containers/Login';
import Alert from 'containers/Alert';
import SportingGoodsIndex from 'containers/SportingGoodsIndex';

import { Signup } from 'components/Signup';

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
			<Session initialCurrentUser={ props.currentUser }/>
			<Alert/>
			<Route path="/signup" component={ Signup }/>
			<Route path="/login" component={ Login }/>
			<Route path="/sporting_goods" render={ () => {
				return protectedRoute(SportingGoodsIndex);
			}} />
		</div>
	);
	
};
