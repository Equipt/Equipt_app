import types from './types';

import * as alertActions from './alerts';
import * as loaderActions from './loader';

// Get all sporting goods
export const fetchSportingGoods = ({
	keyword = '',
	page = 1,
	per_page = 12
}) => {

	return function(dispatch, getState, { api }) {

		dispatch(loaderActions.showLoader(true));

		api.get('/sporting_goods', {
			keyword: keyword,
			page: page,
			per_page: per_page
		})
		.then(data => {
			dispatch(setSportingGoods(data));
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

	return function(dispatch, getState, { api }) {

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

// Set sportingGoods pagination total
export const setSportingGoodsTotal = (data) => {
	return {
		type: types.SET_SPORTING_GOODS_TOTAL,
		payload: data
	}
}

// Delete sporting good
export const deleteSportingGood = (slug, callback) => {

	return function(dispatch, getState, { api }) {

		api.delete(`/owner/sporting_goods/${ slug }`)
		.then(res => {
			dispatch(fetchOwnersSportingGoods());
			dispatch(alertActions.showSuccessAlert(res));
		})
		.catch(err => dispatch(alertActions.showErrorAlert(err)));

	}
}
