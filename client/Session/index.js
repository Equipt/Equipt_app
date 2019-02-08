import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from './actions.js';

import Session from './components/Session';

function mapStateToProps(state, ownProps) {
	return {
		session: state.session,
		location: state.routing.location,
		sportingGood: state.sportingGood
	}
}

function matchDispatchToProps(dispatch) {
	return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, matchDispatchToProps)(Session);
