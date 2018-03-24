import React from 'react';
import formDecorator from 'hocs/formDecorator';
import ErrorsList from './ErrorsList';

const getClassName = (errors = []) => {
  return `form-control ${ errors.length ? 'error' : '' }`;
}

// Build Form
const ReportABugForm = ({ fields: { title, desc }, errors, form, isValid }) => (
  <form { ...form }>
    <fieldset>
      <input { ...title } className={ getClassName(errors.title) }/>
      <ErrorsList errors={ errors.title }/>
    </fieldset>
    <fieldset>
      <textarea { ...desc } className={ getClassName(errors.desc) }/>
      <ErrorsList errors={ errors.desc }/>
    </fieldset>
    <input type="submit" value="Report" disabled={ !isValid } className="btn btn-success pull-right"/>
  </form>
);

// Decorate Form
export default formDecorator({
  fields: {
    title: {
      placeholder: 'Enter a short title',
      required: true
    },
    desc: {
      placeholder: 'Enter a description of the issue',
      required: true,
      validations: [
        {
          testInput: input => input.length > 10,
          message: 'Description must be at least 10 characters long'
        }
      ]
    }
  }
})(ReportABugForm);
