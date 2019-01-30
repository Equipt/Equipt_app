import PropTypes from 'prop-types';
import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Alert from 'components/Alert';

import * as actions from './actions.js';

function mapStateToProps(state, ownProps) {
	return {alerts: state.alerts}
}

function matchDispatchToProps(dispatch) {
	return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, matchDispatchToProps)(Alert);
