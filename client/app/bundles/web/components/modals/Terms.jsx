import React from 'react';

const Terms = ({
  terms_title,
  terms = []
}) => {

  return (
    <div>
      <h4>{ terms_title }</h4>
      <ol>
      {
        terms.map((term, index) => {
          return <li key={ `rental_terms_${ index }` }>{ term }</li>;
        })
      }
      </ol>
    </div>
  )

}

export default Terms;
