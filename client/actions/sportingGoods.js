import types from './types';

import * as alertActions from './alerts';
import * as loaderActions from './loader';

const perPage = 20;

// Get all sporting goods
export const fetchSportingGoods = ({
	keyword = '',
	page = 0,
	location = {},
	distance = 50000
}) => async (dispatch, getState, { api, algoliaClient, environment }) => {

		dispatch(loaderActions.showLoader(true));

		const index = algoliaClient.initIndex(`SportingGood_${ environment }`);
		const userId = getState().session.currentUser.id;

		const params = {
			query: keyword,
			filters: `user_id != ${ userId }`
		};

		// Set pagination if no search
		if (!keyword.length && !location) {
			params.hitsPerPage = perPage;
			params.page = page;
		}

		if (location && location.lat && location.lng) {
			params.aroundLatLng =  `${ location.lat }, ${ location.lng }`;
			params.aroundRadius = distance;
		}

		try {

			const { hits, nbHits, nbPages, hitsPerPage } = await index.search(params);

			dispatch(setSportingGoods({
				results: hits,
				totalResults: nbHits,
				totalPerPage: hitsPerPage,
				page
			}));

			dispatch(loaderActions.showLoader(false));

		} catch(err) {

			dispatch(alertActions.showErrorAlert(err));
			dispatch(loaderActions.showLoader(false));

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
			if (callback) callback();
		})
		.catch(err => dispatch(alertActions.showErrorAlert(err)));

	}
}
