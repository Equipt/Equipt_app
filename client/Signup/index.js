import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Signup from './components/Signup';

import * as actions from './actions.js';
import * as alertActions from 'Alert/actions.js';
import * as sessionActions from 'Session/actions.js';
import * as modalActions from 'Modal/actions.js';

function mapStateToProps(state, ownProps) {
	return {
		session: state.session,
		user: state.user
	}
}

function matchDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({
			...actions,
			...alertActions,
			...sessionActions,
			...modalActions
		}, dispatch)
	}
}

export default connect(mapStateToProps, matchDispatchToProps)(Signup);
