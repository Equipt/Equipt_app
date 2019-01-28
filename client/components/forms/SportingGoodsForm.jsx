import React,  { Component } from 'react';
import formDecorator from 'hocs/formDecorator';

const SportingGoodsForm = ({ fields: { title, desc }, errors, form, isValid }) => (
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
    category: {
      placeholder: 'Enter a short Title',
      required: true
    },
    shortDescription: {
      placeholder: 'Enter a short Description',
      required: true,
      validations: [
        {
          testInput: input => input.length > 10,
          message: 'Description must be at least 10 characters long'
        }
      ]
    }
  }
})(SportingGoodsForm);
