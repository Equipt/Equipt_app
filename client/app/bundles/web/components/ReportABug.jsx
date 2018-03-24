import React from 'react';
import ReportABugForm from './forms/ReportABugForm';

const ReportABug = ({ actions }) => {

  return (
    <section className="container">
      <h3>{ I18n.t('utils.report_a_bug') }</h3>
      <ReportABugForm onSubmit={ data => actions.reportBug(data) }/>
      <p>{ I18n.t('utils.report_a_bug_desc') }</p>
    </section>
  )
}

export default ReportABug;
