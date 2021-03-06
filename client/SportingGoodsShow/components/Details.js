import PropTypes from 'prop-types';
import React from 'react';
import Slider from 'react-slick';
import StarRatings from 'react-star-rating-component';

import { Link } from 'react-router-dom';

import DatePicker from 'components/DatePicker';
import Modal from 'components/Modal';
import Map from 'components/Map.jsx';
import RatingsList from 'components/RatingsList';

import Terms from 'components/Terms';
import Address from 'components/modals/Address';
import LightBox from 'components/modals/LightBox';

export default class Details extends React.Component {

	static propTypes = {
		content: PropTypes.object.isRequired,
		currentUser: PropTypes.object.isRequired,
	  sportingGood: PropTypes.object.isRequired,
		rental: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired
	}

	static contextTypes = {
			router: PropTypes.shape({
				history: PropTypes.object.isRequired
			})
	};

	constructor(props) {
		super(props);
		this.state = {
			agreedToTerms: false
		}
	}

	rent() {

		const { currentUser, sportingGood, rental, actions, content } = this.props;
		const { agreedToTerms } = this.state;
		const { phone, address } = currentUser;

		rental.agreedToTerms = agreedToTerms;

		// Must have completed address and phone number to rent
		if (currentUser.isVerified) {
			return actions.rent(rental, sportingGood, rental => {
				this.context.router.history.push(`/sporting_goods/${ sportingGood.slug }/rentals/${ rental.hashId }`);
			});
		} else {
			actions.openModal(<Address title={ content.profile.contact.need_contact } { ...this.props }/>);
		}

	}

	render() {

		const { sportingGood, rental = {}, content, showModal, actions } = this.props;
		const { agreedToTerms } = this.state;
		const { images = [], rentals = [], ratings = [], user = {} } = sportingGood;

		// Conflict with a big-calendar setting
		const totalDays = rental.totalDays;
		delete rental.totalDays;

		return (

			<section className="sporting-goods-show">

				<div className="image-container">
					<button className="btn btn-default"
									onClick={ () => actions.openModal(<LightBox images={ sportingGood.images }/>) }>
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

						<DatePicker
							events={ rentals.concat([ rental ]) }
							selectedDates={ rental => actions.selectRental(rental, sportingGood, agreedToTerms) }
						/>

						<RatingsList ratings={ ratings}/>

					</div>

					<div className="col-xs-12 col-md-4 pricing-container">

						<div className="pull-right">
							<div className="profile-image">
							{
								user.profile ?
								<img src={ user.profile }/> :
								null
							}
							</div>
							<StarRatings
									name="sportingGoodRating"
									starCount={ 5 }
									value={ sportingGood.overallRating }
							/>
							<p className="text-right">{ sportingGood.totalRatings } reviews</p>
						</div>

						<h3>{ sportingGood.title }</h3>
						<h4>{ sportingGood.model }</h4>
						<p>{ sportingGood.description }</p>

						<div className="price-container">

							{ rental.totalDays > 0 ? <h5>{ rentaltotalDays } Rental Days</h5> : null }
							<h5>${ sportingGood.pricePerDay } per day</h5>
							<h5>${ sportingGood.pricePerWeek } per week</h5>

							{ totalDays > 0 ? <h5>{ totalDays } days</h5> : null }
							{ rental.subTotal > 0 ? <h5>${ rental.subTotal } sub total</h5> : null }
							{ rental.discount > 0 ? <h5>${ rental.discount } discount</h5> : null }
							{ rental.total > 0 ? <h4>${ rental.total } Total*</h4> : null }

							<div className="terms-container" onClick={ () => this.setState({ agreedToTerms: true }) }>
								<input type="checkbox" checked={ agreedToTerms }/>
								<label>{ I18n.t('rentals.agree_wth_terms') }</label>
								<a href="#" className="display-block" onClick={ e => {
									e.preventDefault();
									actions.openModal(<Terms terms={I18n.t('rentals.terms')}/>);
								}}>{ I18n.t('rentals.read_rental_terms') }</a>
							</div>

							<button className="btn btn-success rent-btn"
											onClick={ () => this.rent(rental, sportingGood) }
											disabled={ !rental.startDate && !rental.endDate }>
											Rent
							</button>

						</div>

					</div>

					<div className="col-xs-12 col-md-4 no-padding">
						<Map { ...user.coordinates }/>
					</div>

				</div>

				<style jsx>{`
					.sporting-goods-show {

					  padding-top: 0;

					  .terms-container {
					    float: left;
					    clear: left;
					    margin-top: 10px;
					  }

					  .dv-star-rating {
					    float: right;
					    margin-top: 5px;
					  }

					  .profile-image {
					    font-size: 30px;
					    margin-top: 20px;
					    img {
					      display: block;
					      max-width: 75px;
					      border-radius: 100%;
					      margin: 0 auto;
					      text-align: center;
					    }
					  }

					  .pricing-container {
					    margin-top: 20px;
					    border: solid 1px #E4E4E4;
					    padding-bottom: 20px;
							.terms-container {
								label {
									font-weight: normal;
									font-style: italic;
								}
								a {
									display: block;
									color: #A9A9A9;
								}
							}
					  }

					  .image-spacer {
					    margin-top: 400px;
					  }

					  .image-container {
					    position: absolute;
					    top: -33px;
					    right: 0;
					    left: 20px;
					    height: 400px;
					    width: 100%;
					    z-index: 1;

					    button {
					      position: absolute;
					      bottom: 5px;
					      left: 5px;
					    }
					    .image {
					      height: 400px;
					      width: 100%;
					      background-repeat: no-repeat;
					      background-size: cover;
					      background-position: 0 33%;
					    }
					  }

					  .rent-btn {
					    margin-top: 20px;
					    width: 100%;
					    padding: 10px 0;
					  }

					  .date-cell {
					    cursor: pointer;
					  }

					  .ratings-container {
					    .dv-star-rating {
					      margin-right: 5px;
					      margin-top: 0;
					    }
					  }

					}
				`}</style>

			</section>

		);

	}

}
