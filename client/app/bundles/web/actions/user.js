import types from 'actions/types';

import * as sessionActions from 'actions/session';

export const signup = (formData, callback) => {

	return function(dispatch, getState, api) {

		api.token = getState().session.token;

		api.post('/user', formData)
		.then(user => {
 			
			// Set Current User
			dispatch(sessionActions.setCurrentUser({ 
				currentUser: user,
				token:user.api_key
			}));	

			// run success
			callback();

		})
		.catch(err => {
			dispatch(userErrors(err));
		});
	}

};

export const userErrors = errors => {
	return {
		type: types.USER_ERRORS,
		payload: errors
	}
};