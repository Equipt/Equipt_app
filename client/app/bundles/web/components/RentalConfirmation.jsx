import React from 'react';
import PropTypes from 'prop-types';

import { RentalDetails } from 'components/RentalDetails';
import Loader from 'components/Loader';

const RentalConfirmation = ({
    content,
    rental,
    loader,
    actions
}) => {

    if (loader) return <Loader/>;

    return (
        <div className="container reduce-margin-top">
          <h3>{ content.rentals.confirmed_title }</h3>
          <h5>{ content.rentals.confirmed_details }</h5>
          <br/>
          <RentalDetails rental={ rental } { ...actions }/>
        </div>
    )

}

RentalConfirmation.propTypes = {
    rental: PropTypes.object.isRequired,
    content: PropTypes.object.isRequired,
    loader: PropTypes.bool.isRequired
}

export default RentalConfirmation;
