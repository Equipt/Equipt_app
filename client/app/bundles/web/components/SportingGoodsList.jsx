import PropTypes from 'prop-types';
import React from 'react';

import { Link } from 'react-router-dom';

import { SportingGood } from 'components/SportingGood';
import { SearchBar } from 'components/SearchBar';
import NoSportingGoods from 'components/NoSportingGoods';

import Loader from 'components/Loader';

const SportingGoodsList = ({
	loader,
	sportingGoods,
	content,
	isOwner,
	search,
	actions
}) => {

	if (loader) {
		return <Loader/>;
	}

	if (!sportingGoods.length) {
		return (<NoSportingGoods content={ content }/>);
	}

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
								 actions={ actions }/>;

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
