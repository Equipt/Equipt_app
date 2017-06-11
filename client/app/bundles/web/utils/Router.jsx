import React from 'react';
import { Router, Route, IndexRoute, Switch } from 'react-router';

import { App } from 'containers/App';
import { Signup } from 'components/Signup';
import { Login } from 'components/Login';

import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export default (
	<Router history={ history }>
		<App>
			<Route path="/signup" component={ Signup }/>
			<Route path="/login" component={ Login }/>
		</App>
	</Router>
);
