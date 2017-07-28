import PropTypes from 'prop-types';
import React from 'react';

import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux';

import { Link } from 'react-router-dom';

import * as sessionActions from 'actions/session'; 

import Nav from 'components/Nav';
import SideBar from 'components/SideBar';
import MobileNav from 'components/MobileNav';

class Session extends React.Component {

	static contextTypes = {
  		router: PropTypes.shape({
    		history: PropTypes.object.isRequired,
  		})
	};

	clearSession() {
		const { actions } = this.props;

		// Clear all session data
		actions.clearStoredData();
		actions.clearSession();

		// redirect back to login
		this.context.router.history.push('/login');
	}

	render() {

		const session = this.props.session || {}; 

		return (
			<div>
				<Nav { ...this.props } clearSession={ this.clearSession.bind(this) }/>
				<MobileNav { ...this.props } clearSession={ this.clearSession.bind(this) }/>
				{ session.token ? <SideBar/> : null }
			</div>
		)
	}

}

function mapStateToProps(state, ownProps) {
	return {
		session: state.session
	}
}

function matchDispatchToProps(dispatch) {  
	return {actions: bindActionCreators(sessionActions, dispatch)}
}

export default connect(mapStateToProps, matchDispatchToProps)(Session);

