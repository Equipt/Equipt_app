import PropTypes from 'prop-types';
import React from 'react';

import { Router } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'; // Middleware for handling async redux events
import { createSession } from 'redux-session';
import routes from 'utils/Router';

import axios from 'axios';
import Api from 'utils/Api';

import reducers from '../reducers';
import * as sessionActions from 'actions/session';

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

// Set up api
const api = new Api(history);

// Thunk setup
const thunkMiddleware = thunk.withExtraArgument(api);

// Create Redux Store
const store = createStore(
	reducers,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	applyMiddleware(middleware, thunkMiddleware, session)
);

// add dispatch to api
api.dispatch = store.dispatch;

// Add apiKey on each request
axios.interceptors.request.use(config => {
	const state = store.getState();
	if (state.session.token) {
		config.headers.authorization = state.session.token;
	}
	return config;
});

// Root Template
const Root = (props, railsContext) => {

	// Fetch current user details on load
	store.dispatch(sessionActions.fetchCurrentUser());

	return (
		<Provider store={store}>
			<ConnectedRouter history={ history }>
				{ routes(props, store) }
			</ConnectedRouter>
		</Provider>
	)

}

export default Root;
