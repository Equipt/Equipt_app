import types from './types';

export const fetchSportingGood = (pathname) => {

	return function(dispatch, getState, api) {

		api.token = getState().session.token;

		api.get(pathname).then(data => {
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
