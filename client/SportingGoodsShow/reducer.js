import types from './types';

const sportingGood = (state = {}, action) => {
	switch (action.type) {
		case types.SET_SPORTING_GOOD:
			return action.payload;
		case types.ATTACH_SPORTING_GOOD_RENTAL:
			state.rentals.push(action.payload);
			return { ...state };
		case types.DETACH_SPORTING_GOOD_RENTAL:
			const { hashId } = action.payload;
			state.rentals = state.rentals.filter(rental => rental.hashId !== hashId);
			return { ...state };
		default:
			return state;
	}
}

export default sportingGood;
