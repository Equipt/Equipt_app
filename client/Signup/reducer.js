import types from './types.js';

const user = (state = {}, action) => {
	switch (action.type) {
		case types.USER_ERRORS:
			return action.payload;
		default:
			return state;
	}
}

export default user;
