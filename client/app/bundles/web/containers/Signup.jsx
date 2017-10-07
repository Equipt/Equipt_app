import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { SignupForm } from 'components/SignupForm';

import * as userActions from 'actions/user';

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
	return {actions: bindActionCreators(userActions, dispatch)}
}

export default connect(mapStateToProps, matchDispatchToProps)(Signup);
