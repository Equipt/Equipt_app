import types from './types';

import * as alertActions from './alerts';
import * as loaderActions from './loader';

// Get all sporting goods
export const fetchSportingGoods = ({
	keyword = '',
	page = 1,
	per_page = 20
}) => {

	return function(dispatch, getState, { api, algoliaClient }) {

		dispatch(loaderActions.showLoader(true));

		const index = algoliaClient.initIndex('SportingGood_development');

		index.search({ query: keyword }, { page: page, hitsPerPage: per_page })
		.then(({
			hits,
			nbHits,
			nbPages,
			hitsPerPage
		}) => {
				dispatch(setSportingGoods({
					results: hits,
					totalResults: nbHits,
					totalPages: nbPages,
					totalPerPage: hitsPerPage,
					page
				}));
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
		.then(({sporting_goods, total}) => {
			dispatch(setSportingGoods({
				results: sporting_goods,
				totalResults: total
			}));
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
