import types from 'actions/types';

const user = (state = {}, action) => {
	switch (action.type) {
        case types.USER_ERRORS:
            return action.payload;
		case types.SET_USER_RENTALS:
			state.rentals = action.payload;
			return state;
		default:
            return state;
	}
}

export default user;
