import PropTypes from 'prop-types';
import React from 'react';

import { SportingGoodsIndex } from 'components/SportingGoodsIndex';

import { Router } from 'react-router';
import createHistory from 'history/createBrowserHistory'
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import routes from './../utils/Router';

import reducers from '../reducers';

// Create a browser history
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

// Create Redux Store
const store = createStore(
	reducers,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	applyMiddleware(middleware, thunk)
);

// Root Template
const Root = (props, railsContext) => {
	return (
		<Provider store={store}>
			<ConnectedRouter history={ history }>
				{ routes(props) }
			</ConnectedRouter>
		</Provider>
	)

}

export default Root;

