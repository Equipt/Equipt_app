import React from 'react';
import Dropzone from 'react-dropzone';

import { UserForm } from 'components/UserForm';
import { Privacy } from 'components/Privacy';
import UserContact from 'components/UserContact';
import RatingsList from 'components/RatingsList';

import Flyout from 'components/Flyout';

const UsersProfile = props => {

	const { content, currentUser, actions } = props;

	return (
		<section className="container">
			<Flyout defaultTab="Basic">
				<UserForm { ...props } formContent={ content.profile.basic } isUpdating={ true } name="Basic"/>
				<UserContact name="Contact" { ...props } title={ content.profile.contact.title }/>
				<Privacy name="Privacy" { ...props }/>
				<RatingsList name="Ratings" ratings={ currentUser.ratings }/>
			</Flyout>
		</section>
	)

}

export default UsersProfile;
