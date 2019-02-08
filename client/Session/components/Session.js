import React, { Component, Fragment } from 'react';

const Session = (props) => {
	return (
		<Fragment>
		{
			props.children.map(child => (
				React.cloneElement(child, props)
			))
		}
		</Fragment>
	)
};

export default Session;
