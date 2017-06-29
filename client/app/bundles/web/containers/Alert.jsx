import PropTypes from 'prop-types';
import React from 'react';

import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux';

import Alert from 'components/Alert';

import * as alertActions from 'actions/alerts';

class AlertContainer extends React.Component {

	static SHOW_ALERT_PERIOD = 5000;

	componentWillReceiveProps(nextProps) {
		clearTimeout(this.showAlert);

		this.showAlert = setTimeout(() => {
			this.props.actions.clearAlerts();
		}, 5000);
	}

	render() {

		const alerts = this.props.alerts || [];

		return (
			<Alert alerts={ alerts }/>
		)

	}

}

function mapStateToProps(state, ownProps) {
	return {alerts: state.alerts}
}

function matchDispatchToProps(dispatch) {  
	return {actions: bindActionCreators(alertActions, dispatch)}
}

export default connect(mapStateToProps, matchDispatchToProps)(AlertContainer);
