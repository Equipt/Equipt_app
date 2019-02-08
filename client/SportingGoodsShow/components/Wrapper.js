import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Details from './Details.js';

export default class SportingGoodsShow extends Component {

	static contextTypes = {
		router: PropTypes.shape({
			history: PropTypes.object.isRequired,
		})
	};

	constructor(props) {
		super(props);
	}

	componentDidMount() {

		const { actions }  = this.props;

		const slug = this.context.router.route.match.params.slug;

		// actions.clearRental();
		actions.fetchSportingGood(slug);

	}

	render() {
		return <Details { ...this.props }/>
	}

}
