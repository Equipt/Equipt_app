import {connect} from 'react-redux';

import React from 'react';
import Contact from 'containers/Contact';

const Address = (props, {
  title,
  actions
}) => (
  <div>
    <h4>{ title }</h4>
    <Contact { ...props } completedContactForm={ props.actions.closeModal }/>
  </div>
);

export default Address;
