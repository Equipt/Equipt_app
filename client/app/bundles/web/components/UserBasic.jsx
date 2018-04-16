import React, { Component } from 'react';

import UserBasicForm from './forms/UserBasic';

class UserBasic extends Component {

  constructor(props) {
    super(props);
    this.updateUser = this.updateUser.bind(this);
  }

  updateUser(user) {
    const { updateCurrentUser, showSuccessAlert } = this.props.actions;
    updateCurrentUser(user, user => showSuccessAlert(user.notice));
  }

  render() {
    const { currentUser } = this.props;
    return <UserBasicForm currentUser={ currentUser } onSubmit={ this.updateUser }/>
  }

}

export default UserBasic;
