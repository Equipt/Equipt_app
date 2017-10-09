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
      address: props.currentUser.address || {},
      phone: props.currentUser.phone || {}
    }

  }

  submitContact(e) {

    e.preventDefault();

    const currentUser = this.props.currentUser || {};
    // Set address params
    currentUser.address = this.state.address;
    // Set phone params
    currentUser.phone = this.state.phone;

    this.props.actions.updateCurrentUser({user: currentUser});

  }

  countryChanged() {

    const { value } = this.refs['country'];
    const { contact } = this.props.content.profile;
    const stateField = contact.address.formFields[4];

    if (value === 'CA') {
      stateField.tag = 'select';
      stateField.options = stateField.options;
    } else if (value === 'US') {
      stateField.tag = 'select';
      stateField.options = stateField.states;
    } else {
      stateField.tag = 'input';
    }

    this.state.address['country'] = value;

    this.setState(this.state);

  }

  onChange(field) {

    const { value } = this.refs[field.name];

    this.state.address[field.name] = value;

    this.setState(this.state);

  }

  phoneNumberChanged(field) {

    const {value} = this.refs['phone'];

    this.state.phone = {
      number: value
    }

    this.setState(this.state);

  }

  render() {

    const { contact } = this.props.content.profile;
    const { address, phone } = this.state;

    const phoneField = contact.phone.formFields[0];
    const countryField = contact.address.formFields[6];

    // On change of country
    countryField.onChange = this.countryChanged.bind(this);

    // Phone number work around
    phoneField.name = 'phone';
    phoneField.onChange = this.phoneNumberChanged.bind(this);
    phone.phone = this.state.phone.number;

    return (
      <section className="user-contact">

        <form onSubmit={ this.submitContact.bind(this) }>

          <h4>Contact Information</h4>

          <div className="row">
            { FormFieldsHelper.call(this, contact.phone.formFields, phone) }
            { FormFieldsHelper.call(this, contact.address.formFields, address) }
          </div>

          <br/>

          <input type="submit" className="btn btn-success clearfix" value={ contact.button }/>

        </form>

      </section>
    )

  }

}
