import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import session from './reducers/session.js';
import alerts from './reducers/alerts.js';
import loader from  './reducers/loader.js';
import errors from './reducers/errors.js';
import sportingGoods from './SportingGoodsIndex/reducer.js';
import sportingGood from './reducers/sportingGood.js';
import rentals from './reducers/rentals.js';
import rental from './reducers/rental.js';
import user from './reducers/user.js';
import modal from './reducers/modal.js';

export default combineReducers({
	alerts,
	loader,
	errors,
	session,
	sportingGoods,
	sportingGood,
	rentals,
	rental,
	user,
	modal,
	routing
});
