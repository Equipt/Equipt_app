import PropTypes from 'prop-types';
import React from 'react';

import { Link } from 'react-router-dom';
import { UsersContactForm } from 'components/UsersContactForm';

import Modal from 'components/Modal';
import Slider from 'react-slick';
import BigCalendar from 'react-big-calendar';
import StarRatings from 'react-star-ratings';
import { DateCell } from 'components/partials/DateCell.jsx';

export class SportingGoodDetails extends React.Component {

	static propTypes = {
		content: PropTypes.object.isRequired,
		currentUser: PropTypes.object.isRequired,
	  sportingGood: PropTypes.object.isRequired,
		rental: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired
	}

	static sliderSettings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
	}

	static contextTypes = {
			router: PropTypes.shape({
				history: PropTypes.object.isRequired
			})
	};

	constructor(props) {
		super(props);

		this.state = {
			showContactModal: false,
			showRentalTermsModal: false
		}

		this.showModal = this.showModal.bind(this);

	}

	rent() {

		const { currentUser, sportingGood, rental, actions } = this.props;

		const address = currentUser.address || {};
		const phone = currentUser.phone || {};

		// Must have completed address and phone number to rent
		if (currentUser.isVerified) {
			return actions.rent(rental, sportingGood, rental => {
				this.context.router.history.push(`/sporting_goods/${ sportingGood.slug }/rentals/${ rental.hashId }`);
			});
		}

		this.setState({
			showContactModal: true
		});

	}

	showModal(showModal, state) {
		this.setState({
			[showModal]: state
		});
	}

	totalDays() {

		const { rental } = this.props;

		if (rental.end && rental.start && rental.end.diff) {
			return rental.end.diff(rental.start, 'days') || 1;
		}

		if (rental.end && rental.start) {
			return 1;
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

			return Math.round(this.subTotal() - totalSavingsPrice).toFixed(2);

		}

		return 0;

	}

	ratingMarkup(rating, index) {
		return (<li key={ `rating_${ index }` } className="ratings-container">
							<i>{ rating.createdAt }</i>
							<StarRatings rating={ rating.score } starWidthAndHeight={ '15px' }/>
					 		<p>{ rating.comment }</p>
					 </li>);
	}

	render() {

		const { sportingGood, rental, content, showModal, actions } = this.props;
		const { agreedToTerms } = this.state;
		const { images = [], rentals = [], ratings = [] } = sportingGood;

		const totalDays = this.totalDays();
		const subTotal = this.subTotal();
		const weeklyRentalDiscount = this.weeklyRentalDiscount();

		const slider = () => {
			<div className="slider-container col-xs-12">
				<Slider { ...SportingGoodDetails.sliderSettings }>
				{
					images.map((image, index) => {
						if (image) {
							return (
								<div className="image-container" key={ `${ sportingGood.slug }_image_${ index }` }>
									<div className="image" style={{
										backgroundImage: `url(${ image.file.url })`
									}}/>
								</div>
							)
						}
					})
				}
				</Slider>
			</div>
		}

		return (

			<section className="container sporting-goods-show">

				<div className="image-container">
					<button className="btn btn-default">See Images</button>
					<div className="image" style={{
						backgroundImage: `url(${ sportingGood.primaryImage })`
					}}/>
				</div>

				<div className="image-spacer"/>

				<Link to="/sporting_goods" className="pull-right go-back">Go Back</Link>

				<div className="col-xs-12 col-md-8">

					<BigCalendar
						events={ rentals.concat([ rental ]) }
						selectable
						views={ ['month', 'agenda'] }
						onSelectSlot={ rental => actions.selectRental(rental, sportingGood, agreedToTerms) }
						components={{
						dateCellWrapper: DateCell
					}}/>

					<ul>{ ratings.map((rating, index) => this.ratingMarkup(rating, index)) }</ul>

				</div>

				<div className="col-xs-12 col-md-4 pricing-container">

					<h3>
						{ sportingGood.title }
						<StarRatings rating={ sportingGood.overallRating } starWidthAndHeight={ '25px' }/>
					</h3>
					<h4>{ sportingGood.model }</h4>
					<p>{ sportingGood.description }</p>

					<div className="price-container">

						<h4>Rental days: { totalDays }</h4>
						<h4>Sub total: ${ subTotal }</h4>
						<h4>Deposit: ${ sportingGood.deposit }</h4>
						<h4>Discount: ${ weeklyRentalDiscount }</h4>
						<h4>Total: ${ subTotal - weeklyRentalDiscount }</h4>

						<label onClick={ e => actions.aggreedToRentalTerms(e.target.checked) }>
							{ content.rentals.agree_wth_terms }
						</label>

						<input 	type="checkbox" onChange={ e => actions.aggreedToRentalTerms(e.target.checked) }/>

						<a href="#" className="display-block" onClick={ e => {
							e.preventDefault();
							this.showModal('showRentalTermsModal', true);
						}}>
							{ content.rentals.read_rental_terms }
						</a>

						<button className="btn btn-success rent-btn"
										onClick={ () => this.rent(rental, sportingGood) }
										disabled={ !rental.start }>
										Rent
						</button>

					</div>

				</div>

				<Modal contentLabel="rental-terms"
							 isVisible={ this.state.showRentalTermsModal }
							 onClose={ () => this.showModal('showRentalTermsModal', false) }>
					<h4>{ content.rentals.rental_terms_title }</h4>
					<ol>
					{
						this.props.content.rentals.rental_terms.map((term, index) => {
							return <li key={ `rental_terms_${ index }` }>{ term }</li>;
						})
					}
					</ol>
				</Modal>

				<Modal contentLabel="address-modal"
							 isVisible={ this.state.showContactModal }
							 onClose={ () => this.showModal('showContactModal', false) }>
					<h4>{ content.profile.contact.need_contact }</h4>
					<UsersContactForm { ...this.props } completedContactForm={ () => this.showModal('showContactModal', false) }/>
				</Modal>

			</section>

		);

	}

}
