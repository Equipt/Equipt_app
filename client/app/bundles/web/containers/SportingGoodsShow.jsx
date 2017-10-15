import PropTypes from 'prop-types';
import React from 'react';
import Moment from 'moment';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {extendMoment} from 'moment-range';

import * as sportingGoodActions from 'actions/sportingGood';
import * as alertActions from 'actions/alerts';
import * as currentUserActions from 'actions/session';

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
			rental: {
				agreedToTerms: false
			},
			showRentalTermsModal: false
		}
	}

	componentWillMount() {

		const { actions }  = this.props;
		const { pathname } = this.context.router.route.location;

		actions.fetchSportingGood(pathname);

	}

	rent() {

		const sportingGood = this.props.sportingGood || {};

		this.props.actions.rent(this.state.rental, sportingGood, (rental = {}) => {
			this.context.router.history.push(`/sporting_goods/${ sportingGood.slug }/rentals/${ rental.hashId }`);
		});

	}

	showModal(modal, isVisible) {
		this.setState({
			[modal]: isVisible
		})
	}

	selectRental(rental) {

		const startDate = Moment(rental.start);
		const difference = Moment().diff(startDate, 'day');

		const selectedRange = moment.range(rental.start, rental.end);

		const { actions } = this.props;
		const { rentals } = this.props.sportingGood;

		let unavailable = false;

		// Cannot select a taken date
		rentals.forEach(rental => {
			const rentalRange = moment.range(rental.start, rental.end);
			if (rentalRange.overlaps(selectedRange)) unavailable = true;
		});

		if (unavailable) {
			return actions.showErrorAlert({error: 'Sorry, this item is taken during this time.'});
		}

		// Can't select dates in the past
		if (difference > 0) {
			return actions.showErrorAlert({error: 'Starting Date cannot be in the past.'});
		}

		// Can't rent today
		else if (difference === 0) {
			return actions.showErrorAlert({error: 'Starting Date cannot be today.'});
		}

		actions.clearAlerts();

		this.setState({
			rental: {
				title: 'renting',
				start: rental.start,
				end: Moment(rental.end, "DD-MM-YYYY").add(1, 'days'),
				agreedToTerms: this.state.rental.agreedToTerms
			}
		});

	}

	agreeWithTermsChanged() {
		const { rental } = this.state;
		rental.agreedToTerms = rental.agreedToTerms ? false : true
		this.setState({ rental: rental });
	}

	render() {

		return(
			<SportingGoodDetails { ...this.props }
								 rent={ this.rent.bind(this) }
								 rental={ this.state.rental || {} }
								 selectRental={ this.selectRental.bind(this) }
								 showRentalTermsModal={ this.state.showRentalTermsModal }
								 showModal={ this.showModal.bind(this) }
								 agreeWithTermsChanged={ this.agreeWithTermsChanged.bind(this) }/>
		)
	}

}

function mapStateToProps(state, ownProps) {
	return {
		currentUser: state.session.currentUser,
		sportingGood: state.sportingGood
	}
}

function matchDispatchToProps(dispatch) {
	return {actions: bindActionCreators({ ...sportingGoodActions, ...alertActions, ...currentUserActions }, dispatch)}
}

export default connect(mapStateToProps, matchDispatchToProps)(SportingGoodsShow);
