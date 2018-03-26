import React from 'react';

import formDecorator from 'hocs/formDecorator';
import ErrorsList from './ErrorsList';
import SelectTag from './SelectTag';

const UsersContactForm = ({ fields: { address, phone }, form, errors, isValid, user }) => (
  <div className="row">
    <form { ...form }>
      <fieldset className="col-xs-12">
        <label>Phone Number</label>
        <input className="form-control" { ...phone.number }/>
        <ErrorsList errors={ user.errors ? user.errors['phone.number'] : errors['phone.number'] }/>
      </fieldset>
      <fieldset className="col-xs-1">
        <label>Unit</label>
        <input className="form-control" { ...address.unit }/>
      </fieldset>
      <fieldset className="col-xs-2">
        <label>Street Number</label>
        <input className="form-control" { ...address.number }/>
        <ErrorsList errors={ user.errors ? user.errors['address.number']: errors['address.number'] }/>
      </fieldset>
      <fieldset className="col-xs-9">
        <label>Street Name</label>
        <input className="form-control" { ...address.street }/>
        <ErrorsList errors={ user.errors ? user.errors['address.street']: errors['address.street'] }/>
      </fieldset>
      <fieldset className="col-xs-6">
        <label>City</label>
        <input className="form-control" { ...address.city }/>
        <ErrorsList errors={ user.errors ? user.errors['address.city']: errors['address.city'] }/>
      </fieldset>
      <fieldset className="col-xs-6">
        <label>State</label>
        {
          address.country.value === 'CA' ?
          <SelectTag { ...address.state } className="form-control" options={ I18n.t('provinces') }/>
          : address.country.value === 'US' ?
          <SelectTag { ...address.state } className="form-control" options={ I18n.t('states') }/>
          :
          <input { ...address.state } className="form-control"/>
        }
        <ErrorsList errors={ user.errors ? user.errors['address.state']: errors['address.state'] }/>
      </fieldset>
      <fieldset className="col-xs-6">
        <label>Zip / Postal Code</label>
        <input className="form-control" { ...address.zip }/>
        <ErrorsList errors={ user.errors ? user.errors['address.zip']: errors['address.zip'] }/>
      </fieldset>
      <fieldset className="col-xs-6">
        <label>Country</label>
        <SelectTag { ...address.country } className="form-control" options={ I18n.t('countries') }/>
        <ErrorsList errors={ user.errors ? user.errors['address.country']: errors['address.country'] }/>
      </fieldset>
      <fieldset className="col-xs-12">
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
      value: ({ user }) => user.phone ? user.phone.number : ''
    },
    'address.unit': {
      placeholder: '1',
      value: ({ user }) => user.address ? user.address.unit : ''
    },
    'address.number': {
      placeholder: '12345',
      required: true,
      value: ({ user }) => user.address ? user.address.number : ''
    },
    'address.street': {
      placeholder: 'Equipt Street',
      required: true,
      value: ({ user }) => user.address ? user.address.street : ''
    },
    'address.city': {
      placeholder: 'Vancouver',
      required: true,
      value: ({ user }) => user.address ? user.address.city : ''
    },
    'address.state': {
      placeholder: 'Cornwall',
      required: true,
      value: ({ user }) => user.address ? user.address.state: ''
    },
    'address.zip': {
      placeholder: '10002',
      required: true,
      value: ({ user }) => user.address ? user.address.zip : ''
    },
    'address.country': {
      placeholder: 'Canada',
      required: true,
      value: ({ user }) => user.address ? user.address.country : 'CA'
    }
  }
})(UsersContactForm);
