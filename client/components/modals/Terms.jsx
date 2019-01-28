import React from 'react';
import PropTypes from 'prop-types';

const Terms = ({
  title,
  terms
}) => {

  return (
    <div>
      <h4>{ title }</h4>
      <ol  dangerouslySetInnerHTML={{ __html: I18n.t('terms') }}></ol>
    </div>
  )

}

Terms.propTypes = {
  terms: PropTypes.string.isRequired
}

export default Terms;
