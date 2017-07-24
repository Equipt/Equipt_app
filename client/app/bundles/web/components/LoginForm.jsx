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

		const { fetchCurrentUser } = this.props.actions;

		let email = this.refs.email.value;
		let password = this.refs.password.value;

		// Fetch Current User
		fetchCurrentUser({
			email: email,
			password: password
		}, () => this.context.router.history.push('/sporting_goods'));

	}

	render() {

		const { login } = this.props.content;

		return (
			<section className="container">

				<h2>{ login.title }</h2>

				<form onSubmit={ this.submit.bind(this) }>

					{
						login.formFields.map((field, index) => {

							return 	<div key={ `field_${ index }` }
										 className="form-group">
										<br/>
										<label>{ field.label }</label>
										<input  ref={ field.name }
												name={ field.name }
												className="form-control"
												type={ field.type }
										/>
								   	</div>;
						})
					}

					<input type="submit" value="login" className="btn btn-success"/>

				</form>

				<Link to="/forgot_password" className="pull-right">{ login.password_reset }</Link>

			</section>
		)
	}

}
