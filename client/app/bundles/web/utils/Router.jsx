import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import NavContainer from 'containers/Nav';
import Login from 'containers/Login';

import { Signup } from 'components/Signup';

export default (props) => {

	return (
		<div>
			<NavContainer initialCurrentUser={ props.currentUser }/>
			<Route path="/signup" component={ Signup }/>
			<Route path="/login" component={ Login }/>
		</div>
	);
	
};
