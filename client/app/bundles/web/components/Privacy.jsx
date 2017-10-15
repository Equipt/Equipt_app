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

  showDeleteAccountModal(state) {
    this.setState({
      deleteModalIsOpen: state
    });
  }

  render() {

    const { currentUser, content } = this.props;

    return (
      <section className="privacy-wrapper">

        <h5>Privacy</h5>

        <ul>

        <li className="radio-container send-email-notifications">
        <input type="radio" value={ currentUser.notify }/>
        <label>{ content.profile.privacy.email_notifications }</label>
        </li>

        </ul>

        <button onClick={ this.showDeleteAccountModal.bind(this, true) }
                className="btn btn-danger">
                { content.profile.privacy.delete_account }
        </button>

        <Modal contentLabel="delete-account"
        isVisible={ this.state.deleteModalIsOpen }
        onClose={ this.showDeleteAccountModal.bind(this, false) }>
          <DeleteAccount { ...this.props }/>
        </Modal>

      </section>
    )

  }

}
