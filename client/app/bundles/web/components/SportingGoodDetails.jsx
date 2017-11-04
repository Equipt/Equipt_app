import PropTypes from 'prop-types';
import React from 'react';

import { Link } from 'react-router-dom';
import { UsersContactForm } from 'components/UsersContactForm';

import Modal from 'components/Modal';
import Slider from 'react-slick';
import BigCalendar from 'react-big-calendar';

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

	}

	rent() {

		const { currentUser, sportingGood, rental, actions } = this.props;

		const address = currentUser.address || {};
		const phone = currentUser.phone || {};

		// Must have completed address and phone number to rent
		if (phone.verified && address.verified) {
			return actions.rent(rental, sportingGood, () => {
				this.context.router.history.push(`/sporting_goods/${ sportingGood.slug }/rentals/${ rental.hashId }`);
			});
		}

		this.setState({
			showContactModal: true
		});

	}

	showContactModal(state) {
		this.setState({
			showContactModal: state
		});
	}

	totalDays() {

		const { rental } = this.props;

		if (rental.end && rental.start && rental.end.diff) {
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

		const { sportingGood, rental, content, showModal, actions } = this.props;
		const { agreedToTerms } = this.state;
		const { images = [], rentals = [] } = sportingGood;

		const totalDays = this.totalDays();
		const subTotal = this.subTotal();
		const weeklyRentalDiscount = this.weeklyRentalDiscount();

		return (

			<section className="container sporting-goods-show">

				<Link to="/sporting_goods" className="pull-right">Go Back</Link>

				<div className="col-xs-8">
					<BigCalendar
					events={ rentals.concat([ rental ]) }
					selectable
					views={ ['month', 'agenda'] }
					onSelectSlot={ rental => actions.selectRental(rental, sportingGood, agreedToTerms) }/>
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

					<label onClick={ e => actions.aggreedToRentalTerms(e.target.checke) }>
						{ content.rentals.agree_wth_terms }
					</label>

					<input 	type="checkbox" onChange={ e => actions.aggreedToRentalTerms(e.target.checked) }/>

					<a 	href="#"
					className="display-block"
					onClick={ e => {
						e.preventDefault();
						showModal('showRentalTermsModal', true);
					}}>
						{ content.rentals.read_rental_terms }
					</a>

					<Modal contentLabel="rental-terms"
					isVisible={ this.state.showRentalTermsModal }
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
					onClick={ () => this.rent(rental, sportingGood) }>
					Rent
					</button>
				</div>

				<Modal contentLabel="address-modal"
				isVisible={ this.state.showContactModal }
				onClose={ this.showContactModal.bind(this, false) }>
					<h5>{ content.profile.contact.need_contact }</h5>
					<UsersContactForm { ...this.props } completedContactForm={ this.showContactModal.bind(this, false) }/>
				</Modal>

			</section>

		);

	}

}
