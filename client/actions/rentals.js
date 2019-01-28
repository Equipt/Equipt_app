import types from './types';
import * as alertActions from './alerts';
import { showLoader } from './loader';

export const fetchRentals = () => {

  return (dispatch, getState, { api }) => {

		dispatch(showLoader(true));

    api.get('/owner/rentals')
    .then(rentals => dispatch(setRentals(rentals)))
		.then(() => dispatch(showLoader(false)));

  }

}

export const setRentals = data => {
	return {
		type: types.SET_RENTALS,
		payload: data
	}
}

export const addRental = data => {
  return {
    type: types.ADD_RENTAL,
    payload: data
  }
}

export const detachRental = data => {
	return {
		type: types.DETACH_RENTAL,
		payload: data
	}
}
