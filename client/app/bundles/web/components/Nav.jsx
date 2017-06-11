import PropTypes from 'prop-types';
import React from 'react';

import { Link } from 'react-router-dom';

export class Nav extends React.Component {

	static propTypes = {
        currentUser: PropTypes.object
    };

	render() {
  		
  		let currentUser = this.props.currentUser || {};
  		
  		let sessionHtml = (<div className="pull-right session-container">
        	<Link to="/login">Login</Link>
        	<Link to="/signup">Signup</Link>
  		</div>);

  		// Set logged in html
  		if (currentUser) {

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
	}

}