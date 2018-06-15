import PropTypes from 'prop-types';
import React from 'react';

import { Router } from 'react-router';

import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import reducers from '../reducers';
import routes from 'utils/Router';

// Root Template
const Root = (props, railsContext) => {

	const store = createStore(reducers);

	const { location } = railsContext;
	const context = {};

	return (
		<Provider store={store}>
			<StaticRouter location={ location } context={context}>
				{ routes(props, store) }
			</StaticRouter>
		</Provider>
	)
}

export default Root;
