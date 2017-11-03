import React from 'react';
import PropTypes from 'prop-types';

import FormFieldsHelper from 'helpers/FormFields';

export class UserForm extends React.Component {

  static propTypes = {
    formContent: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    currentUser: PropTypes.object
  }

  static contextTypes = {
      router: PropTypes.shape({
        history: PropTypes.object.isRequired,
      })
  }

  constructor(props) {
    super(props);

    this.state = {
      user: props.currentUser || {}
    }

  }

  componentWillReceiveProps(newProps) {
    this.setState({
      user: newProps.user
    });
  }

  submit(e) {

    e.preventDefault();

    const { actions } = this.props;
    const { user } = this.state;

    if (Object.keys(user).length === 0) {
      actions.showErrorAlert({error: 'Form cannot be empty!'});
      return;
    }

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

    user.errors && delete user.errors[field.name]

    this.setState({
      user: user
    });

  }

  render() {

    const user = this.state.user;
    const content = this.props.formContent;

    return (
      <form onSubmit={ this.submit.bind(this) }>

        <title>{ content.title }</title>

        { FormFieldsHelper.call(this, content.formFields, user) }

        <br/>

        <input type="submit" className="btn btn-success clearfix" value={ this.props.isCreating ? "Signup" : "Update"}/>

      </form>
    )
  }

}
