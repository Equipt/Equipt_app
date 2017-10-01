import PropTypes from 'prop-types';
import React from 'react';

import AddressAutocomplete from 'react-address-autocomplete';

import FormFieldsHelper from 'helpers/FormFields';

export class UsersContact extends React.Component {

  static propTypes = {
    mapZenKey: PropTypes.string.isRequired,
    setAddress: PropTypes.func.isRequired,
    content: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      latitude: Infinity,
      longitude: Infinity
    }
  }

  submitContact(e) {
    e.preventDefault();
    const currentUser = this.props.currentUser || {};
    this.props.actions.updateCurrentUser();
  }

  render() {

    const currentUser = this.props.currentUser || {};
    const address = currentUser.address || {};
    const { contact } = this.props.content.profile.edit;

    return (
      <section className="user-contact">

        <form onSubmit={ this.submitContact.bind(this) }>

          <h4>Contact Information</h4>

          <AddressAutocomplete
            name="location"
            placeholder="Address: 12456 Fake Street #A, San Francisco, CA, 94118"
            value={this.state}
            onChange={data => this.setState(data)}
            apiKey={ this.props.mapZenKey }
          />

          <div className="row">
            { FormFieldsHelper.call(this, contact.formFields, address.errors, address) }
          </div>

          <br/>

          <input type="submit" className="btn btn-success clearfix" value={ contact.button }/>

        </form>

      </section>
    )

  }

}
