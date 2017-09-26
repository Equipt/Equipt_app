import PropTypes from 'prop-types';
import React from 'react';

import { UserForm } from 'components/UserForm';

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

	submit(formData) {

		const { actions } = this.props;

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

				<UserForm submit={ this.submit.bind(this) } formContent={ signup }/>

			</section>
		)
	}

}
