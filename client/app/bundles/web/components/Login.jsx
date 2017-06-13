import PropTypes from 'prop-types';
import React from 'react';

export class Login extends React.Component {

	submit(e) {
		e.preventDefault();

		let email = this.refs.email.value;
		let password = this.refs.password.value;

		this.props.fetchCurrentUser({
			email: email,
			password: password
		});

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

			</section>
		)
	}

}
