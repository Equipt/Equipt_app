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

            <h3>{ rental.confirmed ? content.rentals.confirmed_title : content.rentals.waiting_for_confirmation_title }</h3>
            <RentalDetails rental={ rental } cancelRental={ actions.cancelRental }/>

        </div>
    )

}

RentalConfirmation.propTypes = {
    rental: PropTypes.object.isRequired,
    content: PropTypes.object.isRequired
}

export default RentalConfirmation;
