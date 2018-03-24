import PropTypes from 'prop-types';
import React from 'react';

import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux';

import { Link } from 'react-router-dom';

import * as sessionActions from 'actions/session'; 

import ForgotPasswordForm from 'components/ForgotPasswordForm';

class ForgotPassword extends React.Component {

	render() {

		return (
			<ForgotPasswordForm {...this.props}/>
		)

	}

}

function mapStateToProps(state, ownProps) {
	return {session: state.session}
}

function matchDispatchToProps(dispatch) {  
	return {actions: bindActionCreators(sessionActions, dispatch)}
}

export default connect(mapStateToProps, matchDispatchToProps)(ForgotPassword);
