import types from 'actions/types';

import * as sessionActions from 'actions/session';

// Sign up

export const signup = (formData, callback) => {

	return function(dispatch, getState, api) {

		api.token = getState().session.token;

		api.post('/user', formData)
		.then(user => {

			// Set Current User
			dispatch(sessionActions.setCurrentUser({
				currentUser: user,
				token: user.apiKey
			}));

			// run success
			callback();

		})
		.catch(err => {
			dispatch(userErrors(err));
		});
	}

};

// Get users ( owners ) rentals

export const fetchUserRentals = () => {

	return function(dispatch, getState, api) {

		api.token = getState().session.token;

		api.get('/owner/rentals')
		.then(rentals => {

			// Set Rentals on Current User
			dispatch(setUsersRentals(rentals));

		});

	}

}

// Set user Rentals

export const setUsersRentals = rentals => {
	return {
		type: types.SET_USER_RENTALS,
		payload: rentals
	}
}

// User errors

export const userErrors = errors => {
	return {
		type: types.USER_ERRORS,
		payload: errors
	}
};
