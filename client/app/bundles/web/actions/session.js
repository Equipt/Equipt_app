import types from './types';

import * as alertActions from './alerts';

// Fetch Current User 
export const fetchCurrentUser = (data, callback) => {

	return function(dispatch, getState, api) {

		api.token = getState().session.token;

		dispatch(fetchingCurrentUser({
			fetching: true
		}));

		api.post('/session', data).then(user => {

			// Remove Loader
			dispatch(fetchingCurrentUser({fetching: false}));

			// Set Current User
			dispatch(setCurrentUser({ 
				currentUser: user,
				token: user.api_key
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

	window.FB.logout();

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

// Forgot Password
export const forgotPassword = data => {

	return function(dispatch, getState, api) {

		api.post('/forgot_password', data).then(message => {

			// Show success message
			dispatch(alertActions.showSuccessAlert(message));

		});

	}

}

// Reset Password
export const resetPassword = (resetToken, data, callback) => {

	return function(dispatch, getState, api) {

		api.post(`/reset_password/${ resetToken }`, data)
		.then(message => {

			// Show success message
			dispatch(alertActions.showSuccessAlert(message));

			callback();

		})
		.catch(errors => {

			if (errors.error) {
				dispatch(alertActions.showErrorAlert(errors));
			} else {
				dispatch(resetErrors(errors));
			}
			
		});

	}

};

export const resetErrors = errors => {
	return {
		type: types.RESET_ERRORS,
		payload: errors
	}
};

// Login With Facebook
export const loginWithFacebook = (data, callback) => {

	return function(dispatch, getState, api) {

		api.token = getState().session.token;

		api.post('/auth/facebook/callback', data).then(user => {

			// Set Current User
			dispatch(setCurrentUser({ 
				currentUser: user,
				token:user.api_key
			}));

			// Clear Alerts
			dispatch(alertActions.clearAlerts());	

			// run success
			callback();

		});

	}
}



