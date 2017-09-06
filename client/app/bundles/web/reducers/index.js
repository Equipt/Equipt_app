import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import session from './session';
import alerts from './alerts';
import errors from './errors';
import sportingGoods from './sportingGoods';
import sportingGood from './sportingGood';
import user from './user';

export default combineReducers({
	alerts,
	errors,
	session,
	sportingGoods,
	sportingGood,
	user,
	routing
});
