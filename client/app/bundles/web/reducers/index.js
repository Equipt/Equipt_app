import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import session from './session';
import alerts from './alerts';
import loader from  './loader';
import errors from './errors';
import sportingGoods from './sportingGoods';
import sportingGood from './sportingGood';
import rentals from './rentals';
import rental from './rental';
import user from './user';

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
	routing
});
