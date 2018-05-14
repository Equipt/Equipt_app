import {connect} from 'react-redux';

import React from 'react';
import Contact from 'containers/Contact';

const Address = (props, {
  actions
}) => (
  <div>
    <h4>{ I18n.t('user.update_profile') }</h4>
    <Contact { ...props } completedContactForm={ props.actions.closeModal }/>
  </div>
);

export default Address;
