import Moment from 'moment';
import {extendMoment} from 'moment-range';

import types from 'actions/types';
import * as alertActions from 'actions/alerts';
import * as sportingGoodActions from 'actions/sportingGood';
import * as rentalsActions from 'actions/rentals';
import { showLoader } from 'actions/loader';

const moment = extendMoment(Moment);

export const fetchRental = (slug, id, isOwned = false) => {

	return (dispatch, getState, { api }) => {

		dispatch(showLoader(true));

		api.get(`${ isOwned  ? '/owner' : '' }/sporting_goods/${ slug }/rentals/${ id }`)
		.then(rental => {
			dispatch(showLoader(false));
			dispatch(setRental(rental));
		})
		.catch(err => {
			dispatch(showLoader(false));
			dispatch(alertActions.showErrorAlert(err));
		});

	}

}

export const rent = (rental, sportingGood, callback) => {

	return (dispatch, getState, { api }) => {

    const { slug } = sportingGood;
    const { showErrorAlert } = alertActions;

		api.post(`/sporting_goods/${ slug }/rentals`, rental)
		.then(rental => {
      dispatch(setRental(rental));
			callback(rental);
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

	return (dispatch, getState, { api }) => {

		const endDate = Moment(end, "DD-MM-YYYY").add(1, 'minute');

		api.post(`/sporting_goods/${ slug }/rentals/check_availability`, {
			rental: {
				start_date: start,
				end_date: endDate
			}
		})
		.then(data => {
			dispatch({
				type: types.SELECTED_RENTAL,
				payload: {
		      title: 'selected',
		      startDate: rental.start,
		      endDate: endDate,
		      agreedToTerms: agreedToTerms,
					totalDays: data.totalDays,
					discount: data.discount,
					subTotal: data.subTotal,
					total: data.total
		    }
			})
			clearAlerts();
		})
		.catch(data => dispatch(showErrorAlert(data.errors)))

	}

}

export const cancelRental = (rental, callback) => {

    return function(dispatch, getState, { api, history }) {

        api.delete(`${ rental.owned ? '/owner' : '' }/rentals/${ rental.hashId }`)
        .then(res => {
						dispatch(sportingGoodActions.detachRental(rental));
            dispatch(alertActions.showSuccessAlert(res));
						if (callback) callback(history);
        }).catch(err => {
            dispatch(alertActions.showErrorAlert(err));
        });

    }

}

// Owner whats to set sporting_good as used
export const ownerIsUsingSportingGood = (rental, sportingGood) => {

	const { start, end } = rental;
	const { showErrorAlert, clearAlerts } = alertActions;
	const endDate = Moment(end, "DD-MM-YYYY").add(1, 'minute');

	return function(dispatch, getState, { api }) {

		api.post(`/owner/sporting_goods/${ sportingGood.slug }/rentals`, {
			rental: {
				start_date: start,
				end_date: endDate
			}
		})
		.then(rental => dispatch(setRental(rental)))
		.catch(data => dispatch(showErrorAlert(data.errors)))

	}

}
