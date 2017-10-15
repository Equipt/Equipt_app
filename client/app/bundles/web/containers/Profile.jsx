import PropTypes from 'prop-types';
import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { Link } from 'react-router-dom';

import * as sessionActions from 'actions/session';
import * as alertActions from 'actions/alerts';

import { LoginForm } from 'components/LoginForm';
import { UsersProfile } from 'components/UsersProfile';

class Profile extends React.Component {

	render() {

		return (
			<UsersProfile { ...this.props }/>
		)

	}

}

function mapStateToProps(state, ownProps) {
	return { currentUser: state.session.currentUser }
}

function matchDispatchToProps(dispatch) {
	return {actions: bindActionCreators({ ...sessionActions, ...alertActions }, dispatch)}
}

export default connect(mapStateToProps, matchDispatchToProps)(Profile);
