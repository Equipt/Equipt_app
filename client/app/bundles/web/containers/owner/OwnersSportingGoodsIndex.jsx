import PropTypes from 'prop-types';
import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { Link } from 'react-router-dom';

import * as sportingGoodsActions from 'actions/sportingGoods';

import SportingGoodsList from 'components/SportingGoodsList';
import NoSportingGoods from 'components/NoSportingGoods';

class OwnersSportingGoodsIndex extends React.Component {

	componentDidMount() {
		const { actions } = this.props;
		actions.fetchOwnersSportingGoods();
	}

	render() {

		const { fetchOwnersSportingGoods } = this.props.actions;
		const content = this.props.content.owners_sporting_goods;

		return (
			<SportingGoodsList 	{ ...this.props}
					content={ content }
					isOwner={ true }
					search={ fetchOwnersSportingGoods }
					hasSearch={ false }/>
		);

	}

}

function mapStateToProps(state, ownProps) {
	return {
		sportingGoods: state.sportingGoods,
		loader: state.loader
	}
}

function matchDispatchToProps(dispatch) {
	return {actions: bindActionCreators(sportingGoodsActions, dispatch)}
}

export default connect(mapStateToProps, matchDispatchToProps)(OwnersSportingGoodsIndex);
