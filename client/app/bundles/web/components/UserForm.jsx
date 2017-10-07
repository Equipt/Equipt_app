import React from 'react';
import PropTypes from 'prop-types';

import FormFieldsHelper from 'helpers/FormFields';

export class UserForm extends React.Component {

  static propTypes = {
    formContent: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    currentUser: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = {
      user: props.currentUser
    }

  }

  submit(e) {

    e.preventDefault();

    const { actions } = this.props;
    const { user } = this.state;

    if (this.props.isUpdating) {

      actions.updateCurrentUser(user);

    } else if (this.props.isCreating) {

      actions.signup(user, () => {
        this.context.router.history.push('/sporting_goods');
      });

    }

  }

  onChange(field) {

    const { user } = this.state;
    user[field.name] = this.refs[field.name].value;

    this.setState({
      user: user
    });

  }

  render() {

    const content = this.props.formContent;
    const title =  content.title || '';
    const formFields  = content.formFields || {};
    const user = this.props.currentUser || {};
    const errors = user.errors || [];

    return (
      <form onSubmit={ this.submit.bind(this) }>

        <title>{ title }</title>

        { FormFieldsHelper.call(this, formFields, errors, user) }

        <br/>

        <input type="submit" className="btn btn-success clearfix" value={ this.props.isCreating ? "Signup" : "Update"}/>

      </form>
    )
  }

}
