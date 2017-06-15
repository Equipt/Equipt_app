import types from './types';

// Show Alert
export const showErrorAlert = (data) => {
	return {
		type: types.ERROR_ALERT,
		payload: data  		
	}
};

// Show Alert
export const clearAlerts = (data) => {
	return {
		type: types.CLEAR_ALERTS,
		payload: {}
	}
};