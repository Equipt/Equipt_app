import React from 'react';

import { Link } from 'react-router-dom';

import logo from 'images/logo.png'

const Nav = ({
	currentUser = {},
	clearSession
}) => {
		
	let sessionHtml = (<div className="pull-right session-container">
    	<Link className="btn btn-success" to="/login">Login</Link>
    	<Link className="btn btn-success" to="/signup">Signup</Link>
	</div>);

	// Set logged in html
	if (currentUser) {
		sessionHtml = (<div className="pull-right session-container">
			<Link to="/profile">{ currentUser.firstname }</Link>
			<button className="btn btn-success" onClick={ clearSession }>Logout</button>
		</div>)
	}

	return (
		<nav className="navbar">
				<div className="container">
					<Link to="/home">
						<img className="pull-left" src={ logo } width="60"/>
					</Link>
					{ sessionHtml }
				</div>
		</nav>
	)

};

export default Nav;