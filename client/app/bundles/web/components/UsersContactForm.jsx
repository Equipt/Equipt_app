import PropTypes from 'prop-types';
import React from 'react';

import FormFieldsHelper from 'helpers/FormFields';

export class UsersContactForm extends React.Component {

  static propTypes = {
    mapZenKey: PropTypes.string.isRequired,
    content: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      address: props.currentUser.address,
      phone: props.currentUser.phone.number
    }

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
      state: this.state.state,
      zip: this.state.zip,
      country: this.state.country
    };
    // Set phone params
    currentUser.phone = {
      number: this.state.phone
    };

    this.props.actions.updateCurrentUser({user: currentUser});

  }

  onChange(field) {

    const { value } = this.refs[field.name];

    // Change to select tag if US or CA is selected
    if (field.name === 'country') {

      field.tag = 'select';
      switch(value) {
        case 'us':
          field.options = field.states;
          break;
        case 'ca':
          field.options = field.provencies;
          break;
        default:
          field.tag = 'input';
      }
    }

    if (field.name === 'phone') {
      debugger;
    }

  }

  render() {

    const { contact } = this.props.content.profile;
    const { address, phone } = this.state;

    return (
      <section className="user-contact">

        <form onSubmit={ this.submitContact.bind(this) }>

          <h4>Contact Information</h4>

          <div className="row">
            { FormFieldsHelper.call(this, contact.address.formFields, phone.errors, phone) }
            { FormFieldsHelper.call(this, contact.phone.formFields, address.errors, address) }
          </div>

          <br/>

          <input type="submit" className="btn btn-success clearfix" value={ contact.button }/>

        </form>

      </section>
    )

  }

}
