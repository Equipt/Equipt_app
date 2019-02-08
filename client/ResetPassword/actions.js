import alertActions from 'Alert/actions.js';

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
