import types from 'actions/types';

const user = (state = {}, action) => {
	switch (action.type) {
    case types.USER_ERRORS:
      return action.payload;
		default:
      return state;
	}
}

export default user;
