import React from 'react';

import { Link } from 'react-router-dom';

const Nav = (props) => {

	const currentUser = props.currentUser;
		
	let sessionHtml = (<div className="pull-right session-container">
    	<Link className="btn btn-success" to="/login">Login</Link>
    	<Link className="btn btn-success" to="/signup">Signup</Link>
	</div>);

	// Set logged in html
	if (currentUser) {
		sessionHtml = (<div className="pull-right session-container">
			<span>{ currentUser.firstname }</span>
			<button className="btn btn-success" onClick={ props.clearSession }>Logout</button>
		</div>)
	}

	return (
		<nav className="navbar">
				<div className="container">
					<a href="/">
						<img className="pull-left" src="/assets/logo.png" width="60"/>
					</a>
					{ sessionHtml }
				</div>
		</nav>
	)

};

export default Nav;