import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Session from 'containers/Session';
import Login from 'containers/Login';
import Alert from 'containers/Alert';

import { Signup } from 'components/Signup';

export default (props) => {

	return (
		<div>
			<Session initialCurrentUser={ props.currentUser }/>
			<Alert/>
			<Route path="/signup" component={ Signup }/>
			<Route path="/login" component={ Login }/>
		</div>
	);
	
};
