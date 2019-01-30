import types from './types.js';

import * as alertActions from './../Alert/actions.js';

export const login = (data, callback) => async(dispatch, getState, { api, history }) => {

	try {

		const user = await api.post('/session', data);

		dispatch(setCurrentUser(user));

		history.push('/sporting_goods');

	} catch(err) {
		// Problem Fetching Current User
		dispatch(alertActions.showErrorAlert(err));
	}

};

// Login With Facebook
export const loginWithFacebook = (data) => async(dispatch, getState, { api, history }) => {

	try {

		const user = await api.post('/auth/facebook/callback', data);

		// Set Current User
		dispatch(setCurrentUser(user));

		history.push('/sporting_goods');

	} catch(err) {

		// Problem Fetching Current User
		dispatch(alertActions.showErrorAlert(err));

	}

}

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
