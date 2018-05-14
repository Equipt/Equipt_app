import React from 'react';

import formDecorator from 'hocs/formDecorator';
import ErrorsList from './ErrorsList';
import SelectTag from './SelectTag';

const UsersContactForm = ({ fields: { address, phone }, form, errors, isValid, currentUser }) => (
  <div className="row">
    <form { ...form }>
      <fieldset className="col-md-12">
        <label>Phone Number</label>
        <input className="form-control" { ...phone.number }/>
        <ErrorsList errors={ errors['phone.number'] }/>
      </fieldset>
      <fieldset className="col-md-1">
        <label>Unit</label>
        <input className="form-control" { ...address.unit }/>
        <br/>
      </fieldset>
      <fieldset className="col-md-2">
        <label>Street Number</label>
        <input className="form-control" { ...address.number }/>
        <ErrorsList errors={ currentUser.errors ? currentUser.errors['address.number']: errors['address.number'] }/>
      </fieldset>
      <fieldset className="col-md-9">
        <label>Street Name</label>
        <input className="form-control" { ...address.street }/>
        <ErrorsList errors={ currentUser.errors ? currentUser.errors['address.street']: errors['address.street'] }/>
      </fieldset>
      <fieldset className="col-md-6">
        <label>City</label>
        <input className="form-control" { ...address.city }/>
        <ErrorsList errors={ currentUser.errors ? currentUser.errors['address.city']: errors['address.city'] }/>
      </fieldset>
      <fieldset className="col-md-6">
        <label>State</label>
        {
          address.country.value === 'CA' || !address.country.value ?
          <SelectTag { ...address.state } className="form-control" options={ I18n.t('provinces') }/>
          : address.country.value === 'US' ?
          <SelectTag { ...address.state } className="form-control" options={ I18n.t('states') }/>
          :
          <input { ...address.state } className="form-control"/>
        }
        <ErrorsList errors={ currentUser.errors ? currentUser.errors['address.state']: errors['address.state'] }/>
      </fieldset>
      <fieldset className="col-md-6">
        <label>Zip / Postal Code</label>
        <input className="form-control" { ...address.zip }/>
        <ErrorsList errors={ currentUser.errors ? currentUser.errors['address.zip']: errors['address.zip'] }/>
      </fieldset>
      <fieldset className="col-md-6">
        <label>Country</label>
        <SelectTag { ...address.country } className="form-control" options={ I18n.t('countries') }/>
        <ErrorsList errors={ currentUser.errors ? currentUser.errors['address.country']: errors['address.country'] }/>
      </fieldset>
      <fieldset className="col-md-12">
        <input type="submit" value="Update Contact Info" className="btn btn-success clearfix"/>
      </fieldset>
    </form>
  </div>
)

export default formDecorator({
  // multiPart: true,
  fields: {
    'phone.number': {
      placeholder: '333-333-3333',
      required: true,
      defaultError: ({ currentUser }) => currentUser.errors['phone.number'],
      defaultValue: ({ currentUser: { phone = {} } = {} }) => phone.number
    },
    'address.unit': {
      placeholder: '1',
      defaultValue: ({ currentUser: { address = {} } = {} }) => address.unit
    },
    'address.number': {
      placeholder: '12345',
      required: true,
      defaultValue: ({ currentUser: { address = {} } = {} }) => address.number
    },
    'address.street': {
      placeholder: 'Equipt Street',
      required: true,
      defaultValue: ({ currentUser: { address = {} } = {} }) => address.street
    },
    'address.city': {
      placeholder: 'Vancouver',
      required: true,
      defaultValue: ({ currentUser: { address = {} } = {} }) => address.city
    },
    'address.state': {
      placeholder: 'Cornwall',
      required: true,
      defaultValue: ({ currentUser: { address = {} } = {} }) => address.state
    },
    'address.zip': {
      placeholder: '10002',
      required: true,
      defaultValue: ({ currentUser: { address = {} } = {} }) => address.zip
    },
    'address.country': {
      placeholder: 'Canada',
      required: true,
      defaultValue: ({ currentUser: { address = {} } = {} }) => address.country || 'CA'
    }
  }
})(UsersContactForm);
