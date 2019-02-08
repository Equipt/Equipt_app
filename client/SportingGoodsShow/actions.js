import types from './types';

import * as alertActions from 'Alert/actions.js';
import * as loaderActions from 'Loader/actions.js';

export const fetchSportingGood = (pathname, rentalHashId = null) =>
	async (dispatch, getState, { api }) => {

	dispatch(loaderActions.showLoader(true));

	try {

		const data = await api.get(`/sporting_goods/${ pathname }`);

		// Add rental if needed
		if (rentalHashId) {
			const rentals = data.rentals || [];
			data.rental = rentals.filter(rental => rental.hashId === rentalHashId)[0];
		}

		dispatch(setSportingGood(data));
		dispatch(loaderActions.showLoader(false));

	} catch(err) {

		dispatch(alertActions.showErrorAlert(err));
		dispatch(loaderActions.showLoader(false));

	}

}

export const setSportingGood = (data) => {
	return {
		type: types.SET_SPORTING_GOOD,
		payload: data
	}
}

export const newSportingGood = () => {

	return function(dispatch, getState, { api }) {

		api.get('/owner/sporting_goods/new')
		.then(data => dispatch(setSportingGood(data)));

	}

}

export const createSportingGood = (sportingGood = {}, images = [], slug = '', callback) => {

	return function(dispatch, getState, { api }) {

		const formData = buildFormData('sporting_good', sportingGood, images);

		api.post('/owner/sporting_goods', null, {
			isMultipart: true,
			data: formData
		})
		.then(data => callback())
		.catch(data => dispatch(setSportingGood(data)));

	}

}

export const editSportingGood = (slug) => {

	return function(dispatch, getState, { api }) {

		dispatch(showLoader(true));

		api.get(`/owner/sporting_goods/${slug}/edit`)
		.then(data => {
			dispatch(setSportingGood(data))
			dispatch(showLoader(false));
		});

	}

}

export const updateSportingGood = (sportingGood = {}, images = [], slug = '', callback) => {

	return function(dispatch, getState, { api }) {

		const formData = buildFormData('sporting_good', sportingGood, images);

		api.put(`/owner/sporting_goods/${ slug }`, null, {
			isMultipart: true,
			data: formData
		})
		.then(data => {
			callback();
		})
		.catch(data => dispatch(setSportingGood(data)));

	}

}

export const detachRental = data => {
	return {
		type: types.DETACH_SPORTING_GOOD_RENTAL,
		payload: data
	}
}

export const attachRental = data => {
	return {
		type: types.ATTACH_SPORTING_GOOD_RENTAL,
		payload: data
	}
}

function buildFormData(resource, data, images ) {

	const formData = new FormData();

	for (let key in data) {

		if (key !== 'errors') formData.append(`${ resource }[${ key }]`, data[key] || '');

	}

	images.forEach(image => {
		if (image.id) {
			formData.append(`${ resource }[images_attributes][]`, image.id);
		} else {
			formData.append(`${ resource }[images_attributes][]`, image);
		}
	});

	return formData;

}
