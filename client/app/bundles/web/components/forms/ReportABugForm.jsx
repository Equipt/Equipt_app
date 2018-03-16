import React from 'react';
import formDecorator from 'hocs/formDecorator';
import ErrorsList from './ErrorsList';

// Build Form
const ReportABugForm = ({ fields: { title, desc }, form }) => (
  <form { ...form }>
    <form-group className="form-group">
      <input { ...title }/>
      <ErrorsList errors={ title.errors }/>
    </form-group>
    <br/>
    <form-group className="form-group" >
      <textarea { ...desc }/>
      <ErrorsList errors={ desc.errors }/>
    </form-group>
    <br/>
    <input type="submit" value="Report" className="btn btn-success pull-right"/>
  </form>
);

// Decorate Form
export default formDecorator({
  fields: {
    title: {
      className: 'form-control',
      placeholder: 'Enter a short title',
      required: true
    },
    desc: {
      className: 'form-control',
      placeholder: 'Enter a description of the issue',
      required: true
    }
  }
})(ReportABugForm);
