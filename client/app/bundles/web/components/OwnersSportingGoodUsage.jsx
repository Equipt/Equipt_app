import React from 'react';
import PropTypes from 'prop-types';
import BigCalendar from 'react-big-calendar';
import Loader from 'components/Loader';
import { DateCell } from 'components/partials/DateCell.jsx';

import DatePicker from 'components/DatePicker';

const OwnersSportingGoodUsage = ({
  sportingGood,
  rental,
  actions
}) => {

  if (!sportingGood) return <Loader/>;

  const { rentals = [] } = sportingGood;

  // Add newly created rental to rentals
  if (rental) rentals.push(rental);

	return (
		<section className="container owners-sporting-good-usage">

			<h3>When are you using { sportingGood.title }?</h3>

      <br/>

      <DatePicker
        events={ rentals }
        selectable={ true }
        onAddEvent={ rental => actions.ownerIsUsingSportingGood(rental, sportingGood) }
      />

		</section>
	)

}

OwnersSportingGoodUsage.propTypes = {
  sportingGood: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default OwnersSportingGoodUsage;
