import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';

import Slider from 'react-slick';
import Map from 'components/Map.jsx';

import { RatingForm } from 'components/RatingForm';

const RentalDetails = ({
  rental,
  rate
}) => {

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  const { sportingGood = {}, owned } = rental;
  const { images = [] } = sportingGood;

  const pickupLocationMarkup = () => {

    const { owner = {} } = rental;

    return (
      <div>

        <h4 className="header">Pickup Location</h4>

        <div className="col-xs-6 no-padding">
          <h5 className="capitalize">{ owner.firstname } { owner.lastname }</h5>
          <a href="email:{owner.email}"><h5>{ owner.email }</h5></a>
          <a href="phone:{owner.email}"><h5>{ owner.phone }</h5></a>
        </div>

        <div className="col-xs-6 no-padding">
          <h5 className="capitalize">{ owner.unit ? `${ owner.unit } - ` : '' }{ owner.street_number } { owner.street }</h5>
          <h5 className="capitalize">{ owner.city }, { owner.state }</h5>
          <h5 className="capitalize">{ owner.country }, { owner.zip }</h5>
        </div>

        <div className="clearfix"/>

        <Map { ...owner.coordinates }/>

      </div>
    )
  }

  const rentersDetailsMarkup = () => {

    const { user = {} } = rental;

    return (
      <div>
        <h4 className="header">Renters Details</h4>
        <h5 className="capitalize">{ user.firstname } { user.lastname }</h5>
        <a href="email:{user.email}"><h5>{ user.email }</h5></a>
        <a href="phone:{user.email}"><h5>{ user.phone }</h5></a>
      </div>
    )

  }

  return (
    <div className="rental-show">

      <div className="row">

        <div className="col-xs-6">

          <h4 className="col-xs-7 no-padding header">Dates</h4>

            <div className="clearfix"></div>

            <h5>{ Moment(rental.startDate).add(1, 'days').format('dddd, Do MMMM YYYY') } - { Moment(rental.endDate).format('dddd, Do MMMM YYYY') }</h5>
            <h5>{ rental.totalDays } Days Renting</h5>

            <hr/>

            <h4 className="header">Price</h4>

            <h5>${ sportingGood.pricePerDay } Price Per Day</h5>
            <h5>${ rental.deposit } Deposit (Will place a hold, will not be charged*)</h5>
            <h5>${ rental.subTotal } Sub Total</h5>
            <h4>${ rental.total } Total</h4>

            <hr/>

            { owned ? rentersDetailsMarkup() : pickupLocationMarkup() }

          </div>

          <div className="col-xs-6">

            { rental.isComplete && <RatingForm title={ `How was ${ sportingGood.title }?` } sportingGood={ sportingGood } rate={ rate }/> }

            <h4>{ sportingGood.title }</h4>
            <p>{ sportingGood.description }</p>

            <Slider { ...sliderSettings }>
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

    </div>)

}

RentalDetails.PropTypes = {
  rental: PropTypes.object.isRequired,
  rate: PropTypes.object.isRequired
}

export default RentalDetails;
