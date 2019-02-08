import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {extendMoment} from 'moment-range';

import * as actions from './actions.js';
import * as alertActions from 'Alert/actions';
import * as sessionActions from 'Session/actions.js';
import * as rentalsActions from 'RentalsShow/actions.js';
import * as modalActions from 'Modal/actions.js';

import Wrapper from './components/Wrapper.js';

function mapStateToProps(state, ownProps) {
	return {
		currentUser: state.session.currentUser,
		sportingGood: state.sportingGood,
		rental: state.rental || {},
		loader: state.loader
	}
}

function matchDispatchToProps(dispatch) {
	return {actions: bindActionCreators({
    ...actions,
    ...alertActions,
    ...sessionActions,
    ...rentalsActions,
    ...modalActions
  },
  dispatch)}
}

export default connect(mapStateToProps, matchDispatchToProps)(Wrapper);
