import types from 'actions/types';

const sportingGood = (state = {}, action) => {
	switch (action.type) {
    case types.SET_SPORTING_GOOD:
      return action.payload;
		case types.SET_RENTAL:
			state.rental = action.payload;
			return state;
    default:
    	return state;
	}
}

export default sportingGood;
