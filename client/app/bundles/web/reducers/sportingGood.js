import types from 'actions/types';

const sportingGood = (state = {}, action) => {
	switch (action.type) {
    case types.SET_SPORTING_GOOD:
      return action.payload;
    default:
    	return state;
	}
}

export default sportingGood;
