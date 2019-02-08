import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import session from 'Session/reducer.js';
import alerts from 'Alert/reducer.js';
import loader from  'Loader/reducer.js';
import errors from './reducers/errors.js';
import sportingGoods from 'SportingGoodsIndex/reducer.js';
import sportingGood from 'SportingGoodsShow/reducer.js';
import rentals from 'RentalsIndex/reducer.js';
import rental from 'RentalsShow/reducer.js';
import user from './reducers/user.js';
import modal from 'Modal/reducer.js';

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
