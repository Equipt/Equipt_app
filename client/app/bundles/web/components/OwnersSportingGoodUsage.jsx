import React from 'react';
import PropTypes from 'prop-types';
import BigCalendar from 'react-big-calendar';
import Loader from 'components/Loader';
import { DateCell } from 'components/partials/DateCell.jsx';

const OwnersSportingGoodUsage = ({
  sportingGood,
  actions
}) => {

  if (!sportingGood) return <Loader/>;

  const { rentals = [] } = sportingGood

	return (
		<section className="container owners-sporting-good-usage">

			<h3>When are you using { sportingGood.title }?</h3>

      <br/>

      <BigCalendar
        events={ rentals }
        selectable
        views={ ['month'] }
        onSelectSlot={ rental => actions.ownerIsUsingSportingGood(rental, sportingGood) }
        components={{
        dateCellWrapper: DateCell
      }}/>

		</section>
	)

}

OwnersSportingGoodUsage.propTypes = {
  sportingGood: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default OwnersSportingGoodUsage;
