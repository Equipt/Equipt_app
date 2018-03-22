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
          errors: {},
          fieldsObj: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.buildFieldObj = this.buildFieldObj.bind(this);
      }

      componentWillMount() {
        this.setState({
          fieldsObj: this.buildFieldObj()
        });
      }

      onChange(name, value) {
        const { fieldsObj } = this.state;
        fieldsObj[name]['value'] = value;
        this.setState({ fieldsObj });
      }

      onBlur(name, value) {

        const { errors, fieldsObj } = this.state;

        if (fields[name].required && !value.length) {
          errors[name] = errors[name] || [];
          errors[name].push('This field is required');
        }

        if (fields[name].validations) {
          fields[name].validations.map(validate => {
            if (!validate.testInput(value)) errors[name].push(validate.message);
          });
        }

        this.setState({
          errors: errors
        });

      }

      onFocus(name, value) {

        const { errors } = this.state;
        delete errors[name];

        this.setState(errors);

      }

      submitForm(e) {
        e.preventDefault();
        const { fieldsObj } = this.state;
        const { onSubmit } = this.props;

        const data = {};

        for (let key in fieldsObj) {
          data[key] = fieldsObj[key]['value'];
        }

        const isValid = this.validateFields();
        onSubmit(data, isValid);
      }

      validateFields() {

      }

      render() {

        const { errors, fieldsObj } = this.state;

        return <WrapperFormComponent fields={ fieldsObj }
                                     errors={ errors }
                                     form={{ onSubmit: this.submitForm }}
                                     isValid={ Object.keys(errors).length === 0 && errors.constructor === Object }/>;

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
          // Set Placeholder
          fieldsObj[key]['placeholder'] = fieldSettings['placeholder'] || '';
          // Set on onBlur and onFocus Attribute
          if (errors[key] || fieldSettings['valiations'] || fieldSettings['required']) {
            fieldsObj[key]['onBlur'] = e => this.onBlur(key, e.target.value);
            fieldsObj[key]['onFocus'] = e => this.onFocus(key, e.target.value);
          }

        }
        return fieldsObj;
      }

    }
  }
}

export default formDecorator;
