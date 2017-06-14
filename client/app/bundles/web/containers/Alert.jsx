import PropTypes from 'prop-types';
import React from 'react';

import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux';

import Alert from 'components/Alert';

import * as alertActions from 'actions/alerts';

class AlertContainer extends React.Component {

	render() {

		const { alerts } = this.props;

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

export default connect(mapStateToProps)(AlertContainer);
