import React from 'react';
import Dropzone from 'react-dropzone';

import { UserForm } from 'components/UserForm';
import { UsersContactForm } from 'components/UsersContactForm';
import { Privacy } from 'components/Privacy';
import RatingsList from 'components/RatingsList';

import Flyout from 'components/Flyout';

const UsersProfile = props => {

	const { content, currentUser, actions } = props;

	return (

		<section className="container">

			<Flyout defaultTab="Basic">
				<UserForm { ...props } formContent={ content.profile.basic } isUpdating={ true } name="Basic"/>
				<UsersContactForm name="Contact" { ...props } title={ content.profile.contact.title }/>
				<Privacy name="Privacy" { ...props }/>
				<RatingsList name="Ratings" ratings={ currentUser.ratings }/>
			</Flyout>

		</section>
	)

}

export default UsersProfile;
