import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Signup from 'components/Signup';

import * as userActions from 'actions/user';
import * as alertActions from 'actions/alerts';
import * as sessionActions from 'actions/session';
import * as modalActions from 'actions/modal';

class SignupContainer extends React.Component {

	render() {

		return (
			<Signup { ...this.props }/>
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
	return {actions: bindActionCreators({
		...userActions,
		...alertActions,
		...sessionActions,
		...modalActions
	}, dispatch)}
}

export default connect(mapStateToProps, matchDispatchToProps)(SignupContainer);
