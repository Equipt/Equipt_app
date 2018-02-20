import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BigCalendar from 'react-big-calendar';
import Moment from 'moment';
import { DateCell } from 'components/partials/DateCell.jsx';

BigCalendar.setLocalizer(
	BigCalendar.momentLocalizer(Moment)
);

export default class DatePicker extends Component {

  static propTypes = {
    events: PropTypes.array.isRequired,
    selectable: PropTypes.bool.isRequired,
    onAddEvent: PropTypes.func,
    onSelectEvent: PropTypes.func
  }

	constructor(props) {
		super(props);
		this.getBkColor = this.getBkColor.bind(this);
		this.getEventStyles = this.getEventStyles.bind(this);
	}

	getBkColor(event) {
		switch(event.title) {
			case 'selected':
				return '#73B566';
			case 'unavailable':
				return '#9D4A45';
			default:
				return '#4173A8';
		}
	}

	getEventStyles(event, start, end, isSelected) {

		const style = {
			height: '60px',
			display: 'block',
			fontSize: '16px',
			background: this.getBkColor(event)
		}

		return {
			style
		}

	}

  render() {

    const { events, selectable, onAddEvent, onSelectEvent } = this.props;

    return <BigCalendar
			events={ events }
			selectable={ selectable }
			startAccessor={ event => {
        return Moment(event.startDate, "YYYY/MM/DD").add(1, 'days').format('YYYY/MM/DD');
			}}
			endAccessor={ event => {
				const endDate = Moment(event.endDate, "YYYY/MM/DD");
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
        event.start = Moment(event.start).subtract(1, 'days');
        onAddEvent(event);
      } }
      onSelectEvent={ onSelectEvent }
			eventPropGetter={ this.getEventStyles }
			components={{
			dateCellWrapper: DateCell
		}}/>
  }

}
