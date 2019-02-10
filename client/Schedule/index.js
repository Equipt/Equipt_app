import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as sportingGoodActions from 'actions/sportingGood';
import * as rentalActions from 'actions/rentals';

import Schedule from './components/Schedule';

function mapStateToProps(state, ownProps) {
	return {
		rentals: state.rentals
	}
}

function matchDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({
		...sportingGoodActions,
		...rentalActions
	}, dispatch)}
}

export default connect(mapStateToProps, matchDispatchToProps)(Schedule);
