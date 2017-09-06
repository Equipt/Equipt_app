import React from 'react';
import PropTypes from 'prop-types';

const RentalConfirmation = ({
    content,
    sportingGood
}) => {

    const rental = sportingGood.rental || {};

    return (
        <div className="container">

            <h3>{ rental.confirmed ? content.rentals.confirmed_title : content.rentals.waiting_for_confirmation_title }</h3>

        </div>
    )

}

RentalConfirmation.propTypes = {
    sportingGood: PropTypes.object.isRequired,
    content: PropTypes.object.isRequired
}

export default RentalConfirmation;
