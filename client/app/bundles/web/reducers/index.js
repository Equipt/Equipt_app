import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import currentUser from './currentUser';
 
export default combineReducers({
	currentUser,
	routing
});