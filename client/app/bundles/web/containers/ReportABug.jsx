import PropTypes from 'prop-types';
import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as utilsActions from 'actions/utils';

import ReportABugComponent from 'components/ReportABug';

class ReportABug extends React.Component {

	render() {
		return (
			<ReportABugComponent { ...this.props }/>
		)
	}

}

function matchDispatchToProps(dispatch) {
	return {actions: bindActionCreators({ ...utilsActions }, dispatch)}
}

export default connect(null, matchDispatchToProps)(ReportABug);
