import types from './types';

import * as alertActions from './alerts';

// Fetch current user
export const fetchCurrentUser = () => {

	return function(dispatch, getState, { api }) {

		const session = getState().session || {};

		if (session.token) {

			api.get(`/session/fetch_user`)
			.then(user => dispatch(setCurrentUser(user)))

		}

	}

}

// Login
export const login = (data, callback) => {

	return function(dispatch, getState, { api }) {

		api.post('/session', data).then(user => {

			dispatch(setCurrentUser(user));

			// run success
			callback();

		}).catch(err => {

			// Problem Fetching Current User
			dispatch(alertActions.showErrorAlert(err));

		});

	}

};

// Set Starting User
export const setCurrentUser = user => {
	return {
		type: types.SET_CURRENT_USER,
		payload: {
			currentUser: user,
			token: user.apiKey
		}
	}
};

// Logout
export const clearSession = () => {

	if (window.FB) window.FB.logout();

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

// Forgot Password
export const forgotPassword = data => {

	return function(dispatch, getState, { api }) {

		api.post('/forgot_password', data).then(message => {

			// Show success message
			dispatch(alertActions.showSuccessAlert(message));

		});

	}

}

// Submit Users Profile Information
export const updateCurrentUser = (currentUser, callback) => {
	return function(dispatch, getState, { api }) {
		api.put(`/user/${ currentUser.id }`, currentUser)
		.then(user => {
			dispatch(setCurrentUser(user));
			if (callback) callback(user);
		})
		.catch(user => {
			dispatch(setCurrentUser(user));
			if (callback) callback(user);
		});
	}
}

// Delete users account
export const deleteCurrentUser = (currentUser = {}, feedback = '', callback) => {

	return (dispatch, getState, { api }) => {

		api.delete(`/user/${ currentUser.id }`, {
			feedback: feedback
		}).then(message => {
			dispatch(clearSession());
			dispatch(alertActions.showErrorAlert(message))
			if (callback) callback();
		});

	}

}

// Reset Password
export const resetPassword = (resetToken, data, callback) => {

	return function(dispatch, getState, { api }) {

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

	return function(dispatch, getState, { api }) {

		api.post('/auth/facebook/callback', data).then(user => {

			// Set Current User
			dispatch(setCurrentUser(user));

			// Clear Alerts
			dispatch(alertActions.clearAlerts());

			// run success
			callback();

		});

	}
}

// Verify the users phone number pin
export const verifyPhonePin = (pin, callback) => {

	return (dispatch, getState, { api }) => {

		api.post('/phone/verify', {pin: pin})
		.then(user => {

			// Set Current User
			dispatch(setCurrentUser(user));

			// Show Success alert
			dispatch(alertActions.showSuccessAlert(user.notice));

			// run success
			if (callback) callback(user);

		})
		.catch(err => dispatch(alertActions.showErrorAlert(err)));

	}

}

// Update Profile image
export const changeAvatar = image => {

}

// Resend pin
export const resendPin = () => {

	return (dispatch, getState, { api }) => {

			api.get('/phone/resend_pin')
			.then(message => dispatch(alertActions.showSuccessAlert(message)));

	}

}
