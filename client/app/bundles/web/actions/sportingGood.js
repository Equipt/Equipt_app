import types from './types';

import * as alertActions from './alerts';

export const fetchSportingGood = (pathname) => {

	return function(dispatch, getState, api) {

		api.token = getState().session.token;

		api.get(pathname).then(data => {
			dispatch(setSportingGood(data));
		})
		.catch(err => {
			dispatch(alertActions.showErrorAlert(err));
		});

	}

}

export const setSportingGood = (data) => {
	return {
		type: types.SET_SPORTING_GOOD,
		payload: data
	}
}

export const newSportingGood = () => {

	return function(dispatch, getState, api) {

		api.token = getState().session.token;

		api.get('/owner/sporting_goods/new')
		.then(data => dispatch(setSportingGood(data)));

	}

}

export const createSportingGood = (data) => {

	return function(dispatch, getState, api) {

		api.token = getState().session.token;

		api.post('/owner/sporting_goods', data, {
			isMultipart: true
		})
		.then(data => {
			
		});

	}
}