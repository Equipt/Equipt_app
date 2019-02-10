import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import { DateCell } from 'components/partials/DateCell.jsx';

export default class Schedule extends Component {

	constructor(props) {
		super(props);
		this.selectedEvent = this.selectedEvent.bind(this);
	}

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

  componentDidMount() {
    const { actions } = this.props;
    actions.fetchRentals();
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
					selectable={ true }
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
			    onSelectEvent={ this.selectedEvent }
					eventPropGetter={ this.getEventStyles }
					components={{ dateCellWrapper: DateCell }}/>
			</div>
		)
	}

}
