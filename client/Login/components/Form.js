import React from 'react';
import formDecorator from 'hocs/formDecorator';
import ErrorsList from 'components/forms/ErrorsList';

// Build Form
const LoginForm = ({ fields: { email, password }, errors, form, isValid }) => (
  <form { ...form }>
    <fieldset>
      <input className="form-control" { ...email }/>
      <ErrorsList errors={ errors.email }/>
    </fieldset>
    <fieldset>
      <input type="password" className="form-control" { ...password }/>
      <ErrorsList errors={ errors.password }/>
    </fieldset>
    <input type="submit" value="Login" className="btn btn-success"/>
  </form>
);

// Decorate Form
export default formDecorator({
  fields: {
    email: {
      placeholder: 'Please enter your email',
      required: true
    },
    password: {
      password: 'Please enter your password',
      required: true
    }
  }
})(LoginForm);
