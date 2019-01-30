import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import FaceBook from 'components/Facebook';
import Form from './Form';

import * as alertActions from 'actions/alerts';

const Login = ({
	actions,
	facebookAppId
}) => (
	<section className="container login_container">

		<h2 className="title">{ I18n.t('login.title') }</h2>

		<Form onSubmit={ loginDetails => actions.login(loginDetails) }/>

		<Link to="/forgot_password" className="pull-right reset_password">{ I18n.t('login.password_reset') }</Link>

		<FaceBook loginWithFacebook={ actions.loginWithFacebook } facebookAppId={ facebookAppId }/>

		<style jsx>{`
			.login_container {
				width: 600px;
				h2 {
					margin-bottom: 40px;
				}
			}
			.reset_password {
				clear: both;
			}
			.title {
				margin-top: 20px;
			}
		`}</style>

	</section>
)

Login.propTypes = {
	actions: PropTypes.object.isRequired,
	facebookAppId: PropTypes.string.isRequired
}

export default Login;
