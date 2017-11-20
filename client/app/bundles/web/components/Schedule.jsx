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

	static contextTypes = {
			router: PropTypes.shape({
				history: PropTypes.object.isRequired
			})
	};

  static propTypes = {
    content: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
		rentals: PropTypes.array.isRequired
  }

	onSelectEvent(rental) {
		const { slug } = rental.sportingGood;
		const { hashId, owned } = rental;
		this.context.router.history.push(`${ owned ? '/owner' : '' }/sporting_goods/${ slug }/rentals/${ hashId }`);
	}

	render() {

		const { content, rentals = [] } = this.props;

		return (
			<div className="container">
				<BigCalendar
					events={ rentals }
					selectable={ true }
					onSelectEvent={ this.onSelectEvent.bind(this) }
					views={ ['month', 'agenda', 'day'] }
				/>
			</div>
		)
	}

}
