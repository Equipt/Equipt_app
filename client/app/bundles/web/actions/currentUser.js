import types from './types';

import API from 'utils/Api';

import * as alertActions from './alerts';


// Fetch Current User 
export const fetchCurrentUser = (data, callback) => {

	return function(dispatch) {

		dispatch(fetchingCurrentUser({
			fetching: true
		}));

		API.post('/session', data).then(user => {

			// Remove Loader
			dispatch(fetchingCurrentUser({fetching: false}));

			// Set Current User
			dispatch(setCurrentUser(user));	

			// run success
			callback();

		}).catch(err => {

			// Remove Loader
			dispatch(fetchingCurrentUser({fetching: false}));

			// Problem Fetching Current User
			dispatch(alertActions.showErrorAlert(err));
				
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



