import React from 'react';
import PropTypes from 'prop-types';

import RentalDetails from 'components/RentalDetails';

const RentalConfirmation = ({
    content,
    rental,
    actions
}) => {

    return (
        <div className="container">
          <h3>{ content.rentals.confirmed_title }</h3>
          <h5>{ content.rentals.confirmed_details }</h5>
          <RentalDetails rental={ rental } cancelRental={ actions.cancelRental }/>
        </div>
    )

}

RentalConfirmation.propTypes = {
    rental: PropTypes.object.isRequired,
    content: PropTypes.object.isRequired
}

export default RentalConfirmation;
