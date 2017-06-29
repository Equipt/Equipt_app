import PropTypes from 'prop-types';
import React from 'react';

import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux';

import { Link } from 'react-router-dom';

import * as sessionActions from 'actions/session'; 

import Nav from 'components/Nav';

class Session extends React.Component {

	static contextTypes = {
  		router: PropTypes.shape({
    		history: PropTypes.object.isRequired,
  		})
	};

	clearSession() {
		const { actions } = this.props;
		actions.clearStoredData();
		actions.clearSession();
		this.context.router.history.push('/login');
	}

	render() {

		const session = this.props.session || {};

		return (
			<Nav currentUser={ session.currentUser } 
				 clearSession={ this.clearSession.bind(this) }/>
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

