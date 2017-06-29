import React from 'react';

import { Link } from 'react-router-dom';

const SportingGood = (props) => {

	const { sportingGood } = props;

	return (
		<div className="col-lg-3 col-md-6 col-xs-12">
  			<Link to={{
  				pathname: `/sporting_goods/${ sportingGood.slug }`,
  				state: { sportingGoodSlug: sportingGood.slug }}}>
				{ sportingGood.title }
			</Link>
		</div>
	)

}

export default SportingGood;