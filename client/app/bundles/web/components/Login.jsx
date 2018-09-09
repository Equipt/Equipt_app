import PropTypes from 'prop-types';
import React from 'react';

import { Link } from 'react-router-dom';

import { FaceBookLogin } from 'components/FacebookLogin';
import LoginForm from 'components/forms/LoginForm';

import * as alertActions from 'actions/alerts';

class Login extends React.Component {

	static contextTypes = {
		router: PropTypes.shape({
  		history: PropTypes.object.isRequired,
		})
	};

	static propTypes = {
		actions: PropTypes.object.isRequired,
		facebookAppId: PropTypes.string.isRequired
	}

	constructor(props) {
		super(props);
		this.submit = this.submit.bind(this);
	}

	submit({ email, password }) {

		const { login } = this.props.actions;
		const { history, route } = this.context.router;

		// Fetch Current User
		login({ email, password }, () => {
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

				<h2 className="title">{ I18n.t('login.title') }</h2>

				<LoginForm onSubmit={ this.submit }/>

				<Link to="/forgot_password" className="pull-right reset_password">{ I18n.t('login.password_reset') }</Link>

				<FaceBookLogin loginWithFacebook={ actions.loginWithFacebook } facebookAppId={ facebookAppId }/>

				<style jsx>{`
					.reset_password {
						clear: both;
					}
					.title {
						margin-top: 20px;
					}
				`}</style>

			</section>
		)
	}

}

export default Login;
