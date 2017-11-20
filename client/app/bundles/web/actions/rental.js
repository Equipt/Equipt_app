import Moment from 'moment';
import {extendMoment} from 'moment-range';

import types from 'actions/types';
import * as alertActions from 'actions/alerts';
import * as sportingGoodActions from 'actions/sportingGood';
import { showLoader } from 'actions/loader';

const moment = extendMoment(Moment);

export const fetchRental = (slug, id, isOwned = false) => {

	return (dispatch, getState, api) => {

		dispatch(showLoader(true));

		api.get(`${ isOwned ? '/owner' : '' }/sporting_goods/${ slug }/rentals/${ id }`)
		.then(rental => {
			dispatch(setRental(rental));
			dispatch(showLoader(false));
		})
		.catch(err => {
			dispatch(alertActions.showErrorAlert(err));
			dispatch(showLoader(false));
		});

	}

}

export const rent = (rental, sportingGood, callback) => {

	return (dispatch, getState, api) => {

    const { slug } = sportingGood;
    const { showErrorAlert } = alertActions;

		api.post(`/sporting_goods/${ slug }/rentals`, rental)
		.then(rental => {
			callback(rental);
      dispatch(setRental(rental));
		})
		.catch((data) => {
			if (data.errors) {
				dispatch(showErrorAlert(data.errors));
			} else {
				dispatch(showErrorAlert(data));
			}
		});

	}

}

export const setRental = data => {
	return {
		type: types.SET_RENTAL,
		payload: data
	}
}

export const aggreedToRentalTerms = status => {
    return {
      type: types.AGREED_TO_RENTAL_TERMS,
      payload: status
    }
}

export const clearRental = () => {
	return {
		type: types.CLEAR_RENTAL,
		payload: false
	}
}

export const selectRental = (rental, sportingGood, agreedToTerms) => {

	const { start, end } = rental;
  const { slug } = sportingGood;
  const { showErrorAlert, clearAlerts } = alertActions;

	return (dispatch, getState, api) => {

		const endDate = Moment(end, "DD-MM-YYYY").add(1, 'minute');

		api.post(`/sporting_goods/${ slug }/rentals/check_availability`, {
			rental: {
				start: start,
				end: endDate
			}
		})
		.then(data => {
			dispatch({
				type: types.SELECTED_RENTAL,
				payload: {
		      title: 'selected',
		      start: rental.start,
		      end: endDate,
		      agreedToTerms: agreedToTerms
		    }
			})
			clearAlerts();
		})
		.catch(data => dispatch(showErrorAlert(data.errors)))

	}

}

export const cancelRental = (rental, callback) => {

    return function(dispatch, getState, api) {

        api.token = getState().session.token;

        api.delete(`/rentals/${ rental.hashId }`)
        .then(res => {
						dispatch(sportingGoodActions.detachRental(rental));
            dispatch(alertActions.showSuccessAlert(res));
						if (callback) callback();
        }).catch(err => {
            dispatch(alertActions.showErrorAlert(err));
        });

    }

}
