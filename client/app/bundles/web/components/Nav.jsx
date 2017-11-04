import React from 'react';

import { Link } from 'react-router-dom';

const Nav = ({
	session,
	clearSession,
	content
}) => {

	let sessionHtml = (<div className="pull-right session-container">
    	<Link className="btn btn-success" to="/login">Login</Link>
    	<Link className="btn btn-success" to="/signup">Signup</Link>
	</div>);

	// Set logged in html
	if (session.currentUser) {

		sessionHtml = (<div className="pull-right session-container">
			<Link to="/profile" className="profile">{ session.currentUser.firstname }</Link>
			<div onClick={ clearSession } className="logoout-container">
				<i className="fa fa-power-off power-off" aria-hidden="true"></i>
				<p>Logout</p>
			</div>
		</div>)
	}

	return (
		<nav className="navbar fixed hidden-xs">
			<Link to="/home">
				<div className="main-logo"></div>
			</Link>
			{ sessionHtml }
		</nav>
	)

};

export default Nav;
