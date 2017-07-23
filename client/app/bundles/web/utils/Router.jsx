import React from 'react';
import { Router, Route, Redirect, browserHistory, Switch } from 'react-router';

// Components
import Home from 'components/Home';

// Containers
import Session from 'containers/Session';
import Login from 'containers/Login';
import Signup from 'containers/Signup';
import ForgotPassword from 'containers/ForgotPassword';
import ResetPassword from 'containers/ResetPassword';
import Alert from 'containers/Alert';
import FaceBook from 'containers/FaceBook';
import SportingGoodsIndex from 'containers/SportingGoodsIndex';
import SportingGoodsShow from 'containers/SportingGoodsShow';

export default (props, store) => {

	const isAuthenticated = () => {
		const state = store.getState();
		return !!state.session && state.session.token;
	}

	// Render Login if not authenticated
	const protectedRoute = (ProtectedComponent, AlternativeSessionComponent) => {
		if (isAuthenticated()) {
			return <ProtectedComponent/>;
		} else {
			return 	<div>
						{  AlternativeSessionComponent ? <AlternativeSessionComponent/> : <Login/>}
						<FaceBook appId={ props.facebookAppId }/>
					</div>;
		}
	}

	return (
		<div>
			<Session/>
			<Alert/>
			<Route path="/home" render={ () => {
				if (isAuthenticated()) {
					return <SportingGoodsIndex/>;
				} else {
					return <Home/>;
				}
			}}/>
			<Route path="/signup" render={ () => {
				return protectedRoute(SportingGoodsIndex, Signup);
			}}/>
			<Route path="/login" render={ () => {
				return protectedRoute(SportingGoodsIndex);
			}}/>
			<Route path="/forgot_password" component={ ForgotPassword }/>
			<Route path="/reset_password/:reset_token" component={ ResetPassword }/>
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
