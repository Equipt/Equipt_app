import types from './types';

import * as alertActions from './alerts';

// Get all sporting goods
export const fetchSportingGoods = () => {

	return function(dispatch, getState, api) {

		api.token = getState().session.token;

		api.get('/sporting_goods')
		.then(sportingGoods => {
			dispatch(setSportingGoods(sportingGoods));
		})
		.catch(err => {
			dispatch(alertActions.showErrorAlert(err));
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