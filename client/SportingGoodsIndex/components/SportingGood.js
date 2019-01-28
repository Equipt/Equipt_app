import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import Modal from '../../Modal';
import StarRatings from 'react-star-rating-component';
import DeleteSportingGood from './DeleteSportingGood';

export default class SportingGood extends Component {

	static propTypes = {
		sportingGood: PropTypes.object.isRequired,
		content: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired,
		owned: PropTypes.bool.isRequired
	}

	constructor(props) {
		super(props);
		this.state = {
			showDeleteModal: false
		}
	}

	getImage() {

		const { sportingGood } = this.props;
		const { primary_image } = sportingGood;

		return <img src={ primary_image ? primary_image : I18n.t('index.default_image') }/>;

	}

	sportingGoodIsOwners() {

		const { content, sportingGood, owned, actions } = this.props;
		const { showDeleteModal } = this.state;

		if (owned) {
			return (
				<div className="sporting-good-controls">
					<Link to={ `/owner/sporting_goods/${ sportingGood.slug }/edit` }>
					<i className="fa fa-pencil text-info" aria-hidden="true"></i>
					</Link>
					<i onClick={ () => actions.openModal(<DeleteSportingGood { ...this.props }/>) }
						 className="fa fa-trash text-danger" aria-hidden="true"></i>
				</div>
			);
		}

	}

	showModal(modalName, isVisible) {
		this.setState({
			[modalName]: isVisible
		});
	}

	render() {

		const { sportingGood, owned } = this.props;

		return (

			<div className="col-lg-4 col-md-6 col-xs-12 sporting-good-wrapper">

				<div className="sporting-good-container">

		  		<Link to={{
		  			pathname: owned ? `/owner/sporting_goods/${ sportingGood.slug }` : `/sporting_goods/${ sportingGood.slug }`,
		  			state: { sportingGoodSlug: sportingGood.slug }}}>
						<div className="sporting-good-image">
							{ this.getImage() }
						</div>
						<h5 className="title"><span>${ sportingGood.price_per_day } per day (CAN)</span> - { sportingGood.title }</h5>
						<p>{ sportingGood.model } - { sportingGood.brand }</p>
						<StarRatings
								name="sportingGoodRating"
								starCount={ 5 }
								value={ sportingGood.overall_rating }
						/>
						<span className="sporting_good_rating">{ sportingGood.total_ratings || 0 } ratings</span>
					</Link>
					{ this.sportingGoodIsOwners() }
					<div className="clearfix"></div>
				</div>
			</div>
		)

	}

}
