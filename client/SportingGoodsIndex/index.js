import PropTypes from 'prop-types';
import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { Link } from 'react-router-dom';

import * as sportingGoodsActions from './actions.js';

import SportingGoodsList from './components/SportingGoodsList';

function mapStateToProps(state, ownProps) {
	return { sportingGoods: state.sportingGoods }
}

function matchDispatchToProps(dispatch) {
	return {actions: bindActionCreators(sportingGoodsActions, dispatch)}
}

export default connect(mapStateToProps, matchDispatchToProps)(SportingGoodsList);
