import PropTypes from 'prop-types';
import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as sportingGoodActions from 'actions/sportingGood';

import RentalConfirmation from 'components/RentalConfirmation';

class RentalsShow extends React.Component {

	static contextTypes = {
  		router: PropTypes.shape({
    		history: PropTypes.object.isRequired,
  		})
	};

	componentWillMount() {

		if (this.props.sportingGood.rental) return;

		const { actions } = this.props;
		const { params } = this.context.router.route.match;

		actions.fetchSportingGood(`/sporting_goods/${ params.slug }`, params.id);

	}

	render() {

		return (
			<RentalConfirmation {...this.props}/>
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

export default connect(mapStateToProps, matchDispatchToProps)(RentalsShow);
