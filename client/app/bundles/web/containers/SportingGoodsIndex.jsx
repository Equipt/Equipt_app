import PropTypes from 'prop-types';
import React from 'react';

import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux';

import { Link } from 'react-router-dom';

import * as sportingGoodsActions from 'actions/sportingGoods';

import SportingGood from 'components/SportingGood';

class SportingGoodsIndex extends React.Component {

	componentWillMount() {
		const { actions } = this.props;
		actions.fetchSportingGoods();
	}

	render() {

		const { sportingGoods } = this.props;

		return (
			<section className="container">
			{
				sportingGoods.map(sportingGood => {
					return <SportingGood key={ sportingGood.title } sportingGood={sportingGood}/>
				})	
			}
			</section>
		)
	}

}

function mapStateToProps(state, ownProps) {
	return {
		sportingGoods: state.sportingGoods
	}
}

function matchDispatchToProps(dispatch) {  
	return {actions: bindActionCreators(sportingGoodsActions, dispatch)}
}

export default connect(mapStateToProps, matchDispatchToProps)(SportingGoodsIndex);