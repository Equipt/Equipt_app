import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { SportingGood } from 'components/SportingGood';
import { SearchBar } from 'components/SearchBar';
import NoSportingGoods from 'components/NoSportingGoods';

const SportingGoodsList = ({
	sportingGoods,
	loader,
	content,
	search,
	actions,
	isOwner,
	hasSearch = true
}) => {

	const { results = [], total = 0 } = sportingGoods;

	return (
		<section className="container sporting-goods-index-wrapper">

			<h3>{ content.title }</h3>

			{ hasSearch ? <SearchBar { ...sportingGoods } search={ search }/> : '' }

			{
				!results.length ?
				<NoSportingGoods content={ content }/> :
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
