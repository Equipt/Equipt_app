import PropTypes from 'prop-types';
import React from 'react';

import { Link } from 'react-router-dom';

const SportingGood = ({
	sportingGood,
	content,
	isOwner = false,
	actions
}) => {

	let images = sportingGood.images || [];

	let primaryImage = images.filter(image => image.primary)[0];

	let imageSrc = content.default_image;

	// Get Correct Image
	if (primaryImage) {
		imageSrc = primaryImage.file.url;
	} else if (images[0]) {
		imageSrc = images[0].file.url;
	}

	// Add Controls
	let controls = '';

	if (isOwner) {
		controls = (<div className="sporting-good-controls">
			<Link to={ `/owner/sporting_goods/${ sportingGood.slug }/edit` }>
				<i className="fa fa-pencil text-info" aria-hidden="true"></i>
			</Link>
			<i 	onClick={ actions.deleteSportingGood.bind(this, sportingGood.slug) }
				className="fa fa-trash text-danger" aria-hidden="true"></i>
		</div>);
	}

	return (

		<div className="col-lg-4 col-md-6 col-xs-12 sporting-good-wrapper">

			<div className="sporting-good-container">

	  			<Link to={{
	  				pathname: `/sporting_goods/${ sportingGood.slug }`,
	  				state: { sportingGoodSlug: sportingGood.slug }}}>

					<div className="sporting-good-image">
						<img src={ imageSrc }/>
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

				{ controls }

				<div className="clearfix"></div>

			</div>
		</div>
	)

}

SportingGood.propTypes = {
	sportingGood: PropTypes.object.isRequired,
	content: PropTypes.object.isRequired,
	isOwner: PropTypes.bool
};

export default SportingGood;
