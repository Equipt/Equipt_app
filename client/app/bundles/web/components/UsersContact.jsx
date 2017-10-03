import PropTypes from 'prop-types';
import React from 'react';

import FormFieldsHelper from 'helpers/FormFields';

export class UsersContact extends React.Component {

  static propTypes = {
    mapZenKey: PropTypes.string.isRequired,
    setAddress: PropTypes.func.isRequired,
    content: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
  }

  submitContact(e) {
    e.preventDefault();
    const currentUser = this.props.currentUser || {};
    currentUser.address = this.state;
    this.props.actions.updateCurrentUser({user: currentUser});
  }

  render() {

    const currentUser = this.props.currentUser || {};
    const address = currentUser.address || {};
    const { contact } = this.props.content.profile.edit;

    return (
      <section className="user-contact">

        <form onSubmit={ this.submitContact.bind(this) }>

          <h4>Contact Information</h4>

          <div className="row">
            { FormFieldsHelper.call(this, contact.formFields, address.errors, address) }
          </div>

          <br/>

          <input type="submit" className="btn btn-success clearfix" value={ contact.button }/>

        </form>

      </section>
    )

  }

}
