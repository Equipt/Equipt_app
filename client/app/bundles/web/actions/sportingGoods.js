import types from './types';

import * as alertActions from './alerts';
import * as loaderActions from './loader';

// Get all sporting goods
export const fetchSportingGoods = (query = {}) => {

	return function(dispatch, getState, api) {

		api.token = getState().session.token;

		dispatch(loaderActions.showLoader(true));

		api.get('/sporting_goods', query)
		.then(sportingGoods => {
			dispatch(setSportingGoods(sportingGoods));
			dispatch(loaderActions.showLoader(false));
		})
		.catch(err => {
			dispatch(alertActions.showErrorAlert(err));
			dispatch(loaderActions.showLoader(false));
		});

	}

}

// Get all sporting goods belonging to user
export const fetchOwnersSportingGoods = (query = {}) => {

	return function(dispatch, getState, api) {

		api.token = getState().session.token;

		dispatch(loaderActions.showLoader(true));

		api.get('/owner/sporting_goods', query)
		.then(sportingGoods => {
			dispatch(setSportingGoods(sportingGoods));
			dispatch(loaderActions.showLoader(false));
		})
		.catch(err => {
			dispatch(alertActions.showErrorAlert(err));
			dispatch(loaderActions.showLoader(false));
		});

	}

}

// Set the sporting goods in store
export const setSportingGoods = (data) => {
	return {
		type: types.SET_SPORTING_GOODS,
		payload: data
	}
}

// Remove Sporting Good from list
export const detachSportingGoods = (data) => {
	return {
		type: types.DETACH_SPORTING_GOOD,
		payload: data
	}
}

// Delete sporting good
export const deleteSportingGood = id => {

	return function(dispatch, getState, api) {

		api.token = getState().session.token;

		api.delete(`/owner/sporting_goods/${ id }`)
		.then(res => {
			dispatch(alertActions.showSuccessAlert(res));
			dispatch(detachSportingGoods(id));
		})
		.catch(err => {
			dispatch(alertActions.showErrorAlert(err));
		});

	}
}
