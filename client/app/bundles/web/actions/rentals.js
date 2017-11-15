import types from './types';
import * as alertActions from './alerts';

export const fetchRentals = () => {

  return (dispatch, getState, api) => {

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

// Cancel Owners Rental
export const cancelRental = (rental, callback) => {

	return (dispatch, getState, api) => {

		api.delete(`/${ rental.owned ? 'owner/' : '/' }rentals/${ rental.hashId }`)
		.then(res => {
			dispatch(detachRental(rental));
			dispatch(alertActions.showSuccessAlert(res));
      if (callback) callback();
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
