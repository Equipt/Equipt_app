import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import ReactCodeInput from 'react-code-input';

import FormFieldsHelper from 'helpers/FormFields';

import UserContactForm from './forms/UserContactForm';

export default class UserContact extends React.Component {

  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    content: PropTypes.object.isRequired,
    completedContactForm: PropTypes.func
  }

  constructor(props) {
    super(props);

    this.state = {
      isVerifingPhoneNumber: false
    }

    this.submitContact = this.submitContact.bind(this);
  }

  submitContact({ phone, address }) {

    const { actions, currentUser} = this.props;

    const user = Object.assign({}, currentUser, { phone }, { address });

    return actions.updateCurrentUser({ user }, currentUser => {

      const { phone, address, errors = {} } = currentUser;

      // Problem with verifying address
      if (errors['address.invalid']) {
        actions.showErrorAlert({ error: errors['address.invalid'] });
        return false;
      }

      if (phone && phone.verifying) {
        this.setState({
          isVerifingPhoneNumber: true
        });
      }

    });

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

      actions.verifyPhonePin(pin, user => {

        this.setState({
          phone: user.phone,
          isVerifingPhoneNumber: false
        });

        // Finished updating user
        if (user.isVerified) {
          actions.closeModal();
        }

      });
    }

  }

  renderVerifyingPhoneForm() {

    const { actions } = this.props;

    return (
      <form className="phone-pin-verification">

        <h4>{ I18n.t('user.need_pin') }</h4>

        <ReactCodeInput type='text' fields={ 4 } onChange={ this.updatePin.bind(this) }/>

        <span onClick={ actions.resendPin }>{ this.props.content.profile.contact.resend_pin }</span>

      </form>
    )

  }

  renderContactForm() {

    const { currentUser } = this.props;

    return <UserContactForm currentUser={ currentUser } onSubmit={ this.submitContact }/>;

  }

  render() {

    const { isVerifingPhoneNumber } = this.state;
    const { currentUser: { phone = {} } } = this.props;

    return (
      <section className="user-contact">
        { isVerifingPhoneNumber ? this.renderVerifyingPhoneForm() : this.renderContactForm() }
      </section>
    )

  }

}
