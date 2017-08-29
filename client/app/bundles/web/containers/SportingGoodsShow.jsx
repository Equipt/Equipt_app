import PropTypes from 'prop-types';
import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as sportingGoodActions from 'actions/sportingGood';

import SportingGoodDetails from 'components/SportingGoodDetails';

export class SportingGoodsShow extends React.Component {

	static contextTypes = {
  		router: PropTypes.shape({
    		history: PropTypes.object.isRequired
  		})
	};

	constructor(props) {
		super(props);
		this.state = {
			rental: {}
		}
	}

	componentWillMount() {

		const { actions }  = this.props;
		const { pathname } = this.context.router.route.location;

		actions.fetchSportingGood(pathname);

	}

	rent() {

		const { slug } = this.context.router.route.match.params;

		this.props.actions.rent(this.state.rental, slug, () => {

		});
		
	}

	selectRental(rental) {
		this.setState({
			rental: {
				title: 'renting',
				start: rental.start,
				end: rental.end
			}
		})
	}

	render() {

		const { sportingGood } = this.props;

		return(
			<SportingGoodDetails rent={ this.rent.bind(this) }
								 rentals={ [] }
								 rental={ this.state.rental }
								 sportingGood={ sportingGood }
								 selectRental={ this.selectRental.bind(this) }/>
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

export default connect(mapStateToProps, matchDispatchToProps)(SportingGoodsShow);
