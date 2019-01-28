import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from './actions.js';
import Modal from './components/Modal';

function mapStateToProps(state, ownProps) {
	return {modal: state.modal}
}

function matchDispatchToProps(dispatch) {
	return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, matchDispatchToProps)(Modal);
