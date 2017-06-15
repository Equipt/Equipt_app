import types from './types';

import API from 'utils/Api';

import * as alertActions from './alerts';

// Get all sporting goods
export const fetchSportingGoods = () => {

	return function(dispatch) {

		API.get('/sporting_goods')
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