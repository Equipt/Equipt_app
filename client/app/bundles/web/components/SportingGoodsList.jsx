import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { SportingGood } from 'components/SportingGood';
import { SearchBar } from 'components/SearchBar';
import NoSportingGoods from 'components/NoSportingGoods';

import Loader from 'components/Loader';

const SportingGoodsList = ({
	sportingGoods,
	loader,
	content,
	search,
	actions,
	isOwner
}) => {

	const { results = [], total = 0 } = sportingGoods;

	if (!results.length && !loader) {
		return <NoSportingGoods content={ content }/>;
	}

	return (
		<section className="container">

			<h3>{ content.title }</h3>

			<SearchBar search={ search } pagesTotal={ total }/>

			{
				loader ?
				<Loader/> :
				results.map((sportingGood, index) => {

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
	loader: PropTypes.bool.isRequired,
	sportingsGood: PropTypes.array,
	content: PropTypes.object.isRequired,
	search: PropTypes.func.isRequired,
	actions: PropTypes.object.isRequired,
	isOwner: PropTypes.bool,
}

export default SportingGoodsList;
