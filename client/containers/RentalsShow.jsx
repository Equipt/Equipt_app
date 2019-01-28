import PropTypes from 'prop-types';
import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as rentalActions from 'actions/rental';
import * as ratingsActions from 'actions/ratings';

import RentalConfirmation from 'components/RentalConfirmation';

class RentalsShow extends React.Component {

	static contextTypes = {
  		router: PropTypes.shape({
    		history: PropTypes.object.isRequired,
  		})
	};

	componentWillMount() {

		const { actions } = this.props;
		const { params } = this.context.router.route.match;

		// Should be fetching the rental here
		actions.fetchRental(params.slug, params.id);

	}

	render() {

		return (
			<RentalConfirmation {...this.props}/>
		)

	}

}

function mapStateToProps(state, ownProps) {
	return {
		rental: state.rental || {},
		loader: state.loader
	}
}

function matchDispatchToProps(dispatch) {
	return {actions: bindActionCreators({ ...rentalActions, ...ratingsActions }, dispatch)}
}

export default connect(mapStateToProps, matchDispatchToProps)(RentalsShow);
