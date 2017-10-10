import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as sportingGoodActions from 'actions/sportingGood';
import * as alertActions from 'actions/alerts';

import { SportingGoodsForm } from 'components/SportingGoodsForm';

class SportingGoodsNew extends React.Component {

	componentWillMount() {

		const { actions } = this.props;

		actions.setSportingGood({});

	}

	render() {

		const { actions } = this.props;

		const content = this.props.content.sporting_goods.create;

		return (
			<SportingGoodsForm { ...this.props }
								content={ content }
								createOrUpdate={ actions.createSportingGood }/>
		)
	}

}

function mapStateToProps(state, ownProps) {
	return {
		sportingGood: state.sportingGood,
		currentUser: state.session ? state.session.currentUser : {}
	}
}

function matchDispatchToProps(dispatch) {
	return {actions: bindActionCreators({ ...sportingGoodActions, ...alertActions}, dispatch)}
}

export default connect(mapStateToProps, matchDispatchToProps)(SportingGoodsNew);
