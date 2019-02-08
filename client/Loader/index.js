import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as sessionActions from './actions.js';

import Loader from './components/Loader.js';

function mapStateToProps(state, ownProps) {
	return {loader: state.loader}
}

function matchDispatchToProps(dispatch) {
	return {actions: bindActionCreators(sessionActions, dispatch)}
}

export default connect(mapStateToProps, matchDispatchToProps)(Loader);
