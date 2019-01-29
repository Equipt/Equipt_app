import types from './types.js';

export const login = (data, callback) => async(dispatch, getState, { api, history }) => {

	try {

		const user = await api.post('/session', data);

		dispatch({
			type: types.SET_CURRENT_USER,
			payload: {
				currentUser: user,
				token: user.apiKey
			}
		});

		debugger;

	} catch(err) {
		// Problem Fetching Current User
		dispatch(alertActions.showErrorAlert(err));
	}

};
