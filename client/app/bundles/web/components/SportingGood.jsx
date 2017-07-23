import React from 'react';

import { Link } from 'react-router-dom';

const SportingGood = ({
	sportingGood
}) => {

	return (
		<div className="col-lg-4 col-md-6 col-xs-12">
  			<Link to={{
  				pathname: `/sporting_goods/${ sportingGood.slug }`,
  				state: { sportingGoodSlug: sportingGood.slug }}}>
				<h3>{ sportingGood.title }</h3>
				<h4>Brand: { sportingGood.brand }</h4>
				<h4>Model: { sportingGood.model }</h4>

				<div>
					<p>Deposit: ${ sportingGood.desposit_amount }</p>
					<p>Price Per Day: ${ sportingGood.price_per_day }</p>
					<p>Price Per Week: ${ sportingGood.price_per_week }</p>
				</div>

			</Link>
		</div>
	)

}

export default SportingGood;