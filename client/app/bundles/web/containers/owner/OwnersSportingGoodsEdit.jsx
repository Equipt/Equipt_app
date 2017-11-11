import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as sportingGoodActions from 'actions/sportingGood';
import * as sessionActions from 'actions/session';

import { SportingGoodsForm } from 'components/SportingGoodsForm';

class OwnersSportingGoodsEdit extends React.Component {

	static contextTypes = {
  		router: PropTypes.shape({
    		history: PropTypes.object.isRequired
  		})
	};

	componentWillMount() {

		const { actions }  = this.props;
		const { slug }	   = this.context.router.route.match.params;

		this.props.actions.editSportingGood(slug);

	}

	render() {

		const content = this.props.content.sporting_goods.update;
		const { actions } = this.props;

		return (
			<SportingGoodsForm 	{ ...this.props }
								content={ content }
								isEditing={ true }
								createOrUpdate={ actions.updateSportingGood }/>
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
	return {actions: bindActionCreators({ ...sportingGoodActions, ...sessionActions }, dispatch)}
}

export default connect(mapStateToProps, matchDispatchToProps)(OwnersSportingGoodsEdit);
