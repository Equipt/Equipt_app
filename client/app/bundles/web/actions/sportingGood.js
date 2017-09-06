import types from './types';

import * as alertActions from './alerts';

export const fetchSportingGood = (pathname, rentalHashId = null) => {

	return function(dispatch, getState, api) {

		api.token = getState().session.token;

		api.get(pathname)
		.then(data => {

			// Add rental if needed
			if (rentalHashId) {
				const rentals = data.rentals || [];
				data.rental = rentals.filter(rental => rental.hashId === rentalHashId)[0];
			}

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


export const createSportingGood = (sportingGood = {}, images = [], slug = '', callback) => {

	return function(dispatch, getState, api) {

		api.token = getState().session.token;

		const formData = buildFormData('sporting_good', sportingGood, images);

		api.post('/owner/sporting_goods', null, {
			isMultipart: true,
			data: formData
		})
		.then(data => {
			callback();
		})
		.catch(data => dispatch(setSportingGood(data)));

	}
}

export const editSportingGood = (slug) => {

	return function(dispatch, getState, api) {

		api.token = getState().session.token;

		api.get(`/owner/sporting_goods/${slug}/edit`)
		.then(data => dispatch(setSportingGood(data)));

	}

}

export const updateSportingGood = (sportingGood = {}, images = [], slug = '', callback) => {

	return function(dispatch, getState, api) {

		api.token = getState().session.token;

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

export const rent = (rental, sportingGood, callback) => {

	const slug = sportingGood.slug;

	return function(dispatch, getState, api) {

		api.token = getState().session.token;

		api.post(`/sporting_goods/${ slug }/rentals`, rental)
		.then(rental => {
			dispatch(setRental(rental));
			callback(rental);
		})
		.catch(data => dispatch(alertActions.showErrorAlert(data.errors)));

	}

}

export const setRental = data => {
	return {
		type: types.SET_RENTAL,
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
