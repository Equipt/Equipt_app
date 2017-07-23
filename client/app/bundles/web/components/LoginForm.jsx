import PropTypes from 'prop-types';
import React from 'react';

import { Link } from 'react-router-dom';

import * as alertActions from 'actions/alerts'; 

export class LoginForm extends React.Component {

	static contextTypes = {
  		router: PropTypes.shape({
    		history: PropTypes.object.isRequired,
  		})
	};

	submit(e) {

		e.preventDefault();

		let email = this.refs.email.value;
		let password = this.refs.password.value;

		// Fetch Current User
		this.props.fetchCurrentUser({
			email: email,
			password: password
		}, () => this.context.router.history.push('/sporting_goods'));

	}

	render() {
		return (
			<section className="container">

				<h2>Login</h2>

				<form onSubmit={ this.submit.bind(this) }>

					<div className="form-group">

						<label htmlFor="email">Email address:</label>
    					<input type="email" ref="email" className="form-control" id="email"/>

					</div>

					<div className="form-group">

						<label htmlFor="password">Password:</label>
    					<input type="password" ref="password"  className="form-control" id="password"/>

					</div>

					<input type="submit" value="login" className="btn btn-success"/>

				</form>

				<Link to="/forgot_password" className="pull-right">Need help logging in?</Link>

			</section>
		)
	}

}
