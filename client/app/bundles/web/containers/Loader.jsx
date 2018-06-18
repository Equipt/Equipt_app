import PropTypes from 'prop-types';
import React, { Component } from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { Link } from 'react-router-dom';

import * as sessionActions from 'actions/session';

import LoaderComponent from 'components/Loader';

class Loader extends Component {

	render() {
		return (
			<LoaderComponent { ...this.props }/>
		)
	}

}

function mapStateToProps(state, ownProps) {
	return {loader: state.loader}
}

function matchDispatchToProps(dispatch) {
	return {actions: bindActionCreators(sessionActions, dispatch)}
}

export default connect(mapStateToProps, matchDispatchToProps)(Loader);
