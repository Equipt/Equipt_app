import PropTypes from 'prop-types';
import React from 'react';

export class SignupForm extends React.Component {

	static contextTypes = {
  		router: PropTypes.shape({
    		history: PropTypes.object.isRequired,
  		})
	};

	static propTypes = {
		session: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired
	}

	submit(e) {

		e.preventDefault();

		const { actions } = this.props;

		let formData = {
			firstname: this.refs.firstname.value,
			lastname: this.refs.lastname.value,
			email: this.refs.email.value,
			password: this.refs.password.value,
			password_confirmation: this.refs.password_confirmation.value
		}

		// Fetch Current User
		actions.signup(formData, () => {
			this.context.router.history.push('/sporting_goods');
		});

	}

	render() {

		const { signup } = this.props.content;

		const user = this.props.user || {};
		const errors = user.errors || [];

		return (
			<section className="container">

				<h2>{ signup.title }</h2>

				<form onSubmit={ this.submit.bind(this) }>

					{
						signup.formFields.map((field, index) => {

							let fieldErrors = errors[field.name] || [];

							return 	(<div key={ `field_${ index }` }>
												<br/>
													<label>{ field.label }</label>
														<input  ref={ field.name }
																		name={ field.name }
																		className="form-control"
																		type={ field.type }
														/>
														{
															fieldErrors.map((error, index) => {
																return <p className="text-danger" key={ `${field.name}_error_${index}` }>{ error }</p>;
															})
														}
								   			</div>);
						})
					}

					<br/>

					<input type="submit" className="btn btn-success" value="Signup"/>

				</form>

			</section>
		)
	}

}
