import PropTypes from 'prop-types';
import React from 'react';

import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux';

import { Link } from 'react-router-dom';

import * as sessionActions from 'actions/session'; 

import { Login } from 'components/Login';

class LoginContainer extends React.Component {

	render() {
		
		const { fetchCurrentUser } = this.props.actions;

		return (
			<Login fetchCurrentUser={ fetchCurrentUser }/>
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
