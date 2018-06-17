import React from 'react';
import PropTypes from 'prop-types';

import RentalDetails from 'components/RentalDetails';

const RentalConfirmation = ({
    content,
    rental,
    rental: {
      isComplete,
      user: {
        firstname = ''
      } = {},
      sportingGood: {
        title = ''
      } = {}
    } = {},
    actions
}) => {

    const { sportingGood = {}, owner = {} } = rental;

    const header = rental.owned ? I18n.t('rentals.owner.confirmed', { user: firstname.capitalize(), sporting_good: title.capitalize() }) :
                   rental.isComplete ? content.rentals.completed : I18n.t('rentals.success', { item: title.capitalize() });

    const subheader = rental.owned ?
		'' :
		I18n.t('rentals.confirmed', { user: owner.firstname && owner.firstname.capitalize() });

    const rentalControls = () => {
      return (
        <button className="cancel btn btn-danger pull-right" onClick={ () => actions.cancelRental(rental, history => {
          history.push('/owner/schedule');
        }) }>Cancel Rental</button>
      )
    }

    return (
      <div className="container reduce-margin-top rental-confirmation-wrapper">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <h3>{ header  }</h3>
            <h5>{ subheader }</h5>
          </div>
          <div className="col-xs-12 col-md-6">
             { !isComplete && rentalControls() }
          </div>
        </div>
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
