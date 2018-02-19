import PropTypes from 'prop-types';
import React from 'react';

import { Link } from 'react-router-dom';

import FaceBookLogin from 'components/FaceBookLogin';

import * as alertActions from 'actions/alerts';

export class LoginForm extends React.Component {

	static contextTypes = {
  		router: PropTypes.shape({
    		history: PropTypes.object.isRequired,
  		})
	};

	static propTypes = {
		content: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired,
		facebookAppId: PropTypes.string.isRequired
	}

	submit(e) {

		e.preventDefault();

		const { login } = this.props.actions;
		const { history, route } = this.context.router;

		let email = this.refs.email.value;
		let password = this.refs.password.value;

		// Fetch Current User
		login({
			email: email,
			password: password
		}, () => {
			if (route.location.pathname.indexOf('/login') > -1) {
				this.context.router.history.push('/sporting_goods');
			} else {
				this.context.router.history.push(route.location.pathname);
			}
		});

	}

	render() {

		const { login } = this.props.content;
		const { facebookAppId, content, actions } = this.props;

		return (
			<section className="container">

				<h2>{ login.title }</h2>

				<form onSubmit={ this.submit.bind(this) }>

					{
						login.formFields.map((field, index) => {

							return 	(<div key={ `field_${ index }` }
										 			 className="form-group">
													 <br/>
													 <label>{ field.label }</label>
													 <input  ref={ field.name }
													 				 name={ field.name }
																	 className="form-control"
																	 type={ field.type }/>
								   	</div>);
						})
					}

					<input type="submit" value="login" className="btn btn-success"/>

				</form>

				<Link to="/forgot_password" className="pull-right">{ login.password_reset }</Link>

				<FaceBookLogin loginWithFacebook={ actions.loginWithFacebook } facebookAppId={ facebookAppId }/>

			</section>
		)
	}

}
