import React,  { Component } from 'react';
import PropTypes from 'prop-types';
import formDecorator from 'hocs/formDecorator';
import ErrorsList from './ErrorsList';

const UserBasic = ({ fields: { firstname, lastname, email }, form, errors, children }) => (
  <form { ...form }>
    <div className="col-xs-12">
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
        <input type="submit" value="Update Basic Info" className="btn btn-success clearfix"/>
      </fieldset>
    </div>
  </form>
);

export default formDecorator({
  fields: {
    'firstname': {
      placeholder: 'John',
      required: true,
      defaultError: ({ currentUser }) => currentUser.errors['phone.number'],
      defaultValue: ({ currentUser: { firstname } = {} }) => firstname
    },
    'lastname': {
      placeholder: 'Smith',
      required: true,
      defaultError: ({ currentUser }) => currentUser.errors['firstname'],
      defaultValue: ({ currentUser: { lastname } = {} }) => lastname
    },
    'email': {
      placeholder: 'john@example.com',
      required: true,
      defaultError: ({ currentUser }) => currentUser.errors['email'],
      defaultValue: ({ currentUser: { email } = {} }) => email
    }
  }
})(UserBasic);
