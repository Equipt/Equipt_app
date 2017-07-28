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
import Profile from 'containers/Profile';
import Alert from 'containers/Alert';
import FaceBook from 'containers/FaceBook';
import SportingGoodsIndex from 'containers/SportingGoodsIndex';
import SportingGoodsShow from 'containers/SportingGoodsShow';
import SportingGoodsNew from 'containers/owner/SportingGoodsNew';

export default (props, store) => {

	const isAuthenticated = () => {
		const state = store.getState();
		return !!state.session && state.session.token;
	}

	// Render Login if not authenticated
	const protectedRoute = (ProtectedComponent, AlternativeSessionComponent) => {
		if (isAuthenticated()) {
			return <ProtectedComponent { ...props }/>;
		} else {
			return 	<div>
						{  AlternativeSessionComponent ? <AlternativeSessionComponent { ...props }/> : <Login { ...props }/>}
						<FaceBook appId={ props.facebookAppId }/>
					</div>;
		}
	}

	return (
		<div className="main-wrapper">
			<Session { ...props }/>
			<Alert/>
			<Route path="(/|/home)" exact={ true } render={ () => {
				if (isAuthenticated()) {
					return <SportingGoodsIndex { ...props }/>;
				} else {
					return <Home { ...props }/>;
				}
			}}/>
			<Route path="/signup" render={ () => {
				if (isAuthenticated()) {
					return <SportingGoodsIndex { ...props }/>;
				} else {
					return (<div>
								<Signup { ...props }/>
								<FaceBook { ...props }/>
							</div>);
				}
			}}/>
			<Route path="/login" render={ () => {
				if (isAuthenticated()) {
					return <SportingGoodsIndex/>;
				} else {
					return (<div>
								<Login { ...props }/>
								<FaceBook { ...props }/>
							</div>);
				}
			}}/>
			<Route path="/forgot_password" component={ ForgotPassword }/>
			<Route path="/reset_password/:reset_token" component={ ResetPassword }/>
			<Switch>
				<Route path="/owner/sporting_goods/new" render={ () => {
					return protectedRoute(SportingGoodsNew);
				}}/>
				<Route path="/sporting_goods/:slug" render={ () => {
					return protectedRoute(SportingGoodsShow);
				}}/>
				<Route path="/sporting_goods" render={ () => {
					return protectedRoute(SportingGoodsIndex);
				}}/>
				<Route path="/profile" render={ () => {
					return protectedRoute(Profile);
				}}/>
			</Switch>
		</div>
	);
	
};
