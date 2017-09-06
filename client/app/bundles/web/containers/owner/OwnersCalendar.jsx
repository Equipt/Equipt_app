import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import EventCalendar from 'react-event-calendar';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import * as userActions from 'actions/user';

BigCalendar.setLocalizer(
	BigCalendar.momentLocalizer(moment)
);

class OwnersCalendar extends React.Component {

	componentWillMount() {
		this.props.actions.fetchUserRentals();
	}

	render() {

		const { currentUser } = this.props;

		const rentals = user.rentals || [];

		debugger;

		return (
			<div className="container">
				<h3>Owners Calendar</h3>
				<BigCalendar
					events={ rentals }
					selectable={ true }
					views={ ['month', 'agenda'] }
				/>
			</div>
		)
	}

}

function mapStateToProps(state, ownProps) {
	return {
		currentUser: state.session.currentUser
	}
}

function matchDispatchToProps(dispatch) {
	return {actions: bindActionCreators(userActions, dispatch)}
}

export default connect(mapStateToProps, matchDispatchToProps)(OwnersCalendar);
