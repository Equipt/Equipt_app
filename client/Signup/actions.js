import types from 'actions/types';

import * as sessionActions from 'Session/actions.js';

// Sign up

export const signup = (user, callback) => {

	return function(dispatch, getState, { api, history }) {

		api.token = getState().session.token;

		api.post('/user', { user: user })
		.then(user => {

			// Set Current User
			dispatch(sessionActions.setCurrentUser(user));

			history.push('/sporting_goods');

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
