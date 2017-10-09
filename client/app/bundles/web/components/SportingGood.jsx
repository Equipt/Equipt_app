import PropTypes from 'prop-types';
import React from 'react';

import { Link } from 'react-router-dom';
import Modal from 'components/modal';

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

		const images = sportingGood.images || [];
		const primaryImage = images.filter(image => image.primary)[0];

		// Get Correct Image

		if (!images.length) {
			return <img src={ content.index.default_image }/>;
		}

		if (primaryImage) {
			return <img src={ primaryImage.file.url }/>;
		}

		return <img src={ images[0].file.url }/>;

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
						onClose={ () => this.showModal('showDeleteModal', false) }>
						<div className="delete-modal">
						
							<h4 dangerouslySetInnerHTML={{__html: content.delete.title}}></h4>

							<p className="text-danger">{ content.delete.warning }</p>

							<button onClick={ actions.deleteSportingGood.bind(this, sportingGood.slug) }
											className="btn btn-danger">
											{ content.delete.yes }
							</button>

							<button className="btn btn-info">{ content.delete.no }</button>

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

		const { sportingGood } = this.props;

		return (

			<div className="col-lg-4 col-md-6 col-xs-12 sporting-good-wrapper">

				<div className="sporting-good-container">

		  			<Link to={{
		  				pathname: `/sporting_goods/${ sportingGood.slug }`,
		  				state: { sportingGoodSlug: sportingGood.slug }}}>

						<div className="sporting-good-image">
							{ this.getImage() }
						</div>

						<h3 className="title">{ sportingGood.title }</h3>
						<h4>Brand: { sportingGood.brand }</h4>
						<h4>Model: { sportingGood.model }</h4>

						<div>
							<p>Deposit: ${ sportingGood.deposit }</p>
							<p>Price Per Day: ${ sportingGood.pricePerDay }</p>
							<p>Price Per Week: ${ sportingGood.pricePerWeek }</p>
						</div>

					</Link>

					{ this.sportingGoodIsOwners() }

					<div className="clearfix"></div>

				</div>

			</div>

		)

	}

}
