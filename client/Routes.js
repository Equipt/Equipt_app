import React from 'react';
import { Router, Route, Redirect, browserHistory, Switch } from 'react-router';

import GlobalStyles from 'assets/global-styles.js';

// Transition Component
import { RouteTransition } from 'react-router-transition';

import SportingGoodsIndex from 'SportingGoodsIndex';
import SportingGoodsShow from 'SportingGoodsShow';
import Session from 'Session';
import Login from 'Login';
import Alert from 'Alert';
import Loader from 'Loader';
import Signup from 'Signup';
import Modal from 'Modal';
import ForgotPassword from 'ForgotPassword';
import ResetPassword from 'ResetPassword';
import Profile from 'Profile';

// Components
import Home from 'components/Home';
import NotFoundPage from 'components/NotFoundPage';
import Footer from 'components/Footer';
import About from 'components/About';
import HowItWorks from 'components/HowItWorks';
import Nav from 'components/Nav';
import MobileNav from 'components/MobileNav';
import SideBar from 'components/SideBar';

// Containers
// import OwnersSportingGoodsEdit from 'containers/owner/OwnersSportingGoodsEdit';
// import OwnersRentalsShow from 'containers/owner/OwnersRentalsShow';
// import SportingGoodsNew from 'containers/owner/SportingGoodsNew';
// import OwnersSchedule from 'containers/owner/OwnersSchedule';
// import RentalsShow from 'containers/RentalsShow';

import ReportABug from 'containers/ReportABug';

export default (props) => {

	const isAuthenticated = () => {
		const state = props.store.getState();
		return !!state.session && state.session.token;
	}

	// Render Login if not authenticated
	const protectedRoute = (ProtectedComponent, AlternativeSessionComponent) => {
		if (isAuthenticated()) {
			return <ProtectedComponent { ...props }/>;
		} else {
			return AlternativeSessionComponent ? <AlternativeSessionComponent { ...props }/> : <Login { ...props }/>;
		}
	}

	return (
		<Route path="/">
			<div className="main-wrapper" id="mainWrapper">
				<Session { ...props }>
					<Nav/>
					<MobileNav/>
					<SideBar/>
				</Session>
				<GlobalStyles />
				<Alert/>
				<Modal/>
				<Loader/>
				<Route render={({ location }) => (
					<Switch key={location.key} location={location}>
						<Route path="(/|/home)" exact={ true } render={ () => {
							return protectedRoute(SportingGoodsIndex, Home);
						}}/>
						<Route path="/signup" render={ () => {
							return protectedRoute(SportingGoodsIndex, Signup);
						}}/>
						<Route path="/login" render={ () => {
							return protectedRoute(SportingGoodsIndex);
						}}/>

						<Route path="/forgot_password" component={ ForgotPassword }/>
						<Route path="/reset_password/:reset_token" component={ ResetPassword }/>

						<Route exact path="/sporting_goods/:slug/rentals/:id" render={ () => {
							return protectedRoute(RentalsShow);
						}}/>
						<Route exact path="/owner/sporting_goods/:slug/rentals/:id" render={ () => {
							return protectedRoute(OwnersRentalsShow);
						}}/>
						<Route exact path="/owner/sporting_goods/:slug/edit" render={ () => {
							// return protectedRoute(OwnersSportingGoodsEdit);
						}}/>
						<Route exact path="/owner/sporting_goods/new" render={ () => {
							// return protectedRoute(SportingGoodsNew);
						}}/>
						<Route exact path="/owner/sporting_goods" render={ () => {
							return protectedRoute(SportingGoodsIndex);
						}}/>
						<Route exact path="/owner/sporting_goods/:slug" render={ (props) => {
							return protectedRoute(SportingGoodsShow);
						}}/>
						<Route exact path="/owner/schedule" render={ () => {
							return protectedRoute(OwnersSchedule);
						}}/>
						<Route exact path="/sporting_goods/:slug" render={ () => {
							return protectedRoute(SportingGoodsShow);
						}}/>
						<Route exact path="/sporting_goods" render={ () => {
							return protectedRoute(SportingGoodsIndex);
						}}/>
						<Route exact path="/profile" render={ () => {
							return protectedRoute(Profile);
						}}/>
						<Route path="/about" component={ About } />
						<Route path="/how_it_works" component={ HowItWorks } />
						<Route path="/report_a_bug" component={ ReportABug } />
						<Route path="*" component={ NotFoundPage } />
					</Switch>
				)} />
				<Footer { ...props }/>
			</div>
		</Route>
	);
};
