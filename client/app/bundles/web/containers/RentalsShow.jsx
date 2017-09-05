import PropTypes from 'prop-types';
import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as rentalActions from 'actions/rental';

import RentalConfirmation from 'components/RentalConfirmation';

class RentalsShow extends React.Component {

	render() {

		debugger;

		return (
			<RentalConfirmation {...this.props}/>
		)

	}

}

function mapStateToProps(state, ownProps) {
	return {
		session: state.rental
	}
}

function matchDispatchToProps(dispatch) {
	return {actions: bindActionCreators(rentalActions, dispatch)}
}

export default connect(mapStateToProps, matchDispatchToProps)(RentalsShow);
