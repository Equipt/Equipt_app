import React from 'react';

import formDecorator from 'hocs/formDecorator';
import ErrorsList from './ErrorsList';
import SelectTag from './SelectTag';

const UsersContactForm = ({ fields, errors, form, isValid }) => (
  <div className="row">
    <form { ...form }>
      <fieldset className="col-xs-12">
        <label>Phone Number</label>
        <input className="form-control" { ...fields.phone }/>
        <ErrorsList errors={ errors.phone }/>
      </fieldset>
      <fieldset className="col-xs-1">
        <label>Unit</label>
        <input className="form-control" { ...fields.unit }/>
      </fieldset>
      <fieldset className="col-xs-2">
        <label>Street Number</label>
        <input className="form-control" { ...fields.number }/>
        <ErrorsList errors={ errors.number }/>
      </fieldset>
      <fieldset className="col-xs-9">
        <label>Street Name</label>
        <input className="form-control" { ...fields.street }/>
        <ErrorsList errors={ errors.street }/>
      </fieldset>
      <fieldset className="col-xs-6">
        <label>City</label>
        <input className="form-control" { ...fields.city }/>
        <ErrorsList errors={ errors.city }/>
      </fieldset>
      <fieldset className="col-xs-6">
        <label>State</label>
        {
          fields.country.value === 'CA' ?
          <SelectTag { ...fields.state } className="form-control" options={ I18n.t('provinces') }/>
          : fields.country.value === 'US' ?
          <SelectTag { ...fields.state } className="form-control" options={ I18n.t('states') }/>
          :
          <input { ...fields.state } className="form-control"/>
        }
        <ErrorsList errors={ errors.state }/>
      </fieldset>
      <fieldset className="col-xs-6">
        <label>Zip / Postal Code</label>
        <input className="form-control" { ...fields.zip }/>
        <ErrorsList errors={ errors.zip }/>
      </fieldset>
      <fieldset className="col-xs-6">
        <label>Country</label>
        <SelectTag { ...fields.country } className="form-control" options={ I18n.t('countries') }/>
        <ErrorsList errors={ errors.country }/>
      </fieldset>
      <fieldset className="col-xs-12">
        <input type="submit" value="Update Contact Info" className="btn btn-success clearfix"/>
      </fieldset>
    </form>
  </div>
)

export default formDecorator({
  fields: {
    phone: {
      placeholder: '333-333-3333',
      required: true
    },
    unit: {
      placeholder: '1'
    },
    number: {
      placeholder: '12345',
      required: true
    },
    street: {
      placeholder: 'Equipt Street',
      required: true
    },
    city: {
      placeholder: 'Vancouver',
      required: true
    },
    state: {
      placeholder: 'BC',
      required: true
    },
    zip: {
      placeholder: '10002',
      required: true
    },
    country: {
      placeholder: 'Canada',
      required: true,
      defaultValue: 'CA'
    }
  }
})(UsersContactForm);
