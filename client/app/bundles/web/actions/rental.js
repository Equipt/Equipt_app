import types from './types';

export const setRental = data => {
	return {
		type: types.SET_RENTAL,
		payload: data
	}
}
