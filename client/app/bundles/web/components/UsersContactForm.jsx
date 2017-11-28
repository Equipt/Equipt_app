import PropTypes from 'prop-types';
import React from 'react';
import ReactCodeInput from 'react-code-input';

import FormFieldsHelper from 'helpers/FormFields';

export class UsersContactForm extends React.Component {

  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    content: PropTypes.object.isRequired,
    completedContactForm: PropTypes.func
  }

  constructor(props) {
    super(props);

    this.state = {
      address: props.currentUser.address || {},
      phone: props.currentUser.phone || {},
      isVerifingPhoneNumber: false
    }

  }

  componentDidMount() {
    // Set default country and state
    this.countryChanged();
  }

  submitContact(e) {

    e.preventDefault();

    const { actions, currentUser } = this.props;
    const { address, phone } = this.state;

    // Set address params
    currentUser.address = address;
    // Set phone params
    currentUser.phone = phone;

    // Update user
    return actions.updateCurrentUser({user: currentUser}, currentUser => {

        const { phone, address } = currentUser;

        this.setState({
          address: address || {},
          phone: phone || {}
        });

        // Needs to verifying phone number pin
        if (phone && phone.verifying) {
          this.setState({
            isVerifingPhoneNumber: true
          });
        }

        // Show unfound address alert
        if (currentUser.errors && currentUser.errors['address.address']) {
          actions.showErrorAlert({error: currentUser.errors['address.address']});
        }

    });

  }

  countryChanged() {

    const { value } = this.refs['country'];

    const { contact } = this.props.content.profile;
    const stateField = contact.address.formFields[4];

    if (value === 'CA') {
      stateField.tag = 'select';
      this.state.address.state = Object.keys(stateField.options)[0];
      stateField.options = stateField.options;
    } else if (value === 'US') {
      this.state.address.state = Object.keys(stateField.states)[0];
      stateField.options = stateField.states;
      stateField.tag = 'select';
    } else {
      this.state.address.state = '';
      stateField.tag = 'input';
    }

    this.state.address.country = value;
    this.setState(this.state);

  }

  onChange(field) {

    const { value } = this.refs[field.name];

    this.state.address[field.name] = value;

    this.setState(this.state);

  }

  phoneNumberChanged(field) {

    const { value } = this.refs['phone'];

    this.state.phone = {
      number: value
    }

    this.setState(this.state);

  }

  updatePin(pin) {

    const { actions } = this.props;

    if (pin.length === 4) {
      actions.verifyPhonePin(pin, phone => {

        const { address } = this.state;
        const { completedContactForm } = this.props;

        this.setState({
          phone: phone,
          isVerifingPhoneNumber: false
        })

        // Finished updating user
        if ((phone && phone.verified) && (address && address.verified)) {
          return completedContactForm && completedContactForm();
        }

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

    const { address, phone } = this.state;
    const { currentUser } = this.props;

    const { contact } = this.props.content.profile;

    const phoneField = contact.phone.formFields[0];
    const countryField = contact.address.formFields[6];

    // On change of country
    countryField.onChange = this.countryChanged.bind(this);

    // HACK: Phone number work around
    phoneField.name = 'phone';
    phoneField.onChange = this.phoneNumberChanged.bind(this);
    phone.phone = phone.number;

    address.errors = currentUser.errors;
    phone.errors = currentUser.errors;

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
