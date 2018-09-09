import React, { Component } from 'react';
import PropTypes from 'prop-types';
import formDecorator from 'hocs/formDecorator';
import ErrorsList from './ErrorsList';

const SignupForm = ({ fields: { firstname, lastname, email, password, passwordConfirmation }, form, errors, children }) => (
  <div className="row">
    <form { ...form }>
      <fieldset className="col-xs-12">
        <label>{ I18n.t('user.form.firstname') }</label>
        <input className="form-control" { ...firstname }/>
        <ErrorsList errors={ errors['firstname'] }/>
      </fieldset>
      <fieldset className="col-xs-12">
        <label>{ I18n.t('user.form.lastname') }</label>
        <input className="form-control" { ...lastname }/>
        <ErrorsList errors={ errors['lastname'] }/>
      </fieldset>
      <fieldset className="col-xs-12">
        <label>{ I18n.t('user.form.email') }</label>
        <input className="form-control" { ...email }/>
        <ErrorsList errors={ errors['email'] }/>
      </fieldset>
      <fieldset className="col-xs-12">
        <label>{ I18n.t('user.form.password') }</label>
        <input type="password" className="form-control" { ...password }/>
        <ErrorsList errors={ errors['password'] }/>
      </fieldset>
      <fieldset className="col-xs-12">
        <label>{ I18n.t('user.form.password_confirmation') }</label>
        <input type="password" className="form-control" { ...passwordConfirmation }/>
        <ErrorsList errors={ errors['passwordConfirmation'] }/>
      </fieldset>
      <fieldset className="col-xs-12">
        { children }
      </fieldset>
      <fieldset className="col-xs-12">
        <input type="submit" value="Signup" className="btn btn-success clearfix"/>
      </fieldset>
    </form>
  </div>
);

export default formDecorator({
  fields: {
    'firstname': {
      placeholder: 'John',
      required: true,
      defaultError: ({ user: { errors = {} } = {} }) => errors['firstname']
    },
    'lastname': {
      placeholder: 'Smith',
      required: true,
      defaultError: ({ user: { errors = {} } = {} }) => errors['lastname']
    },
    'email': {
      placeholder: 'john@example.com',
      required: true,
      defaultError: ({ user: { errors = {} } = {} }) => errors['email']
    },
    'password': {
      required: true,
			placeholder: 'xxxxxx',
			type: 'password',
      defaultError: ({ user: { errors = {} } = {} }) => errors['password']
    },
    'passwordConfirmation': {
      required: true,
			placeholder: 'xxxxxx',
			type: 'password',
      defaultError: ({ user: { errors = {} } = {} }) => errors['password_confirmation']
    }
  }
})(SignupForm);
