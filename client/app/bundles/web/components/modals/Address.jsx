import React from 'react';
import UserContact from 'components/UserContact';

const Address = (props, {
  title,
  actions
}) => {

  return (
    <div>
      <h4>{ title }</h4>
      <UserContact { ...props } completedContactForm={ props.actions.closeModal }/>
    </div>
  )

}

export default Address;
