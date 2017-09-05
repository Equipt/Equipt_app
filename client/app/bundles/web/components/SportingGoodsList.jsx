import PropTypes from 'prop-types';
import React from 'react';

import { Link } from 'react-router-dom';

import SportingGood from 'components/SportingGood';
import { SearchBar } from 'components/SearchBar';

const SportingGoodsList = ({
	sportingGoods,
	content,
	isOwner,
	search,
	actions
}) => {

	return (
		<section className="container">

			<h3>{ content.title }</h3>

			<SearchBar search={ search }/>

			{
				sportingGoods.map((sportingGood, index) => {
					return <SportingGood key={ `${ sportingGood.title }_${ index }` }
										 sportingGood={ sportingGood }
										 content={ content }
										 isOwner={ isOwner }
										 actions={ actions }/>
				})
			}

		</section>
	)

}

SportingGoodsList.propTypes = {
	sportingsGood: PropTypes.array,
	content: PropTypes.object.isRequired,
	search: PropTypes.func.isRequired,
	actions: PropTypes.object.isRequired,
	isOwner: PropTypes.bool,
}

export default SportingGoodsList;
