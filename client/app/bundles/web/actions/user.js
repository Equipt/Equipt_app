import types from 'actions/types';

import * as sessionActions from 'actions/session';

// Sign up

export const signup = (formData, callback) => {

	return function(dispatch, getState, api) {

		api.token = getState().session.token;

		api.post('/user', formData)
		.then(user => {

			// Set Current User
			dispatch(sessionActions.setCurrentUser(user));

			// run success
			callback();

		})
		.catch(err => {
			dispatch(userErrors(err));
		});
	}

};

// User errors

export const userErrors = errors => {
	return {
		type: types.USER_ERRORS,
		payload: errors
	}
};
