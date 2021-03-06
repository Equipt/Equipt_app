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
	const dayNames = I18n.t('day_names');

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

					<hr/>

          {
            /*
            <h4>Or select days when your using { sportingGood.title }.</h4>

            <ul className="day-names">
            {
            dayNames.map(day => (
            <li onClick={ () => actions.ownerIsUsingSportingGood(rental, sportingGood, day.code) }>{ day.name }</li>
          ))
        }
        </ul>
            */
          }

				</div>

				<ul className="rentals">
				{
					rentals.map((rental, index) => (
						<li className="rental" key={`owners_rental_${ index }`}>
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
						width: 60%;
						.rental {
							margin-bottom: 20px;
							a {
								float: right;
							}
						}
					}
				}
				.usage-selection {
					width: 40%;
				}
				.day-names {
					display: flex;
					li {
						justify-content: space-between;
						margin: 0 5px;
						padding: 5px;
						border: solid 1px #ccc;
					}
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
