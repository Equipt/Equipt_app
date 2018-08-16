import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';

export default class DatePicker extends Component {

  static propTypes = {
    events: PropTypes.array.isRequired,
		selectedDates: PropTypes.func.isRequired
  }

	constructor(props) {
		super(props);
		this.state = {
			focusedInput: null,
			startDate: null,
			endDate: null
		}
		this.takenDay = this.takenDay.bind(this);
	}

	componentWillUpdate(newProps,	newState) {
		const { startDate, endDate } = this.state;
		const { selectedDates } = this.props;

		const newStartDate = newState.startDate;
		const newEndDate = newState.endDate;

		if (newStartDate && newEndDate
				&& (!newStartDate.isSame(startDate) || !newEndDate.isSame(endDate))) {
			selectedDates({
				start: newStartDate,
				end: newEndDate
			});
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

    const { selectedDates } = this.props;
		const { startDate, endDate, focusedInput } = this.state;

		return (
			<DateRangePicker
				startDateId="startDate"
				endDateId="endDate"
				minimumNights={0}
				startDate={startDate}
  			endDate={endDate}
  			onDatesChange={ ({startDate, endDate}) => this.setState({ startDate, endDate })}
				focusedInput={focusedInput}
				onFocusChange={focusedInput => this.setState({ focusedInput })}
				isDayBlocked={ this.takenDay }
			/>
		)

	}

}
