import React from 'react';
import PropTypes from 'prop-types';

import Slider from 'react-slick';
import Map from 'components/Map.jsx';

const RentalDetails = ({
    rental = {},
    cancelRental
}) => {

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    const { sportingGood = {} } = rental;
    const { images = [] } = sportingGood;

    return (
        <div className="rental-details-container">

            <div className="row">

                <div className="col-xs-6">

                  <p>Pick Up Date: { rental.startDate }</p>
                  <p>Drop Off Date: { rental.endDate }</p>
                  <p>Total Days Renting: { rental.totalDays }</p>
                  <p>Deposit: ${ rental.deposit }</p>
                  <p>Sub Total: ${ rental.subTotal }</p>
                  <p>Total: ${ rental.total }</p>

                  <hr/>

                  <Map/>

                </div>

                <div className="col-xs-6">

                  <h4>{ sportingGood.title }</h4>
                  <p>{ sportingGood.description }</p>

                  <Slider {...settings}>
                  {
                    images.map((image, index) => {
                      if (image) {
                        return <img key={ `${ sportingGood.slug }_image_${ index }` } height="auto" src={ image.file.url }/>
                      }
                    })
                  }
                  </Slider>

                </div>

            </div>

            <div className="col-xs-12">

                <button className="btn btn-danger pull-left" onClick={ () => cancelRental(rental) }>Cancel Rental</button>

            </div>

        </div>
    )

}

RentalDetails.propTypes = {
    rental: PropTypes.object.isRequired,
    cancelRental: PropTypes.func.isRequired
}

export default RentalDetails;
