import types from './types';

import * as loaderActions from 'Loader/actions.js';

export const fetchRentals = () =>
  async(dispatch, getState, { api }) => {

    dispatch(loaderActions.showLoader(true));

    const rentals = await api.get('/owner/rentals');

    await dispatch(setRentals(rentals));
    
    dispatch(loaderActions.showLoader(false));

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
