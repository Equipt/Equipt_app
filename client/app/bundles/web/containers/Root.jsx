import PropTypes from 'prop-types';
import React from 'react';

import { Router } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'; // Middleware for handling async redux events
import { createSession } from 'redux-session';
import routes from './../utils/Router';

import reducers from '../reducers';

// Create a browser history
const history = createHistory();

// Middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

// Middleware for presistent store data
const session = createSession({
	ns: 'equipt_app',
	adapter: 'localStorage',
	selectState (state) {
		return {
	  		session: state.session
		};
  	},
  	onLoad(storedState, dispatch) {
		dispatch({ type: 'HYDRATE_STATE', storedState })
  	},
  	clearStorage (action) {
    	return action.type === 'DROP_SESSION_DATA';
  	}
});

// Create Redux Store
const store = createStore(
	reducers,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	applyMiddleware(middleware, thunk, session)
);


// Root Template
const Root = (props, railsContext) => {
	return (
		<Provider store={store}>
			<ConnectedRouter history={ history }>
				{ routes(props, store) }
			</ConnectedRouter>
		</Provider>
	)
}

export default Root;

