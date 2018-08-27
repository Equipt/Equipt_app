import React from 'react';
import PropTypes from 'prop-types';
import BigCalendar from 'react-big-calendar';
import Moment from 'moment';
import { DateCell } from 'components/partials/DateCell.jsx';

import DatePicker from 'components/DatePicker';

const OwnersSportingGoodUsage = ({
  sportingGood,
  rental,
  actions
}) => {

  const { rentals = [] } = sportingGood;

  // Add newly created rental to rentals
  if (rental) rentals.push(rental);

	return (
		<section className="container usage-wrapper">

			<div className="usage-container">

				<div className="usage-selection">

					<h4>Which Dates are you using { sportingGood.title }?</h4>

					<br/>

		      <DatePicker
		        events={ rentals }
		        selectable={ true }
						selectedDates={ rental => actions.ownerIsUsingSportingGood(rental, sportingGood) }
		      />

				</div>

				<ul className="rentals">
				{
					rentals.map((rental, index) => (
						<li key={`owners_rental_${ index }`}>
							{ Moment(rental.startDate).format('dddd, Do MMMM YYYY') }
							-
							{ Moment(rental.endDate).format('dddd, Do MMMM YYYY') }
							<a onClick={ e => {
								e.preventDefault();
								actions.removeOwnerUsage(rental, sportingGood);
							}}>Remove Usage</a>
						</li>
					))
				}
				</ul>

			</div>

			<style jsx>{`
				.usage-container {
					display: flex;
					.rentals {

					}
				}
				.usage-selection {
					width: 40%;
				}
			`}</style>

		</section>
	)

}

OwnersSportingGoodUsage.propTypes = {
  sportingGood: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default OwnersSportingGoodUsage;
