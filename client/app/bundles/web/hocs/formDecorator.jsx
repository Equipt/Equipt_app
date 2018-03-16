import React, { Component } from 'react';
import PropTypes from 'prop-types';

const formDecorator = ({ fields }) => {

  const valiationObj = {};

  // Render WrapperFormComponent
  return WrapperFormComponent => {

    return class extends Component {

      constructor(props) {
        super(props);
        this.state = {
          formData: [],
          errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.buildFieldObj = this.buildFieldObj.bind(this);
      }

      onChange(name, value) {
        this.state[name] = value;
        this.setState(this.state);
      }

      onBlur(name, value) {

        const { errors } = this.state;
        errors[name] = errors[name] || [];

        if (fields[name].required && !value.length) {
          errors[name].push('This field is required');
        }

        if (fields[name].valiations) {

        }

        this.setState({
          errors: errors
        });

      }

      onFocus(name, value) {

      }

      validateFields() {
        return true;
      }

      submitForm(e) {
        e.preventDefault();
        const { onSubmit } = this.props;
        const isValid = this.validateFields();
        onSubmit(this.state, isValid);
      }

      render() {

        const fieldsObj = this.buildFieldObj();

        console.log(fieldsObj);

        return <WrapperFormComponent fields={ fieldsObj } form={{
          onSubmit: this.submitForm
        }}/>;

      }

      buildFieldObj() {
        const fieldsObj = {};

        const { errors = {} } = this.state;
        // Change Fields
        for (let key in fields) {
          const fieldSettings = fields[key] || {};
          fieldsObj[key] = fieldsObj[key] || {};
          // Set name attribute
          fieldsObj[key]['name'] = key;
          // Add onChange attribute
          fieldsObj[key]['onChange'] = e => this.onChange(key, e.target.value);
          // Set className Attribute
          fieldsObj[key]['className'] = fieldSettings['className'] || '';
          // Set Placeholder
          fieldsObj[key]['placeholder'] = fieldSettings['placeholder'] || '';
          // Set on onBlur and onFocus Attribute
          if (errors[key] || fieldSettings['valiations'] || fieldSettings['required']) {
            fieldsObj[key]['onBlur'] = e => this.onBlur(key, e.target.value);
            fieldsObj[key]['onFocus'] = e => this.onFocus(key, e.target.value);
          }

          fieldsObj[key].errors = errors[key] || [];

        }
        return fieldsObj;
      }

    }
  }
}

export default formDecorator;
