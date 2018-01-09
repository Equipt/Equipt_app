import PropTypes from 'prop-types';
import React from 'react';

import { Link } from 'react-router-dom';
import Modal from 'components/Modal';
import StarRatings from 'react-star-rating-component';

export class SportingGood extends React.Component {

	static propTypes = {
		sportingGood: PropTypes.object.isRequired,
		content: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired,
		isOwner: PropTypes.bool
	}

	constructor(props) {
		super(props);
		this.state = {
			showDeleteModal: false
		}
	}

	getImage() {

		const { sportingGood, content } = this.props;
		const { default_image } = content.index;
		const { primary_image } = sportingGood;

		return <img src={ primary_image ? primary_image : default_image }/>;

	}

	sportingGoodIsOwners() {

		const { content, sportingGood, isOwner, actions } = this.props;
		const { showDeleteModal } = this.state;

		if (isOwner) {
			return (
				<div className="sporting-good-controls">
					<Link to={ `/owner/sporting_goods/${ sportingGood.slug }/edit` }>
					<i className="fa fa-pencil text-info" aria-hidden="true"></i>
					</Link>
					<i onClick={ this.showModal.bind(this, 'showDeleteModal', true) }
					className="fa fa-trash text-danger" aria-hidden="true"></i>

					<Modal
						contentLabel="delete-sporting-good"
						isVisible={ showDeleteModal }
						onClose={ this.showModal.bind(this, 'showDeleteModal', false) }>
						<div className="delete-modal">
							<h4>{ content.delete.title }</h4>
							<p className="text-danger">{ content.delete.warning }</p>
							<button onClick={ actions.deleteSportingGood.bind(this, sportingGood.slug, () => {
								this.showModal.bind(this, 'showDeleteModal', false)
								}) }
								className="btn btn-danger">
								{ content.delete.im_sure }
							</button>
							<button className="btn btn-info"
								onClick={ this.showModal.bind(this, 'showDeleteModal', false) }>
								{ content.delete.dont_delete }
							</button>
						</div>
					</Modal>

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

		const { sportingGood, isOwner } = this.props;

		return (

			<div className="col-lg-4 col-md-6 col-xs-12 sporting-good-wrapper">

				<div className="sporting-good-container">

		  		<Link to={{
		  			pathname: isOwner ? `/owner/sporting_goods/${ sportingGood.slug }` : `/sporting_goods/${ sportingGood.slug }`,
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
						<span>{ sportingGood.total_ratings || 0 } ratings</span>
					</Link>
					{ this.sportingGoodIsOwners() }
					<div className="clearfix"></div>

				</div>

			</div>

		)

	}

}
