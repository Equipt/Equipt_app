import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { DateCell } from 'components/partials/DateCell.jsx';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';

BigCalendar.setLocalizer(
	BigCalendar.momentLocalizer(moment)
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
		this.takenDay = this.takenDay.bind(this);
		this.state = {
			focusedInput: null,
			startDate: null,
			endDate: null
		}
	}

	componentDidUpdate() {
		const { startDate, endDate } = this.state;
		const { onAddEvent } = this.props;
		if (startDate && endDate) {
			onAddEvent({
				start: startDate,
				end: endDate
			});
		}
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

	takenDay(date) {

		const { events } = this.props;

		return events.filter(rental => {
			const startDate = new Date(rental.startDate);
			const endDate = new Date(rental.endDate);
			const range = moment().range(startDate, endDate);
			return range.contains(date);
		}).length > 0;

	}

  render() {

    const { events, selectable, onAddEvent, onSelectEvent } = this.props;

		return (
			<DateRangePicker
				startDate={this.state.startDate} // momentPropTypes.momentObj or null,
  			endDate={this.state.endDate} // momentPropTypes.momentObj or null,
  			onDatesChange={ ({startDate, endDate}) => this.setState({ startDate, endDate }) }
				focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
				onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
				isDayBlocked={ this.takenDay }
			/>
		)

	}

	// render() {
	//
	//   const { events, selectable, onAddEvent, onSelectEvent } = this.props;
	//
	//   return <BigCalendar
	// 		events={ events }
	// 		selectable={ selectable }
	// 		startAccessor={ event => {
	//       return moment(event.startDate, "YYYY/MM/DD").add(1, 'days').format('YYYY/MM/DD');
	// 		}}
	// 		endAccessor={ event => {
	// 			const endDate = Moment(event.endDate, "YYYY/MM/DD");
	// 			// NOTE: fixes the full calendar date rounding
	// 			// Is a date that has already been save || is not a saturday
	// 			if (endDate.day() === 6) {
	// 				endDate.startOf('day').subtract(1, 'seconds');
	// 				return endDate.add(1, 'days');
	// 			} else if (event.hashId ) {
	// 				return endDate.add(1, 'days').format('YYYY/MM/DD');
	// 			} else {
	// 				return event.endDate;
	// 			}
	// 		}}
	// 		views={ ['month', 'agenda'] }
	// 		onSelectSlot={ event => {
	//       event.start = Moment(event.start).subtract(1, 'days');
	//       onAddEvent(event);
	//     } }
	//     onSelectEvent={ onSelectEvent }
	// 		eventPropGetter={ this.getEventStyles }
	// 		components={{
	// 		dateCellWrapper: DateCell
	// 	}}/>
	// }

}
