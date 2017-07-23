import PropTypes from 'prop-types';
import React from 'react';

import FacebookLogin from 'react-facebook-login';

import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux';

import * as sessionActions from 'actions/session';

class FaceBook extends React.Component {

	static contextTypes = {
  		router: PropTypes.shape({
    		history: PropTypes.object.isRequired,
  		})
	};

	login(facebookData) {

		const {loginWithFacebook} = this.props.actions;

		loginWithFacebook(facebookData, () => {
			this.context.router.history.push('/sporting_goods');
		});
	}

	render() {

		return (
			<div className='container'>
				<hr/>
				<FacebookLogin
    				appId={ this.props.appId }
    				autoLoad={true}
    				fields="name,email,picture"
    				callback={ this.login.bind(this) }/>
    		</div>
		);
	}

}

function mapStateToProps(state, ownProps) {
	return {
		alerts: state.alerts,
		appId: ownProps.appId
	}
}

function matchDispatchToProps(dispatch) {  
	return {actions: bindActionCreators(sessionActions, dispatch)}
}

export default connect(mapStateToProps, matchDispatchToProps)(FaceBook);