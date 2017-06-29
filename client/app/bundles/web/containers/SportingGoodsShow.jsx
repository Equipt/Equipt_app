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

	componentDidMount() {
		
		const { actions }  = this.props;
		const { pathname } = this.context.router.route.location;

		actions.fetchSportingGood(pathname);
		
	}

	render() {

		const { sportingGood } = this.props;

		return(
			<SportingGoodDetails sportingGood={ sportingGood }/>
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