import React from 'react';
import PropTypes from 'prop-types';

import Slider from 'react-slick';

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

    const sportingGood = rental.sportingGood || {};
    const images       = sportingGood.images || [];

    return (
        <div className="rental-details-container">

            <div className="col-xs-7">
                <h4>{ sportingGood.title }</h4>
                <p>{ sportingGood.description }</p>
                <p>Pick Up Date: { rental.start }</p>
                <p>Drop Off Date: { rental.end }</p>
                <p>Total Days Renting: { rental.totalDays }</p>
                <p>Deposit: ${ rental.deposit }</p>
                <p>Sub Total: ${ rental.subTotal }</p>
                <p>Total: ${ rental.total }</p>
            </div>

            <div className="col-xs-5">
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

            <div className="col-xs-12">

                <button className="btn btn-danger pull-left" onClick={ () => cancelRental(false) }>Cancel Rental</button>

            </div>

        </div>
    )

}

RentalDetails.propTypes = {
    rental: PropTypes.object.isRequired,
    cancelRental: PropTypes.func.isRequired
}

export default RentalDetails;
