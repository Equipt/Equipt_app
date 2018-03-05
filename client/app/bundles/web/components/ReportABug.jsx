import React from 'react';
import ReportABugForm from './forms/ReportABugForm';

const ReportABug = ({ actions }) => {

  return (
    <section className="container">
      <h3>Found A Bug?</h3>
      <ReportABugForm onSubmit={ data => actions.reportBug(data) } />
      <p>Thankyou for helping us make equipt awesome</p>
    </section>
  )
}

export default ReportABug;
