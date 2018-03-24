import types from 'actions/types';
import { showErrorAlert, showSuccessAlert } from 'actions/alerts';

export const rate = (rental, rating) => {
  return function(dispatch, getState, { api }) {

    const endPoint = rental.owned ?
                     `/owner/rentals/${ rental.hashId }/ratings` :
                     `/sporting_goods/${ rental.sportingGood.slug }/rentals/${ rental.hashId }/ratings`;

    api.post(endPoint, rating)
    .then(message => {
      dispatch(setRating(rating));
      dispatch(showSuccessAlert(message));
    })
    .catch(err => dispatch(showErrorAlert(err)));
  }
}

export const setRating = data => {
  return {
    type: types.SET_RATING,
    payload: data
  }
}
