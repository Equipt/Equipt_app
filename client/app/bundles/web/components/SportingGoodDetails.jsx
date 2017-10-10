import PropTypes from 'prop-types';
import React from 'react';

import { Link } from 'react-router-dom';

import Modal from 'components/Modal';
import Slider from 'react-slick';
import BigCalendar from 'react-big-calendar';

export class SportingGoodDetails extends React.Component {

	static propTypes = {
		content: PropTypes.object.isRequired,
	  sportingGood: PropTypes.object.isRequired,
		rental: PropTypes.object.isRequired,
		showRentalTermsModal: PropTypes.bool.isRequired,
		showModal: PropTypes.func.isRequired,
		rent: PropTypes.func,
		selectRental: PropTypes.func,
		agreeWithTermsChanged: PropTypes.func,
	}

	static sliderSettings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
	}

	constructor(props) {
		super(props);
	}

	totalDays() {

		const { rental } = this.props;

		if (rental.end && rental.start) {
			return rental.end.diff(rental.start, 'days');
		}

		return 0;

	}

	subTotal() {

		const { rental, sportingGood } = this.props;

		return this.totalDays() * sportingGood.pricePerDay;

	}

	weeklyRentalDiscount() {

		const { rental, sportingGood } = this.props;

		const totalWeeks = Math.floor(this.totalDays() / 7);
		const remainingDays = this.totalDays() % 7;

		if (totalWeeks > 0) {

			const priceOfWeeks = totalWeeks * sportingGood.pricePerWeek;
			const remainingPrice = remainingDays * sportingGood.pricePerDay;
			const totalSavingsPrice = priceOfWeeks + remainingPrice;

			return this.subTotal() - totalSavingsPrice;

		}

		return 0;

	}

	render() {

		const { sportingGood, rental, content } = this.props;

		const images = sportingGood.images || [];
		const rentals = sportingGood.rentals || [];

		const totalDays = this.totalDays();
		const subTotal = this.subTotal();
		const weeklyRentalDiscount = this.weeklyRentalDiscount();

		return (

			<section className="container">

				<Link to="/sporting_goods" className="pull-right">Go Back</Link>

				<div className="col-xs-8">

					<BigCalendar
					events={ rentals.concat([ rental ]) }
					selectable
					views={ ['month', 'agenda'] }
					onSelectSlot={ this.props.selectRental }/>

				</div>

				<div className="col-xs-4">

					<h3>{ sportingGood.title }</h3>
					<h4>{ sportingGood.model }</h4>
					<p>{ sportingGood.description }</p>

					<Slider {...SportingGoodDetails.sliderSettings}>
					{
						images.map((image, index) => {
							if (image) {
								return <img key={ `${ sportingGood.slug }_image_${ index }` } src={ image.file.url }/>
							}
						})
					}
					</Slider>

					<div className="price-container">

						<h4>Rental days: { totalDays }</h4>
						<h4>Sub total: ${ subTotal }</h4>
						<h4>Deposit: ${ sportingGood.deposit }</h4>
						<h4>Discount: ${ weeklyRentalDiscount }</h4>
						<h4>Total: ${ subTotal - weeklyRentalDiscount }</h4>

					</div>

				</div>

				<div className="col-xs-12">

					<label onClick={ this.props.agreeWithTermsChanged }>
					{ content.rentals.agree_wth_terms }
					</label>

					<input 	type="checkbox"
					checked={ rental.agreedToTerms }
					onChange={ this.props.agreeWithTermsChanged }/>

					<a 	href="#"
					className="display-block"
					onClick={ e => {
						e.preventDefault();
						showModal('showRentalTermsModal', true);
					}}>
					{ content.rentals.read_rental_terms }
					</a>

					<Modal contentLabel="rental-terms"
					isVisible={ this.props.showRentalTermsModal }
					onClose={ () => showModal('showRentalTermsModal', false) }>
					<h4>{ content.rentals.rental_terms_title }</h4>
					<ol>
					{
						this.props.content.rentals.rental_terms.map((term, index) => {
							return <li key={ `rental_terms_${ index }` }>{ term }</li>;
						})
					}
					</ol>
					</Modal>

				</div>

				<div className="col-xs-12">
				<button className="btn btn-success"
				onClick={ this.props.rent }>
				Rent
				</button>
				</div>

			</section>

		);

	}

}
