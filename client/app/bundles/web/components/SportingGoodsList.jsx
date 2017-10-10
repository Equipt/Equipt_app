import PropTypes from 'prop-types';
import React from 'react';

import { Link } from 'react-router-dom';

import { SportingGood } from 'components/SportingGood';
import { SearchBar } from 'components/SearchBar';

import Loader from 'components/Loader';

const SportingGoodsList = ({
	loader,
	sportingGoods,
	content,
	isOwner,
	search,
	actions
}) => {

	const loaderMarkUp = () => <Loader/>;

	const sportingGoodsMarkup = () => {
		return sportingGoods.map((sportingGood, index) => {
			return <SportingGood key={ `${ sportingGood.title }_${ index }` }
							 sportingGood={ sportingGood }
							 content={ content }
							 isOwner={ isOwner }
							 actions={ actions }/>
		});
	}

	return (
		<section className="container">

			<h3>{ content.title }</h3>

			<SearchBar search={ search }/>

			{ loader ? loaderMarkUp() :  sportingGoodsMarkup() }

		</section>
	)

}

SportingGoodsList.propTypes = {
	loader: PropTypes.bool.isRequired,
	sportingsGood: PropTypes.array,
	content: PropTypes.object.isRequired,
	search: PropTypes.func.isRequired,
	actions: PropTypes.object.isRequired,
	isOwner: PropTypes.bool,
}

export default SportingGoodsList;
