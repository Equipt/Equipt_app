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
    const currentUser = props.currentUser || {};
    this.state = Object.assign(currentUser.address, currentUser.phone);
  }

  submitContact(e) {
    e.preventDefault();
    const currentUser = this.props.currentUser || {};
    // Set address params
    currentUser.address = {
      unit: this.state.unit,
      number: this.state.number,
      street: this.state.street,
      city: this.state.city,
      zip: this.state.zip,
      country: this.state.country
    };
    // Set phone params
    currentUser.phone = {
      number: this.state.phone
    };

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
