import PropTypes from 'prop-types';
import React, { Component } from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { Link } from 'react-router-dom';

import * as actions from './actions.js';

import Login from './components/Login';

const mapStateToProps = (state, ownProps) => ({
  session: state.session
});

const matchDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, matchDispatchToProps)(Login);
