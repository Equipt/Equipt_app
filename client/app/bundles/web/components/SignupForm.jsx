import PropTypes from 'prop-types';
import React from 'react';

import { UserForm } from 'components/UserForm';
import FaceBookLogin from 'components/FaceBookLogin';

export class SignupForm extends React.Component {

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

	render() {

		const { content, actions, facebookAppId } = this.props;

		return (
			<section className="container">

				<h2>{ content.signup.title }</h2>

				<UserForm { ...this.props } formContent={ content.signup } isCreating={ true }/>

				<FaceBookLogin loginWithFacebook={ actions.loginWithFacebook } facebookAppId={ facebookAppId }/>

			</section>
		)
	}

}
