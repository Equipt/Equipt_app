import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { SignupForm } from 'components/SignupForm';

import * as userActions from 'actions/user';
import * as alertActions from 'actions/alerts';
import * as sessionActions from 'actions/session';

class Signup extends React.Component {

	render() {

		return (
			<SignupForm { ...this.props }/>
		)

	}

}

function mapStateToProps(state, ownProps) {
	return {
		session: state.session,
		user: state.user
	}
}

function matchDispatchToProps(dispatch) {
	return {actions: bindActionCreators({ ...userActions, ...alertActions, ...sessionActions }, dispatch)}
}

export default connect(mapStateToProps, matchDispatchToProps)(Signup);
