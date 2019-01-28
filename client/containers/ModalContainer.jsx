import React, { Component } from 'react';
import Modal from 'components/Modal';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as modalActions from 'actions/modal';

class ModalContainer extends Component {

  render() {
    return <Modal { ...this.props }/>;
  }

}

function mapStateToProps(state, ownProps) {
	return { modal: state.modal }
}

function matchDispatchToProps(dispatch) {
	return {actions: bindActionCreators(modalActions, dispatch)}
}

export default connect(mapStateToProps, matchDispatchToProps)(ModalContainer);
