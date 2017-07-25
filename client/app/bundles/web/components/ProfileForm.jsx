import React from 'react';

const ProfileForm = ({
	currentUser = {}
}) => {

	return (
		<aside className="container">
			<h3>{ currentUser.firstname }</h3>
		</aside>
	)
};

export default ProfileForm;