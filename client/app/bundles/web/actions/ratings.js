import types from 'actions/types';
import { showErrorAlert } from 'actions/alerts';

export const rate = (sportingGood, rating) => {
  return function(dispatch, getState, { api }) {
    api.post(`/sporting_goods/${ sportingGood.slug }/ratings`, rating)
    .then(rating => dispatch(setRating(rating)))
    .catch(err => dispatch(showErrorAlert(err)));
  }
}

export const setRating = data => {
  return {
    type: types.SET_RATING,
    payload: data
  }
}
