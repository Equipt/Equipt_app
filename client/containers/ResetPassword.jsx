import PropTypes from 'prop-types';
import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { Link } from 'react-router-dom';

import * as sessionActions from 'Session/actions.js'; 

import ResetPasswordForm from 'components/ResetPasswordForm';

class ResetPassword extends React.Component {

	render() {

		return (
			<ResetPasswordForm {...this.props}/>
		)

	}

}

function mapStateToProps(state, ownProps) {
	return { errors: state.errors }
}

function matchDispatchToProps(dispatch) {
	return {actions: bindActionCreators(sessionActions, dispatch)}
}

export default connect(mapStateToProps, matchDispatchToProps)(ResetPassword);
