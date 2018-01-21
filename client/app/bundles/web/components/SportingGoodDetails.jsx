import PropTypes from 'prop-types';
import React from 'react';
import Slider from 'react-slick';
import BigCalendar from 'react-big-calendar';
import StarRatings from 'react-star-rating-component';

import { Link } from 'react-router-dom';
import { UsersContactForm } from 'components/UsersContactForm';

import Loader from 'components/Loader';
import Modal from 'components/Modal';
import Map from 'components/Map.jsx';
import { DateCell } from 'components/partials/DateCell.jsx';

export class SportingGoodDetails extends React.Component {

	static propTypes = {
		content: PropTypes.object.isRequired,
		currentUser: PropTypes.object.isRequired,
	  sportingGood: PropTypes.object.isRequired,
		rental: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired,
		loader: PropTypes.bool.isRequired
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
			showRentalTermsModal: false,
			showImagesModal: false,
			agreedToTerms: false
		}

		this.showModal = this.showModal.bind(this);
		this.imagesModalMarkup = this.imagesModalMarkup.bind(this);

	}

	rent() {

		const { currentUser, sportingGood, rental, actions } = this.props;
		const { agreedToTerms } = this.state;
		const { phone, address } = currentUser;

		rental.agreedToTerms = agreedToTerms;

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

		if (rental.end_date && rental.start_date && rental.end_date.diff) {
			return rental.end_date.diff(rental.start_date, 'days') + 1;
		}

		if (rental.end_date && rental.start_date) {
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
							<i>{ rating.createdAt } ago</i>
							<StarRatings
								name='sportingGoodRating'
								value={ rating.rating }/>
					 		<p>{ rating.comment }</p>
					 </li>);
	}

	termsModalMarkup() {

		const { content } = this.props;

		return (
			<Modal contentLabel="rental-terms"
					 isVisible={ this.state.showRentalTermsModal }
					 onClose={ () => this.showModal('showRentalTermsModal', false) }>
				<h4>{ content.rentals.rental_terms_title }</h4>
				<ol>
				{
					content.rentals.rental_terms.map((term, index) => {
						return <li key={ `rental_terms_${ index }` }>{ term }</li>;
					})
				}
				</ol>
			</Modal>
		);

	}

	imagesModalMarkup() {

		const { sportingGood = {} } = this.props;
		const { images = [] } = sportingGood;

		return (
			<Modal contentLabel="sportingGoodModal"
				 isVisible={ this.state.showImagesModal }
				 onClose={ () => this.showModal('showImagesModal', false) }>
				 <Slider { ...SportingGoodDetails.sliderSettings }>
				 {
					images.map((image, index) => {
						if (image) {
							return (
								<img key={ `${ sportingGood.slug }_image_${ index }` } src={ image.file.url }/>
							)
						}
					})
				}
				</Slider>
			</Modal>
		);
	}

	addressModalMarkup() {

		const { content } = this.props;

		return (
			<Modal contentLabel="address-modal"
				isVisible={ this.state.showContactModal }
				onClose={ () => this.showModal('showContactModal', false) }>
				<h4>{ content.profile.contact.need_contact }</h4>
				<UsersContactForm { ...this.props } completedContactForm={ () => this.showModal('showContactModal', false) }/>
			</Modal>
		);

	}

	render() {

		const { sportingGood, rental = {}, content, showModal, actions, loader } = this.props;
		const { agreedToTerms } = this.state;
		const { images = [], rentals = [], ratings = [], user = {} } = sportingGood;

		const totalDays = this.totalDays();
		const subTotal = this.subTotal();
		const weeklyRentalDiscount = this.weeklyRentalDiscount();

		if (loader) return <Loader/>;

		return (

			<section className="sporting-goods-show">

				<div className="image-container">
					<button className="btn btn-default"
									onClick={ () => this.showModal('showImagesModal', true) }>
									See Images
					</button>
					<div className="image" style={{
						backgroundImage: `url(${ sportingGood.primaryImage })`
					}}/>
				</div>

				<div className="container">

					<div className="image-spacer"/>

					<Link to="/sporting_goods" className="pull-right go-back">Go Back</Link>

					<div className="col-xs-12 col-md-8">

						<BigCalendar
							events={ rentals.concat([ rental ]) }
							selectable
							startAccessor='start_date'
							endAccessor='end_date'
							views={ ['month'] }
							onSelectSlot={ rental => actions.selectRental(rental, sportingGood, agreedToTerms) }
							components={{
							dateCellWrapper: DateCell
						}}/>

						<ul>{ ratings.map((rating, index) => this.ratingMarkup(rating, index)) }</ul>

					</div>

					<div className="col-xs-12 col-md-4 pricing-container">

						<div className="pull-right">
							<StarRatings
									name="sportingGoodRating"
									starCount={ 5 }
									value={ sportingGood.overallRating }
							/>
							<p>{ sportingGood.totalRatings } reviews</p>
						</div>


						<h3>{ sportingGood.title }</h3>
						<h4>{ sportingGood.model }</h4>
						<p>{ sportingGood.description }</p>

						<div className="price-container">

							<h4>{ totalDays > 0 ? `${ totalDays } Rental Days` : `` }</h4>
							<h4>${ sportingGood.pricePerDay } Price Per Day</h4>
							<h4>{ sportingGood.deposit > 0 ? `$${ sportingGood.deposit } Deposit` : `` }</h4>
							<h4>{ weeklyRentalDiscount > 0 ? `$${ weeklyRentalDiscount } Discount` : `` }</h4>
							<h3>{ subTotal > 0 ? `$${ subTotal - weeklyRentalDiscount } Total*` : `` }</h3>

							<label onClick={ e => this.setState({ agreedToTerms: e.target.checked }) }>
								{ content.rentals.agree_wth_terms }
							</label>

							<input 	type="checkbox"
											value={ agreedToTerms }
											onChange={ e => this.setState({ agreedToTerms: e.target.checked }) }/>

							<a href="#" className="display-block" onClick={ e => {
								e.preventDefault();
								this.showModal('showRentalTermsModal', true);
							}}>
								{ content.rentals.read_rental_terms }
							</a>

							<button className="btn btn-success rent-btn"
											onClick={ () => this.rent(rental, sportingGood) }
											disabled={ !rental.start_date && !rental.end_date }>
											Rent
							</button>

						</div>

					</div>

					<div className="col-xs-12 col-md-4 no-padding">
						<Map { ...user.coordinates }/>
					</div>

				</div>

				{ this.imagesModalMarkup() }
				{ this.termsModalMarkup() }
				{ this.addressModalMarkup() }

			</section>

		);

	}

}
