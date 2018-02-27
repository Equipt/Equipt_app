import React from 'react';
import PropTypes from 'prop-types';

import { DeleteAccount } from 'components/DeleteAccount';
import Modal from 'components/Modal';

export class Privacy extends React.Component {

  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    content: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      deleteModalIsOpen: false
    }

  }

  changeEmailNotificationStatus() {

    const { actions, currentUser } = this.props;
    const { notifyByEmailCheckbox } = this.refs;

    currentUser.notifyByEmail = notifyByEmailCheckbox.checked;

    actions.updateCurrentUser(currentUser);

  }

  showDeleteAccountModal(state) {
    this.setState({
      deleteModalIsOpen: state
    });
  }

  render() {

    const { currentUser, content, actions } = this.props;

    return (
      <section className="privacy-wrapper">

        <h5>Privacy</h5>

        <ul>

        <li className="radio-container send-email-notifications">
          <input type="checkbox"
                 ref="notifyByEmailCheckbox"
                 defaultChecked={ currentUser.notifyByEmail }
                 onChange={ this.changeEmailNotificationStatus.bind(this) }/>
          <label>{ content.profile.privacy.email_notifications }</label>
        </li>

        </ul>

        <button onClick={ () => actions.openModal(<DeleteAccount { ...this.props }/>) }
                className="btn btn-danger">
                { content.profile.privacy.delete_account }
        </button>

      </section>
    )

  }

}
