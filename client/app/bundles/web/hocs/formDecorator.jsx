import React, { Component } from 'react';
import PropTypes from 'prop-types';

const formDecorator = formComponent => {

  return class extends Component {

    constructor(props) {
      super(props);
      this.state = {
        form: {}
      }
      this.onChange = this.onChange.bind(this);
      this.buildForm = this.buildForm.bind(this);
    }

    onChange(name, value) {
      this.state[name] = value;
      this.setState(this.state);
    }

    render() {
      return React.cloneElement(<formComponent { ...this.props }/>, {
        buildForm: this.buildForm
      });
    }

    buildInput() {
      return <input type={ field.type }
                    placeholder={ field.placeholder }
                    class={ field.className }
                    onChange={ e => this.onChange(field.name, e.target.value) }/>;
    }

    buildSelect() {
      const { options = [] } = field;
      return (
        <select default={ field.default } class={ field.className }>
        {
          field.options.map(option => {
            return <option>{ option.text }</option>;
          })
        }
        </select>
      )
    }

    buildTextArea() {
      return <textarea class={ field.className } placeholder={ field.placeholder }></textarea>;
    }

    buildForm() {
      return (
        <form onSubmit={ this.submit }>
        {
          this.props.fields.map(field => {
            switch(field.tag) {
              case 'input':
                return this.buildInput();
              break;
              case 'select':
                return this.buildSelect();
              break;
              case 'text-area':
                return this.buildTextArea();
              break;
            }
          })
        }
        </form>
      );
    }

  }

}

export default formDecorator;
