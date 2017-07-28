import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux';  
import { bindActionCreators } from 'redux';

import * as sportingGoodsActions from 'actions/sportingGoods';

import SportingGoodsForm from 'components/SportingGoodsForm';

class SportingGoodsNew extends React.Component {

	render() {
		return (
			<SportingGoodsForm { ...this.props }/>
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

export default connect(mapStateToProps, matchDispatchToProps)(SportingGoodsNew);