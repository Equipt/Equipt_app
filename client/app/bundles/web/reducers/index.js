import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import currentUser from './currentUser';
import storedState from './storedState';
import alerts from './alerts';
 
export default combineReducers({
	storedState,
	alerts,
	currentUser,
	routing
});