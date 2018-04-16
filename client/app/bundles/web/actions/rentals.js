import types from './types';
import * as alertActions from './alerts';

export const fetchRentals = () => {

  return (dispatch, getState, { api }) => {

    api.get('/owner/rentals')
    .then(rentals => dispatch(setRentals(rentals)));

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
