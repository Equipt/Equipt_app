import React from 'react';
import PropTypes from 'prop-types';

import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import Modal from 'components/Modal';
import RentalDetails from 'components/RentalDetails';

BigCalendar.setLocalizer(
	BigCalendar.momentLocalizer(moment)
);

export class Schedule extends React.Component {

  static propTypes = {
    content: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired
  }

  constructor(props) {
		super(props);
		this.state = {
			showRentalModal: false,
			showCancelRentalModal: false,
			rental: {}
		}
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
    const { actions } = this.props;

		if (hasConfirmed && rental.owned ) {
			actions.cancelCurentUserRental(rental);
			this.setState({
				showCancelRentalModal: false,
				showRentalModal: false
			});
		} else if (hasConfirmed && !rental.owned) {
			actions.cancelRental(rental, () => {
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
