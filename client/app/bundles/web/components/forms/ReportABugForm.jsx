import React from 'react';
import formDecorator from 'hocs/formDecorator';
import ErrorsList from './ErrorsList';

// Build Form
const ReportABugForm = ({ fields: { title, desc }, form }) => (
  <form { ...form }>
    <form-group className="form-group">
      <input { ...title }/>
    </form-group>
    <form-group className="form-group">
      <textarea { ...desc }/>
    </form-group>
    <input type="submit" value="Report" className="btn btn-success pull-right"/>
    <style jsx>{`
      .form-group {
        margin-top: 10px;
      }
    `}</style>
  </form>
);

// Decorate Form
export default formDecorator({
  fields: {
    title: {
      className: 'form-control',
      placeholder: 'Enter a short title'
    },
    desc: {
      className: 'form-control',
      placeholder: 'Enter a description of the issue'
    }
  }
})(ReportABugForm);
