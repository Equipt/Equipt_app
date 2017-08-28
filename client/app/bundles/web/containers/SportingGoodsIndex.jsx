import PropTypes from 'prop-types';
import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { Link } from 'react-router-dom';

import * as sportingGoodsActions from 'actions/sportingGoods';

import SportingGoodsList from 'components/SportingGoodsList';

class SportingGoodsIndex extends React.Component {

	componentDidMount() {
		const { actions } = this.props;
		actions.fetchSportingGoods();
	}

	render() {

		const { fetchSportingGoods } = this.props.actions;
		const content = this.props.content.sporting_goods.index;

		return (
			<SportingGoodsList { ...this.props } content={ content } search={ fetchSportingGoods }/>
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
