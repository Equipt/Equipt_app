import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import session from './session';
import alerts from './alerts';
import sportingGoods from './sportingGoods';
 
export default combineReducers({
	alerts,
	session,
	sportingGoods,
	routing
});