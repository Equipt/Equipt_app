import PropTypes from 'prop-types';
import React from 'react';
import ReactCodeInput from 'react-code-input';

import FormFieldsHelper from 'helpers/FormFields';

export class UsersContactForm extends React.Component {

  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    mapZenKey: PropTypes.string.isRequired,
    content: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      address: props.currentUser.address || {},
      phone: props.currentUser.phone || {},
      isVerifingPhoneNumber: false
    }

  }

  submitContact(e) {

    e.preventDefault();

    const currentUser = this.props.currentUser || {};

    // Set address params
    currentUser.address = this.state.address;
    // Set phone params
    currentUser.phone = this.state.phone;

    // Update user
    return this.props.actions.updateCurrentUser({user: currentUser}, currentUser => {

        // Needs to verifying phone number pin
        if (currentUser.phone && currentUser.phone.verifying) {
          this.setState({
            address: currentUser.address || {},
            phone: currentUser.phone || {},
            isVerifingPhoneNumber: true
          });
        }

    });

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

  updatePin(pin) {

    const { actions } = this.props;

    if (pin.length === 4) {
      actions.verifyPhonePin(pin, phone => {
        this.setState({
          phone: phone,
          isVerifingPhoneNumber: false
        })
      });
    }

  }

  renderVerifyingPhoneForm() {

    const { actions } = this.props;

    return (
      <form>

        <h4>{ this.props.content.profile.contact.need_pin }</h4>

        <ReactCodeInput type='text' fields={ 4 } onChange={ this.updatePin.bind(this) }/>

        <span onClick={ actions.resendPin }>{ this.props.content.profile.contact.resend_pin }</span>

      </form>
    )

  }

  renderContactForm() {

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
      <form onSubmit={ this.submitContact.bind(this) }>

        <h5>{ this.props.title || '' }</h5>

        <div className="row">
          { FormFieldsHelper.call(this, contact.phone.formFields, phone) }
          { FormFieldsHelper.call(this, contact.address.formFields, address) }
        </div>

        <br/>

        <input type="submit" className="btn btn-success clearfix" value={ contact.button }/>

      </form>
    )
  }

  render() {

    const { phone } = this.state;

    return (
      <section className="user-contact">
        { phone.verifying ? this.renderVerifyingPhoneForm() : this.renderContactForm() }
      </section>
    )

  }

}
