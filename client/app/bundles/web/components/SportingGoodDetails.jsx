import PropTypes from 'prop-types';
import React from 'react';

import { Link } from 'react-router-dom';

import Modal from 'components/Modal';
import Slider from 'react-slick';
import BigCalendar from 'react-big-calendar';

const SportingGoodDetails = ({
	content = {},
	sportingGood = {},
	rental = {},
	rent,
	selectRental,
	agreeWithTermsChanged,
	showRentalTermsModal = false,
	showModal
}) => {

	const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

	const images = sportingGood.images || [];
	const rentals = sportingGood.rentals || [];

    return (
        <section className="container">

            <Link to="/sporting_goods" className="pull-right">Go Back</Link>

			<div className="col-xs-7">
				<h3>{ sportingGood.title }</h3>
				<h4>{ sportingGood.model }</h4>
				<p>{ sportingGood.description }</p>
			</div>

			<div className="col-xs-5">
				 <Slider {...settings}>
				 	{
						images.map((image, index) => {
							if (image) {
								return <img key={ `${ sportingGood.slug }_image_${ index }` } src={ image.file.url }/>
							}
						})
					}
				 </Slider>
			</div>

			<div className="col-xs-12">
				<BigCalendar
					events={ rentals.concat([ rental ]) }
					selectable
					views={ ['month', 'agenda'] }
					onSelectSlot={ selectRental }
				/>
			</div>

			<div className="col-xs-12">
				<label onClick={ () => showModal('showRentalTermsModal', true)}>
					{ content.rentals.agree_wth_terms }
				</label>
				<input 	type="checkbox"
						checked={ rental.agreedToTerms }
						onChange={ agreeWithTermsChanged }/>
				<Modal contentLabel="rental-terms"
					isVisible={ showRentalTermsModal }
					onClose={ () => showModal('showRentalTermsModal', false) }>
					{ content.rentals.rental_terms }
				</Modal>
			</div>

			<div className="col-xs-12">
				<button className="btn btn-success" onClick={ rent }>Rent</button>
			</div>

        </section>
    );

}

SportingGoodDetails.propTypes = {
	content: PropTypes.object.isRequired,
    sportingGood: PropTypes.object.isRequired,
	rental: PropTypes.object.isRequired,
	showRentalTermsModal: PropTypes.bool.isRequired,
	showModal: PropTypes.func.isRequired,
	rent: PropTypes.func,
	selectRental: PropTypes.func,
	agreeWithTermsChanged: PropTypes.func,
}

export default SportingGoodDetails;
