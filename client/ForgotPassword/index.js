import PropTypes from 'prop-types';
import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Form from './components/Form.js';

import actions from './actions.js'

function mapStateToProps(state, ownProps) {
	return {session: state.session}
}

function matchDispatchToProps(dispatch) {
	return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, matchDispatchToProps)(Form);
