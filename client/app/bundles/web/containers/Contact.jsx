import PropTypes from 'prop-types';
import React, { Component } from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as sessionActions from 'actions/session';
import * as modalActions from 'actions/modal';

import UserContact from 'components/UserContact';

class Contact extends Component {

	render() {
		return (
			<UserContact { ...this.props }/>
		)
	}

}

function mapStateToProps(state, ownProps) {
	return { currentUser: state.session.currentUser }
}

function matchDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({
			...sessionActions,
			...modalActions
		}, dispatch )
	}
}

export default connect(mapStateToProps, matchDispatchToProps)(Contact);
