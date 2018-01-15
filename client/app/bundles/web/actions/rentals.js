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

// Cancel Owners Rental
export const cancelRental = (rental, callback) => {

	return (dispatch, getState, { api }) => {

		api.delete(`/${ rental.owned ? 'owner/' : '/' }rentals/${ rental.hashId }`)
		.then(res => {
			dispatch(detachRental(rental));
			dispatch(alertActions.showSuccessAlert(res));
      if (callback) callback(history);
		})
		.catch(err => {
			dispatch(alertActions.showErrorAlert(err));
		});

	}

}

export const detachRental = data => {
	return {
		type: types.DETACH_RENTAL,
		payload: data
	}
}
