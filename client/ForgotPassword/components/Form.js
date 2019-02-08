import React, { Component } from 'react';

export default class Form extends Component {

	SubmittedForgotPassword(e) {

		e.preventDefault();

		const { actions } = this.props;

		actions.forgotPassword({
			email: this.refs.email.value
		});

	}

	render() {

		return (
			<section className="container">

				<Link className="pull-right" to="/login">Go back to login!</Link>

				<h2>Forgot Your Password, No Sweat!</h2>

				<p>We will send you a reset link!</p>

				<form onSubmit={ this.SubmittedForgotPassword.bind(this) }>

					<div className="form-group">
						<label htmlFor="email">Enter your email</label>
						<input type="input" ref="email" className="form-control" name="email"/>
					</div>

					<input type="submit" value="Send" className="btn btn-success"/>

				</form>

			</section>
		)

	}

}
