import PropTypes from 'prop-types';
import React from 'react';

import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux';

import { Link } from 'react-router-dom';

import * as sessionActions from 'actions/session'; 

import { LoginForm } from 'components/LoginForm';

import ProfileForm from 'components/ProfileForm';

class Profile extends React.Component {

	render() {
		
		const { fetchCurrentUser } = this.props.actions;

		return (
			<ProfileForm/>
		)

	}

}

function mapStateToProps(state, ownProps) {
	return {user: state.user}
}

function matchDispatchToProps(dispatch) {  
	return {actions: bindActionCreators(sessionActions, dispatch)}
}

export default connect(mapStateToProps, matchDispatchToProps)(Profile);
