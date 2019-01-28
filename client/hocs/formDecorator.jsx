import React, { Component } from 'react';
import PropTypes from 'prop-types';

const formDecorator = ({ fields, multiPart = false }) => {

  // Render WrapperFormComponent
  return WrapperFormComponent => {

    return class extends Component {

      constructor(props) {
        super(props);
        this.state = {
          errors: [],
          fieldsObj: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.buildFieldsObj = this.buildFieldsObj.bind(this);
      }

      componentWillMount() {
        this.setState({
          fieldsObj: this.buildFieldsObj(this.props)
        });
      }

      componentWillReceiveProps(newProps) {
        this.setState({
          fieldsObj: this.buildFieldsObj(newProps)
        });
      }

      onChange(name, value) {
        const { fieldsObj } = this.state;
        this.get(name)['value'] = value;
        this.setState({ fieldsObj });
      }

      onBlur(name, value) {
        this.validateField(name, value);
      }

      onFocus(name, value) {
        const { errors } = this.state;
        delete errors[name];
        this.setState(errors);
      }

      submitForm(e) {
        e.preventDefault();
        const { onSubmit } = this.props;
        const formData = multiPart ? this.buildMultiPart() : this.buildJsonData();
        if (onSubmit) onSubmit(formData);
        return formData
      }

      // This allows to split a form references keys (data.one data.two)
      get(key) {
        const { fieldsObj } = this.state;
        return key.split('.').reduce((fieldsObj, i) => {
          return fieldsObj[i] = fieldsObj[i] || {};
        }, fieldsObj);
      }

      // Build as multi-part
      buildMultiPart() {
        const formData = new FormData();
        for (let key in fields) {
          formData.append(key, this.get(key)['value'] || '');
        }
        return formData;
      }

      // Build Json data
      buildJsonData() {

        const formData = {};

        for (let key in fields) {
          const { name, value } = this.get(key);
          const nestedKeys = name.split('.');
          nestedKeys.reduce((data, i) => {
            if (nestedKeys[nestedKeys.length-1] === i) {
              return data[i] = value || '';
            } else {
              return data[i] = data[i] || {};
            }
          }, formData);
        }

        return formData;
      }

      validateField(name, value) {
        const { errors } = this.state;

        // Is Required?
        if (fields[name].required && !value.length) {
          errors[name] = errors[name] || [];
          errors[name].push('This field is required');
        }

        // Custom Validation?
        if (fields[name].validations && errors[name]) {
          fields[name].validations.map(validate => {
            if (!validate.testInput(value)) errors[name].push(validate.message);
          });
        }

        this.setState({
          errors: errors
        });

      }

      render() {

        const { errors, fieldsObj } = this.state;

        return <WrapperFormComponent { ...this.props }
                                     fields={ fieldsObj }
                                     errors={ errors }
                                     getFormData={ this.getFormData }
                                     form={{ onSubmit: this.submitForm }}
                                     submitForm={ this.submitForm }
                                     isValid={ Object.keys(errors).length === 0 && errors.constructor === Object }/>;

      }

      buildFieldsObj(parentsProps) {

        const { errors = {}, fieldsObj } = this.state;

        // Change Fields
        for (let key in fields) {
          const fieldSettings = fields[key] || {};
          const fieldObj = this.get(key) || {};

          // Set name attribute
          fieldObj['name'] = key;
          // Add onChange attribute
          fieldObj['onChange'] = e => this.onChange(key, e.target.value);
          // Set Placeholder
          fieldObj['placeholder'] = fieldSettings['placeholder'] || '';
					// Set type values
					fieldObj['type'] = fieldSettings['type'] || 'text';
          // Set default values
          if (typeof fieldSettings['defaultValue'] === 'function') {
            fieldObj['value'] = fieldSettings['defaultValue'](parentsProps) || '';
          }
          // Set default errors
          if (typeof fieldSettings['defaultError'] === 'function')  {
            errors[key] = fieldSettings['defaultError'](parentsProps);
          }
          // Set on onBlur and onFocus Attribute
          if (errors[key] || fieldSettings['valiations'] || fieldSettings['required']) {
            fieldObj['onBlur'] = e => this.onBlur(key, e.target.value);
            fieldObj['onFocus'] = e => this.onFocus(key, e.target.value);
          }

        }

        return fieldsObj;
      }

    }
  }
}

export default formDecorator;
