import React from 'react';
import PropTypes from 'prop-types';

const RentalConfirmation = ({
    sportingGood = {}
}) => {

    return (
        <div className="container">

            <h3>Rental Confirmation</h3>

            <p>{ this.props.rental.hashId }</p>

        </div>
    )

}

RentalConfirmation.propTypes = {
    sportingGood: PropTypes.object.isRequired
}

export default RentalConfirmation;
