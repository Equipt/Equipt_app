import PropTypes from 'prop-types';
import React from 'react';

import { Nav } from '../components/Nav';
import { SportingGoodsIndex } from 'components/SportingGoodsIndex';

import { Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import routes from './../utils/Router';

import rootReducer from '../reducers';

const Root = (props, railsContext) => {

	const store = createStore(rootReducer);

	return (
		<Provider store={store}>
			{ routes }
		</Provider>
	)

}

export default Root;

