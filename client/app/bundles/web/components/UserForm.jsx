import React from 'react';
import PropTypes from 'prop-types';

export class UserForm extends React.Component {

  static propTypes = {
    formContent: PropTypes.object.isRequired,
    submit: PropTypes.func.isRequired,
    user: PropTypes.object
  }

  submit(e) {

    e.preventDefault();

    const { actions } = this.props;

    let formData = {
      firstname: this.refs.firstname.value,
      lastname: this.refs.lastname.value,
      email: this.refs.email.value,
      password: this.refs.password.value,
      password_confirmation: this.refs.password_confirmation.value
    }

    this.props.submit(formData);

  }

  render() {

    const content = this.props.formContent;
    const title =  content.title || '';
    const formFields  = content.formFields || {};
    const user = this.props.user || {};
    const errors = user.errors || [];

    return (
      <form onSubmit={ this.submit.bind(this) }>

        <title>{ title }</title>

        {
          formFields.map((field, index) => {

            let fieldErrors = errors[field.name] || [];

            return 	(<div key={ `field_${ index }` }>
                      <br/>
                        <label>{ field.label }</label>
                          <input  ref={ field.name }
                                  name={ field.name }
                                  className="form-control"
                                  type={ field.type }
                                  defaultValue={ user[field.name] }
                          />
                          {
                            fieldErrors.map((error, index) => {
                              return <p className="text-danger" key={ `${field.name}_error_${index}` }>{ error }</p>;
                            })
                          }
                      </div>);
          })
        }

        <br/>

        <input type="submit" className="btn btn-success" value="Signup"/>

      </form>
    )
  }

}
