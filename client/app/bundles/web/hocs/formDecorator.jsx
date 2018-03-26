import React, { Component } from 'react';
import PropTypes from 'prop-types';

const formDecorator = ({ fields, multiPart = false }) => {

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
        const { fieldsObj } = this.state;
        const { onSubmit } = this.props;
        onSubmit(multiPart ? this.buildMultiPart() : this.buildJsonData());
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
        const { fieldsObj } = this.state;
        const data = Object.assign({}, fieldsObj);
        for (let key in fields) {
          key.split('.').reduce((data, i) => {
            if (typeof data[i]['value'] === 'string') {
              return data[i] = data[i]['value'];
            } else {
              return data[i] = data[i] || {};
            }
          }, data);
        }
        return data;
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
                                     form={{ onSubmit: this.submitForm }}
                                     isValid={ Object.keys(errors).length === 0 && errors.constructor === Object }/>;

      }

      buildFieldObj() {

        const { errors = {}, fieldsObj } = this.state;
        // Change Fields
        for (let key in fields) {

          const fieldSettings = fields[key] || {};
          const fieldObj = this.get(key);

          // Set name attribute
          fieldObj['name'] = key;
          // Add onChange attribute
          fieldObj['onChange'] = e => this.onChange(key, e.target.value);
          // Set Placeholder
          fieldObj['placeholder'] = fieldSettings['placeholder'] || '';
          // Add Default Value
          this.setDefaultValues(fieldObj, fieldSettings);
          // Set on onBlur and onFocus Attribute
          if (errors[key] || fieldSettings['valiations'] || fieldSettings['required']) {
            fieldObj['onBlur'] = e => this.onBlur(key, e.target.value);
            fieldObj['onFocus'] = e => this.onFocus(key, e.target.value);
          }

        }

        return fieldsObj;
      }

      // Make sure value and default value cannot be set together
      setDefaultValues(fieldObj, fieldSettings) {

        if (fieldSettings['value'] && fieldSettings['defaultValue']) {
          return console.warn('FORM-DECORATOR: setting both a value and defaultValue is not allowed, please remove one!');
        }

        if (typeof fieldSettings['value'] === 'function') {
          return fieldObj['value'] = fieldSettings['value'](this.props);
        } else {
          return fieldObj['value'] = fieldSettings['value'] || '';
        }

        if (typeof fieldSettings['defaultValue'] === 'function') {
          return fieldObj['defaultValue'] = fieldSettings['defaultValue'](this.props);
        } else {
          return fieldObj['defaultValue'] = fieldSettings['defaultValue'] || '';
        }

      }

    }
  }
}

export default formDecorator;
