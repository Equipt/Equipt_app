import React from 'react';

const Terms = ({
  terms_title,
  terms = []
}) => {

  return (
    <div>
      <h4>{ terms_title }</h4>
      <ol  dangerouslySetInnerHTML={{
        __html: I18n.t('rentals.terms')
      }}>
      </ol>
    </div>
  )

}

export default Terms;
