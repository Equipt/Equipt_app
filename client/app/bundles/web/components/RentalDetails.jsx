import React from 'react';
import PropTypes from 'prop-types';

import Slider from 'react-slick';
import GoogleMapReact from 'google-map-react';

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

    const defaultProps = {
      center: {lat: 59.95, lng: 30.33},
      zoom: 11
    };


    return (
        <div className="rental-details-container">

            <div className="col-xs-4">
                <p>Pick Up Date: { rental.startDate }</p>
                <p>Drop Off Date: { rental.endDate }</p>
                <p>Total Days Renting: { rental.totalDays }</p>
                <p>Deposit: ${ rental.deposit }</p>
                <p>Sub Total: ${ rental.subTotal }</p>
                <p>Total: ${ rental.total }</p>
            </div>

            <div className="col-xs-6">
              <GoogleMapReact
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
              />
            </div>

            <div className="col-xs-4">
              <h4>{ sportingGood.title }</h4>
              <p>{ sportingGood.description }</p>
            </div>

            <div className="col-xs-6">
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
