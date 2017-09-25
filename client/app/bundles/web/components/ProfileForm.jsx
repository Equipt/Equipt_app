import React from 'react';

export class ProfileForm extends React.Component {

	submit(e) {

		e.preventDefault();

	}

	render() {

		const content = this.props.content.signup;

		const user = this.props.user || {};
		const errors = user.errors || [];

		const { currentUser } = this.props;

		return (

			<section className="container">

				<h2>Profile</h2>

				<form onSubmit={ this.submit.bind(this) }>

					{
						content.formFields.map((field, index) => {

							let fieldErrors = errors[field.name] || [];

							return 	(<div key={ `field_${ index }` }>
												<br/>
													<label>{ field.label }</label>
														<input  ref={ field.name }
																		name={ field.name }
																		className="form-control"
																		type={ field.type }
																		value={ currentUser[field.name] }
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
