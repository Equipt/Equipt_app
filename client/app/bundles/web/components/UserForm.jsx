import React from 'react';
import PropTypes from 'prop-types';

import FormFieldsHelper from 'helpers/FormFields';

export class UserForm extends React.Component {

  static propTypes = {
    formContent: PropTypes.object.isRequired,
    submit: PropTypes.func.isRequired,
    user: PropTypes.object
  }

  submit(e) {

    e.preventDefault();

    const { actions } = this.props;

    let formData = {
      firstname: this.refs.firstname.value,
      lastname: this.refs.lastname.value,
      email: this.refs.email.value,
      password: this.refs.password.value,
      password_confirmation: this.refs.password_confirmation.value
    }

    this.props.submit(formData);

  }

  render() {

    const content = this.props.formContent;
    const title =  content.title || '';
    const formFields  = content.formFields || {};
    const user = this.props.user || {};
    const errors = user.errors || [];

    return (
      <form onSubmit={ this.submit.bind(this) }>

        <title>{ title }</title>

        { FormFieldsHelper.call(this, formFields, errors, user) }

        <br/>

        <input type="submit" className="btn btn-success clearfix" value="Signup"/>

      </form>
    )
  }

}
