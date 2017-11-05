import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as sessionActions from 'actions/session';
import * as sportingGoodActions from 'actions/sportingGood';
import * as rentalActions from 'actions/rental';

import { Schedule } from 'components/Schedule';

class OwnersSchedule extends React.Component {

	componentWillMount() {
		this.props.actions.fetchCurrentUserRentals();
	}

	render() {
		return (
			<Schedule { ...this.props }/>
		)
	}

}

function mapStateToProps(state, ownProps) {
	return {
		currentUser: state.session.currentUser
	}
}

function matchDispatchToProps(dispatch) {
	return {actions: bindActionCreators({
																				...sessionActions,
																				...sportingGoodActions,
																				...rentalActions
																			}, dispatch)}
}

export default connect(mapStateToProps, matchDispatchToProps)(OwnersSchedule);
