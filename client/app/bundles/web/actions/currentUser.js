import types from './types';

import API from 'utils/Api';

import Auth from 'utils/Auth';

// Fetch Current User 
export const fetchCurrentUser = (data) => {

	return function(dispatch) {

		dispatch(fetchingCurrentUser({
			fetching: true
		}));

		API.post('/session', data).then(data => {

			// Set Api Key
			Auth.setSession(data.api_key);

			// Remove Loader
			dispatch(fetchingCurrentUser({fetching: false}));

			// Set Current User
			dispatch(setCurrentUser(data));	

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

// Fetching currentuser
export const fetchingCurrentUser = (data) => {
	return {	
		type: types.FETCHING_CURRENT_USER,
		payload: data  
	}
}



