import PropTypes from 'prop-types';
import React from 'react';
import Moment from 'moment';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {extendMoment} from 'moment-range';

import * as sportingGoodActions from 'actions/sportingGood';
import * as alertActions from 'actions/alerts';
import * as currentUserActions from 'actions/session';
import * as rentalActions from 'actions/rental';

import Loader from 'components/Loader';
import { SportingGoodDetails } from 'components/SportingGoodDetails';

const moment = extendMoment(Moment);

export class SportingGoodsShow extends React.Component {

	static contextTypes = {
  		router: PropTypes.shape({
    		history: PropTypes.object.isRequired
  		})
	};

	constructor(props) {
		super(props);
		this.state = {
			showRentalTermsModal: false
		}
	}

	componentWillMount() {

		const { actions }  = this.props;
		const { pathname } = this.context.router.route.location;

		actions.clearRental();
		actions.fetchSportingGood(pathname);

	}

	render() {

		const { sportingGood } = this.props;

		return(
			<div>
				{ Object.keys(sportingGood).length ? <SportingGoodDetails { ...this.props }/> : <Loader/> }
			</div>
		)
	}

}

function mapStateToProps(state, ownProps) {
	return {
		currentUser: state.session.currentUser,
		sportingGood: state.sportingGood,
		rental: state.rental || {}
	}
}

function matchDispatchToProps(dispatch) {
	return {actions: bindActionCreators({
																				...sportingGoodActions,
																				...alertActions,
																				...currentUserActions,
																				...rentalActions
																			},
																			dispatch)}
}

export default connect(mapStateToProps, matchDispatchToProps)(SportingGoodsShow);
