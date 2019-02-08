import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as sessionActions from 'Session/actions.js';
import * as alertActions from 'Alert/actions.js';
import * as modalActions from 'Modal/actions.js';

import Profile from './components/Profile';

function mapStateToProps(state, ownProps) {
	return { currentUser: state.session.currentUser }
}

function matchDispatchToProps(dispatch) {
	return {actions: bindActionCreators({
		...sessionActions,
		...alertActions,
		...modalActions
	}, dispatch)}
}

export default connect(mapStateToProps, matchDispatchToProps)(Profile);
