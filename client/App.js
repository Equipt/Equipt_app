import PropTypes from 'prop-types';
import React from 'react';

import { Router } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'; // Middleware for handling async redux events
import { createSession } from 'redux-session';
import algoliasearch from 'algoliasearch';
import axios from 'axios';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import Api from './Api.js';
import Routes from './Routes.js';
import reducers from './reducer.js';
import * as sessionActions from 'actions/session';

// Start up big-calendar
BigCalendar.setLocalizer(
	BigCalendar.momentLocalizer(moment)
);

// Root Template
const Root = (props, railsContext) => {

	// variables
	const environment = props.rails_env || 'production';

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
	// history, dispatch, store
	const api = new Api(history);

	// Setup angolia search
	const algoliaClient = algoliasearch(props.agolia_id, props.agolia_search_only_key);

	// Thunk setup
	const thunkMiddleware = thunk.withExtraArgument({api, history, algoliaClient, environment});

	// Create Redux Store
	const store = createStore(
		reducers,
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
		applyMiddleware(middleware, thunkMiddleware, session)
	);

	// add store to api
	api.store = store;

	// Fetch current user details on load
	store.dispatch(sessionActions.fetchCurrentUser());

	return (
		<Provider store={store}>
			<ConnectedRouter history={ history }>
			   <Routes { ...props } store={ store }/>
			</ConnectedRouter>
		</Provider>
	)

}

export default Root;
