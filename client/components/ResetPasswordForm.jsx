import React from 'react';
import PropTypes from 'prop-types';

class ResetPasswordForm extends React.Component {

	static contextTypes = {
  		router: PropTypes.shape({
    		history: PropTypes.object.isRequired,
  		})
	};

	SubmittedResetPassword(e) {

		e.preventDefault();

		const { resetPassword } = this.props.actions;
		const { reset_token } = this.context.router.route.match.params;

		resetPassword(reset_token, {'user': {
			password: this.refs.password.value,
			password_confirmation: this.refs.password_confirmation.value
		}}, () => this.context.router.history.push('/login'));

	}

	getError(field) {

		const { errors } = this.props;
		const fieldError = errors[field] || [];

		return fieldError.map((error, index) => {
			return <p className="text-danger" key={ `${ error }_error_${ index }` }>{ error }</p>;
		});

	}

	render() {

		return (
			<section className="container">

				<h2>Reset your password</h2>

				<form onSubmit={ this.SubmittedResetPassword.bind(this) }>

					<div className="form-group">
						<label htmlFor="password">Enter your new password</label>
						<input type="password" ref="password" className="form-control" name="password"/>
						{ this.getError('password') }
					</div>

					<div className="form-group">
						<label htmlFor="password_confirmation">Confirm your new email</label>
						<input type="password" ref="password_confirmation" className="form-control" name="password_confirmation"/>
						{ this.getError('password_confirmation') }
					</div>

					<input type="submit" value="Reset you password" className="btn btn-success"/>

				</form>

			</section>
		)

	}

}

export default ResetPasswordForm;
