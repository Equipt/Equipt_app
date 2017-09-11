import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import Modal from 'components/Modal';
import RentalDetails from 'components/RentalDetails';

import * as sessionActions from 'actions/session';
import * as sportingGoodActions from 'actions/sportingGood';

BigCalendar.setLocalizer(
	BigCalendar.momentLocalizer(moment)
);

class OwnersCalendar extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			showRentalModal: false,
			showCancelRentalModal: false,
			rental: {}
		}
	}

	componentWillMount() {
		this.props.actions.fetchCurrentUserRentals();
	}

	onSelectEvent(rental) {
		this.setState({
			showRentalModal: true,
			rental: rental
		});
	}

	closeModal() {
		this.setState({
			showRentalModal: false,
			showCancelRentalModal: false,
			rental: {}
		});
	}

	cancelRental(hasConfirmed) {

		const { rental } = this.state;

		if (hasConfirmed && rental.owned ) {
			this.props.actions.cancelCurentUserRental(rental);
			this.setState({
				showCancelRentalModal: false,
				showRentalModal: false
			});
		} else if (hasConfirmed && !rental.owned) {
			this.props.actions.cancelRental(rental, () => {
				this.setState({
					showCancelRentalModal: false,
					showRentalModal: false
				});
			});
		} else {
			this.setState({
				showCancelRentalModal: true,
				showRentalModal: false
			});
		}

	}

	render() {

		const { content, currentUser } = this.props;

		const rentals = currentUser.rentals || [];

		return (
			<div className="container">
				<h3>Owners Calendar</h3>
				<BigCalendar
					events={ rentals }
					selectable={ true }
					onSelectEvent={ this.onSelectEvent.bind(this) }
					views={ ['month', 'agenda'] }
				/>
				<Modal 	isVisible={ this.state.showRentalModal }
						onClose={ this.closeModal.bind(this) }
						contentLabel="Rental Modal">
					<RentalDetails { ...this.state } { ...this.props } cancelRental={ this.cancelRental.bind(this) }/>
				</Modal>

				<Modal 	isVisible={ this.state.showCancelRentalModal }
					 	onClose={ this.closeModal.bind(this) }
						contentLabel="Cancel Rental Modal">
					<h4 className="text-danger">{ content.rentals.cancel_rental }</h4>
					<button className="btn btn-success pull-left" onClick={ () => this.cancelRental(true) }>Yes</button>
					<button className="btn btn-danger pull-left" onClick={ () => this.closeModal() }>Cancel</button>
				</Modal>
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
	return {actions: bindActionCreators({ ...sessionActions, ...sportingGoodActions }, dispatch)}
}

export default connect(mapStateToProps, matchDispatchToProps)(OwnersCalendar);
