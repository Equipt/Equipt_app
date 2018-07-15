import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import RentalDetails from 'components/RentalDetails';
import { DateCell } from 'components/partials/DateCell.jsx';
// import DatePicker from 'components/DatePicker';

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

	selectedEvent(rental) {
		const { slug } = rental.sportingGood;
		const { hashId, owned } = rental;
		this.context.router.history.push(`${ owned ? '/owner' : '' }/sporting_goods/${ slug }/rentals/${ hashId }`);
	}

	render() {

		const { rentals } = this.props;

	  return (
			<div className="container">
				<BigCalendar
					events={ rentals }
					selectable={ false }
					startAccessor={ event => {
			      return moment(event.startDate, "YYYY/MM/DD").add(1, 'days').format('YYYY/MM/DD');
					}}
					endAccessor={ event => {
						const endDate = moment(event.endDate, "YYYY/MM/DD");
						// NOTE: fixes the full calendar date rounding
						// Is a date that has already been save || is not a saturday
						if (endDate.day() === 6) {
							endDate.startOf('day').subtract(1, 'seconds');
							return endDate.add(1, 'days');
						} else if (event.hashId ) {
							return endDate.add(1, 'days').format('YYYY/MM/DD');
						} else {
							return event.endDate;
						}
					}}
					views={ ['month', 'agenda'] }
					onSelectSlot={ event => {
			      event.start = moment(event.start).subtract(1, 'days');
			      onAddEvent(event);
			    } }
			    onSelectEvent={ this.onSelectEvent }
					eventPropGetter={ this.getEventStyles }
					components={{
					dateCellWrapper: DateCell
				}}/>
			</div>
		)
	}

}
