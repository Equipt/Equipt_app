import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux';  
import { bindActionCreators } from 'redux';

import * as sportingGoodsActions from 'actions/sportingGoods';

class OwnersCalendar extends React.Component {

	render() {
		return (
			<div className="container">
				<h3>Owners Calendar</h3>
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

export default connect(mapStateToProps, matchDispatchToProps)(OwnersCalendar);