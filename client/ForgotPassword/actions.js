import types from './types.js';

// Forgot Password
export const forgotPassword = data => {

	return function(dispatch, getState, { api }) {

		api.post('/forgot_password', data).then(message => {

			// Show success message
			dispatch(alertActions.showSuccessAlert(message));

		});

	}

}
