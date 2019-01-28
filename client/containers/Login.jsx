import PropTypes from 'prop-types';
import React, { Component } from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { Link } from 'react-router-dom';

import * as sessionActions from 'actions/session';

// import LoginForm from 'components/LoginForm';
import Login from 'components/Login';

class LoginContainer extends Component {

	render() {
		return (
			<Login { ...this.props }/>
		)
	}

}

function mapStateToProps(state, ownProps) {
	return {session: state.session}
}

function matchDispatchToProps(dispatch) {
	return {actions: bindActionCreators(sessionActions, dispatch)}
}

export default connect(mapStateToProps, matchDispatchToProps)(LoginContainer);
