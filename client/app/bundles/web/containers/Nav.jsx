import PropTypes from 'prop-types';
import React from 'react';

import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux';

import { Link } from 'react-router-dom';

import * as currentUserActions from 'actions/currentUser'; 

import Nav from 'components/Nav';

class NavContainer extends React.Component {

	static PropTypes = {
		initialCurrentUser: PropTypes.object
	}

	componentWillMount() {
		const { currentUser } = this.props;
		const { setCurrentUser } = this.props.actions;

		if (this.props.initialCurrentUser) {
			setCurrentUser(this.props.initialCurrentUser);
		}
	}

	render() {
		return (
			<Nav currentUser={ this.props.currentUser }/>
		)
	}

}

function mapStateToProps(state, ownProps) {
	return {currentUser: state.currentUser}
}

function matchDispatchToProps(dispatch) {  
	return {actions: bindActionCreators(currentUserActions, dispatch)}
}

export default connect(mapStateToProps, matchDispatchToProps)(NavContainer);

