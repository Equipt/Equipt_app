import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from './actions.js';

import Form from './components/Form.js';

function mapStateToProps(state, ownProps) {
	return { errors: state.errors }
}

function matchDispatchToProps(dispatch) {
	return {actions: bindActionCreators(sessionActions, dispatch)}
}

export default connect(mapStateToProps, matchDispatchToProps)(Form);
