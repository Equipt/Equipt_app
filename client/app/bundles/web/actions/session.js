import types from './types';

import * as alertActions from './alerts';

// Fetch Current User 
export const fetchCurrentUser = (data, callback) => {

	return function(dispatch, getState, Api) {

		const api = new Api(getState().session);

		dispatch(fetchingCurrentUser({
			fetching: true
		}));

		api.post('/session', data).then(user => {

			// Remove Loader
			dispatch(fetchingCurrentUser({fetching: false}));

			// Set Current User
			dispatch(setCurrentUser({ 
				currentUser: user,
				token:user.api_key
			}));

			// Clear Alerts
			dispatch(alertActions.clearAlerts());	

			// run success
			callback();

		}).catch(err => {

			// Remove Loader
			dispatch(fetchingCurrentUser({fetching: false}));

			// Problem Fetching Current User
			dispatch(alertActions.showErrorAlert(err));
				
		});

	}

};

// Set Starting User
export const setCurrentUser = (data) => {
	return {	
		type: types.SET_CURRENT_USER,
		payload: data  
	}
};

// Logout
export const clearSession = () => {
	return {	
		type: types.CLEAR_SESSION,
		payload: {}
	}
};

// Clear session
export const clearStoredData = (data) => {
	return {	
		type: types.DROP_SESSION_DATA
	}
};

// Fetching currentuser
export const fetchingCurrentUser = (data) => {
	return {	
		type: types.FETCHING_CURRENT_USER,
		payload: data  
	}
}



