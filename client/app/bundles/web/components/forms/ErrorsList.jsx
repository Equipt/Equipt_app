import React from 'react';

const ErrorsList = ({ errors = [] }) => {
  return (<ul className="errors">
    {
      errors ?
      errors.map((error, index) => <li key={ `error_${ index }` } className="error">{ error}</li>) :
      null
    }
    <style jsx>{`
      .errors {
        margin: 0;
        min-height: 25px;
      }
      .errors li {
        color: #dc3545;
      }
    `}</style>
  </ul>)
};

export default ErrorsList;
