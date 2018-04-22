import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as sportingGoodActions from 'actions/sportingGood';
import * as alertActions from 'actions/alerts';
import * as sessionActions from 'actions/session';
import * as modalActions from 'actions/modal';

import { SportingGoodsForm } from 'components/SportingGoodsForm';

class SportingGoodsNew extends React.Component {

	componentWillMount() {

		const { actions } = this.props;

		actions.setSportingGood({
			category: 'snow'
		});

	}

	render() {

		const { actions } = this.props;

		return (
			<SportingGoodsForm { ...this.props } createOrUpdate={ actions.createSportingGood }/>
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
	return {actions: bindActionCreators({
		...sportingGoodActions,
		...alertActions,
		...sessionActions,
		...modalActions
	}, dispatch)}
}

export default connect(mapStateToProps, matchDispatchToProps)(SportingGoodsNew);
