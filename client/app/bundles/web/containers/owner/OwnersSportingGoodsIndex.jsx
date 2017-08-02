import PropTypes from 'prop-types';
import React from 'react';

import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux';

import { Link } from 'react-router-dom';

import * as sportingGoodsActions from 'actions/sportingGoods';

import SportingGoodsList from 'components/SportingGoodsList';

class OwnersSportingGoodsIndex extends React.Component {

	componentDidMount() {
		const { actions } = this.props;
		actions.fetchOwnersSportingGoods();
	}

	render() {

		const { sportingGoods } = this.props;

		return (
			<div className="container">
				<h3>Owners Sporting Goods Index</h3>
				<SportingGoodsList sportingGoods={ sportingGoods }/>
			</div>
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

export default connect(mapStateToProps, matchDispatchToProps)(OwnersSportingGoodsIndex);