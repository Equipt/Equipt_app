import React from 'react';
import { UsersContactForm } from 'components/UsersContactForm';

const Address = (props, {
  title,
  actions
}) => {

  return (
    <div>
      <h4>{ title }</h4>
      <UsersContactForm { ...props } completedContactForm={ props.actions.closeModal }/>
    </div>
  )

}

export default Address;
