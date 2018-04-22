import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';

import UserBasicForm from './forms/UserBasic';

class UserBasic extends Component {

  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    actions: PropTypes.shape({
      updateCurrentUser: PropTypes.func.isRequired,
      showSuccessAlert: PropTypes.func.isRequired
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      profileImage: null
    }
    this.updateUser = this.updateUser.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  updateUser(user) {
    const { updateCurrentUser, showSuccessAlert } = this.props.actions;
    updateCurrentUser(user, user => showSuccessAlert(user.notice));
  }

  onDrop(data) {
    const profileImage = data[0] || null;
    this.setState({ profileImage });
  }

  render() {
    const { currentUser } = this.props;
    return (
      <UserBasicForm currentUser={ currentUser } onSubmit={ this.updateUser }/>
    )
  }

}

export default UserBasic;
