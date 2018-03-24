import PropTypes from 'prop-types';
import React, { Component } from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { Link } from 'react-router-dom';

import * as sessionActions from 'actions/session';

import LoginForm from 'components/LoginForm';

class Login extends Component {

	render() {
		return (
			<LoginForm { ...this.props }/>
		)
	}

}

function mapStateToProps(state, ownProps) {
	return {session: state.session}
}

function matchDispatchToProps(dispatch) {
	return {actions: bindActionCreators(sessionActions, dispatch)}
}

export default connect(mapStateToProps, matchDispatchToProps)(Login);
