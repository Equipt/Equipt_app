import React from 'react';
import PropTypes from 'prop-types';

import RentalDetails from 'components/RentalDetails';
import DatePicker from 'components/DatePicker';

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

		const { content, rentals = [] } = this.props;

		return (
			<div className="container">

				<DatePicker
					events={ rentals }
					selectable={ true }
					onSelectEvent={ this.selectedEvent.bind(this) }
				/>

			</div>
		)
	}

}
