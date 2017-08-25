import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux';  
import { bindActionCreators } from 'redux';

import * as sportingGoodActions from 'actions/sportingGood';

import { SportingGoodsForm } from 'components/SportingGoodsForm';

class SportingGoodsNew extends React.Component {

	componentWillMount() {
		this.props.actions.newSportingGood();
	}

	render() {

		const { actions } = this.props;

		const content = this.props.content.sporting_goods.create;

		return (
			<SportingGoodsForm 	{ ...this.props } 
								content={ content } 
								submit={ this.submit } 
								createOrUpdate={ actions.createSportingGood }/>
		)
	}

}

function mapStateToProps(state, ownProps) {
	return {
		sportingGood: state.sportingGood
	}
}

function matchDispatchToProps(dispatch) {  
	return {actions: bindActionCreators(sportingGoodActions, dispatch)}
}

export default connect(mapStateToProps, matchDispatchToProps)(SportingGoodsNew);