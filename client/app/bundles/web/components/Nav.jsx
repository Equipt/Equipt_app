import React from 'react';

import { Link } from 'react-router-dom';

const Nav = ({
	session,
	clearSession,
	content
}) => {

	const { currentUser } = session;

	let sessionHtml = (<div className="pull-right session-container">
    	<Link className="btn btn-success login" to="/login">Login</Link>
    	<Link className="btn btn-success signup" to="/signup">Signup</Link>
	</div>);

	// Set logged in html
	if (currentUser) {

		sessionHtml = (
			<div className="session-container">
				<div className="profile-container">
				{
					currentUser.profile ?
					(<Link to="/profile">
						<img src={ currentUser.profile } className="profile-image"/>:
					</Link>)
					:
					(<Link to="/profile">
						<i className="fa fa-user-o" aria-hidden="true"/>
						<p>{ currentUser.firstname }</p>
					</Link>)
				}
				</div>
				<div onClick={ clearSession } className="logout-container">
					<i className="fa fa-power-off power-off" aria-hidden="true"></i>
					<p>Logout</p>
				</div>
			</div>
		)
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
