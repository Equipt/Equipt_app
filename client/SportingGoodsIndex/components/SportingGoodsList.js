import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import SportingGood from './SportingGood';
import SearchBar from './SearchBar';
import NoSportingGoods from './NoSportingGoods';

export default class SportingGoodsList extends Component {

	static propTypes = {
		sportingsGood: PropTypes.array,
		actions: PropTypes.object.isRequired
	}

	componentDidMount() {
		const { actions } = this.props;
		actions.fetchSportingGoods({});
	}

	render() {

		const {
			sportingGoods,
			actions
		} = this.props;

		const { results = [], total = 0, owned = false } = sportingGoods;

		return (
			<section className="container sporting-goods-index-wrapper">

				{ !sportingGoods.owned ? <SearchBar { ...sportingGoods } { ...actions }/> : '' }

				{
					results.length ?
						results.map((sportingGood, index) => (
							<SportingGood
							key={ `${ sportingGood.title }_${ index }` }
							sportingGood={ sportingGood }
							owned={ owned }
							actions={ actions }/>
						)) :
						<NoSportingGoods/>
				}

			</section>
		)

	}
}
