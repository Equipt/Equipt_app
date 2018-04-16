import React from 'react';
import Dropzone from 'react-dropzone';

import UserBasic from 'components/UserBasic';
import UserContact from 'components/UserContact';
import { Privacy } from 'components/Privacy';
import RatingsList from 'components/RatingsList';

import Flyout from 'components/Flyout';

const UsersProfile = props => {

	const { content, currentUser, actions } = props;

	return (
		<section className="container">
			<Flyout defaultTab="Basic">
				<UserBasic { ...props } name="Basic"/>
				<UserContact name="Contact" { ...props }/>
				<Privacy name="Privacy" { ...props }/>
				<RatingsList name="Ratings" ratings={ currentUser.ratings }/>
			</Flyout>
		</section>
	)

}

export default UsersProfile;
